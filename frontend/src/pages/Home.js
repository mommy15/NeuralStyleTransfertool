import React from 'react';
import UploadForm from '../components/UploadForm';
import { FaMagic } from 'react-icons/fa';

// Home component for the main page of the application
const Home = () => (
  <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div className="card shadow-lg rounded-3 w-100" style={{ maxWidth: '750px' }}>
      <div className="card-header bg-primary text-white text-center py-4">
        <h2 className="fw-bold mb-0">
          <FaMagic className="me-2" />
          Neural Style Transfer Tool
        </h2>
        <p className="fs-6 text-light">Transform your images with the power of Pytorch </p>
      </div>
      <div className="card-body">
        <div className="text-center mb-4">
          <p className="text-muted">
            Upload your content and style images below to generate a unique, stylized masterpiece.
            Usually takes about 5-10 minutes to generate an neural image.
            due to the high load on the cpu and gpu with the use of VGG16 model.
          </p>
          <p className="text-muted">
            Please try again if it shows an error!
          </p>
        </div>
        <UploadForm />
      </div>
      <div className="card-footer bg-light text-center py-3">
        <small className="text-muted">
          Powered by Pytorch and neural networks.
        </small>
      </div>
    </div>
  </div>
);

export default Home;


