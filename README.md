# Neural Style Transfer Web Application

This is a full-stack web application that allows users to perform Neural Style Transfer — combining the content of one image with the artistic style of another. Users can register, log in, upload a content and style image, and generate a stylized result using deep learning.

---

## Features

- User authentication with email and password
- Upload content and style images
- Neural Style Transfer using PyTorch
- View and download the generated stylized image
- Frontend: React.js + Bootstrap (assumed)
- Backend: Flask + Python

---

## Tech Stack

- **Frontend:** React.js, Bootstrap
- **Backend:** Flask
- **Deep Learning:** PyTorch (VGG19-based style transfer)
- **Authentication:** Custom with CSV (`users.csv`)
- **Deployment Ready:** Flask backend, static file support

---

## Installation

### 1. Clone the Repository

git clone https://github.com/mommy15/neural-style-transfer-webapp.git
cd neural-style-transfer-webapp

### 2. Setup Backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
 -If requirements.txt is missing, create it using:
 pip freeze > requirements.txt

### 3. Run backend
python app.py

### 4. setup Frontend
cd ../frontend
npm install
npm start

**Requirements.Txt*
Flask
torch
torchvision
Pillow
numpy
(make a file in backend if in any case the requirement.txt doesnt appear)

**Credits**
Developed as part of an internship project in Codtech IT solutions. Neural style transfer powered by PyTorch + VGG19 model.
