from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from style_transfer import run_style_transfer
from auth import register_user, authenticate_user

# Ensure the required directories exist
app = Flask(__name__)
CORS(app)

# Set up directories for uploads and outputs
UPLOAD_FOLDER = 'static/uploads'
OUTPUT_FOLDER = 'static/output'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# Set the upload folder for flask
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    if register_user(email, password):
        return jsonify({'status': 'success'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'User already exists'}), 400

# Route for user login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    if authenticate_user(email, password):
        return jsonify({'status': 'success'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Invalid credentials'}), 401
    
# Route for uploading images
@app.route('/upload', methods=['POST'])
def upload():
    content = request.files['content']
    style = request.files['style']

    content_path = os.path.join(UPLOAD_FOLDER, content.filename)
    style_path = os.path.join(UPLOAD_FOLDER, style.filename)
    output_path = os.path.join(OUTPUT_FOLDER, 'output.png')

    content.save(content_path)
    style.save(style_path)

    run_style_transfer(content_path, style_path, output_path)

    return jsonify({"output": "http://localhost:5000/static/output/output.png"})

if __name__ == '__main__':
    app.run(debug=True)
