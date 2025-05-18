import torch
import torch.nn as nn
import torchvision.transforms as transforms
from torchvision.models import vgg16, VGG16_Weights
from PIL import Image
import copy

# Check if GPU is available and set device accordingly
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Function to load and preprocess the image 
def load_image(img_path, max_size=256):
    image = Image.open(img_path).convert('RGB')
    size = max(image.size)
    if size > max_size:
        scale = max_size / float(size)
        new_size = tuple([int(dim * scale) for dim in image.size])
        image = image.resize(new_size, Image.LANCZOS)

    # Create a square canvas to fit the resized image (minimal padding)
    new_image = Image.new("RGB", (max_size, max_size), (255, 255, 255))
    new_image.paste(image, ((max_size - image.size[0]) // 2, (max_size - image.size[1]) // 2))
    in_transform = transforms.Compose([
        transforms.ToTensor(),
    ])
    image = in_transform(new_image).unsqueeze(0)
    return image.to(device)

# Function to convert tensor to image 
def im_convert(tensor):
    image = tensor.to("cpu").clone().detach()
    image = image.squeeze(0)
    image = image.permute(1, 2, 0).numpy()
    image = (image * 255).clip(0, 255).astype('uint8')
    return Image.fromarray(image)

# Function to extract features from the image using VGG16
def get_features(image, model, layers=None):
    if layers is None:
        layers = {
            '0': 'conv1_1',
            '5': 'conv2_1',
            '10': 'conv3_1',
            '19': 'conv4_1',
            '21': 'conv4_2',  # content
            '28': 'conv5_1'
        }
    features = {}
    x = image
    for name, layer in model._modules.items():
        x = layer(x)
        if name in layers:
            features[layers[name]] = x
    return features

# Function to compute the Gram matrix
def gram_matrix(tensor):
    _, d, h, w = tensor.size()
    tensor = tensor.view(d, h * w)
    gram = torch.mm(tensor, tensor.t())
    return gram

# Function to run the style transfer
def run_style_transfer(content_path, style_path, output_path):
    # Load VGG16 with weights
    vgg = vgg16(weights=VGG16_Weights.IMAGENET1K_V1).features.to(device).eval()

    content = load_image(content_path)
    style = load_image(style_path)
    target = content.clone().detach().requires_grad_(True)

    content_features = get_features(content, vgg)
    style_features = get_features(style, vgg)
    style_grams = {layer: gram_matrix(style_features[layer]) for layer in style_features}

    content_weight = 1e1
    style_weight = 1e4
    optimizer = torch.optim.Adam([target], lr=0.003)

    # Run for 200 steps, can increase to get better quality
    for step in range(200):
        target_features = get_features(target, vgg)
        content_loss = torch.mean((target_features['conv4_2'] - content_features['conv4_2'])**2)

        style_loss = 0
        for layer in style_grams:
            target_feature = target_features[layer]
            target_gram = gram_matrix(target_feature)
            style_gram = style_grams[layer]
            layer_loss = torch.mean((target_gram - style_gram)**2)
            b, d, h, w = target_feature.shape
            style_loss += layer_loss / (d * h * w)

        total_loss = content_weight * content_loss + style_weight * style_loss

        optimizer.zero_grad()
        total_loss.backward(retain_graph=True)  # Retain graph needed
        optimizer.step()

    # Convert tensor to image and save
    output_image = im_convert(target)
    output_image.save(output_path)



