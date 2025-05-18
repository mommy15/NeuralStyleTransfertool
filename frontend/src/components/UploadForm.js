// frontend/src/components/UploadForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { FaImage, FaSpinner } from 'react-icons/fa';

// UploadForm component for uploading images and displaying results 
function UploadForm() {
  const [contentImg, setContentImg] = useState(null);
  const [styleImg, setStyleImg] = useState(null);
  const [result, setResult] = useState(null);
  const [imageHistory, setImageHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Handle image upload and send to server
  // The function handles the image upload process, including progress tracking and error handling.
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!contentImg || !styleImg) return;

    const formData = new FormData();
    formData.append('content', contentImg);
    formData.append('style', styleImg);

    setLoading(true);
    setProgress(0);
    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total); // Calculate upload progress
          setProgress(percent);
        },
      });
      setResult(res.data.output);
      setImageHistory(prev => [res.data.output, ...prev]);  // Prepend new result to history
    } catch (err) {
      alert('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#f7f7f7' }}>
      <div className="card p-4 rounded-4 shadow-lg bg-white mx-auto mb-5" style={{ maxWidth: '800px' }}>
        <h2 className="text-center mb-4 text-primary">Neural Style Transfer</h2>
        <form onSubmit={handleUpload}>
          <div className="mb-4">
            <label className="form-label fw-bold text-muted">
              <FaImage className="me-2 text-primary" />
              Content Image
            </label>
            <input
              type="file"
              className="form-control p-3 shadow-sm border-0 rounded"
              accept="image/*"
              onChange={(e) => setContentImg(e.target.files[0])}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold text-muted">
              <FaImage className="me-2 text-primary" />
              Style Image
            </label>
            <input
              type="file"
              className="form-control p-3 shadow-sm border-0 rounded"
              accept="image/*"
              onChange={(e) => setStyleImg(e.target.files[0])}
              required
            />
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary py-3 fs-5 fw-bold rounded-pill shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="me-2 spinner-border spinner-border-sm" />
                  Generating...
                </>
              ) : (
                'Generate'
              )}
            </button>
          </div>
        </form>

        {/* Display Latest Result */}
        {result && (
          <div className="mt-5 text-center">
            <h5 className="fw-bold text-primary mb-3">Latest Result</h5>
            <img
              src={result}
              alt="Styled Output"
              className="img-fluid rounded shadow-lg mb-3"
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
          </div>
        )}
      </div>

      {/* Image History Section */}
      {imageHistory.length > 1 && (
        <div className="container">
          <h4 className="text-center text-secondary mb-4">History</h4>
          <div className="row">
            {imageHistory.slice(1).map((img, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card shadow-sm rounded">
                  <img
                    src={img}
                    alt={`History ${index}`}
                    className="card-img-top"
                    style={{ maxHeight: '250px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadForm;
