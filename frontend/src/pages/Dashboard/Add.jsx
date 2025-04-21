








import React, { useState } from 'react';
import Loader from './Loader'; 
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Dashboard/Style/Style.css';

const Add = ({ refreshTollPlazaData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    jsonFiles: [],
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes for name
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({ ...prevData, jsonFiles: files }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    const baseUrl = process.env.REACT_APP_API_BASE_URL; 




    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    
    // We will send the file under 'data.json' for simplicity
    formData.jsonFiles.forEach((file) => formDataToSend.append('data.json', file));




    try {
    
          const response  =  await  fetch(`${baseUrl}/apipsd/parking/upload` , {
    
      method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage(result.message || 'Files uploaded successfully!');
        toast.success(result.message || 'Files uploaded successfully!');
        refreshTollPlazaData(); // Refresh toll plaza data after successful upload
        navigate('/dashboard');
      } else {
        toast.error(result.error || 'Failed to upload files.');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Error uploading files. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Upload JSON Files</h1>
      <form onSubmit={handleSubmit}>
        {/* Input for Toll Plaza Name */}
        <div className="mb-3">
          <label className="form-label">Parking  Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter Parking Name"
            required
          />
        </div>

        {/* Upload JSON Files */}
        <div className="mb-3">
          <label className="form-label">Upload JSON Files</label>
          <input
            type="file"
            name="jsonFiles"
            accept=".json"
            onChange={handleFileChange}
            className="form-control"
            multiple
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Uploading...' : 'Submit'}
        </button>
      </form>

      {/* Loader */}
      {loading && <Loader />}

      {/* Success or Error Message */}
      {successMessage && <div className="alert alert-info mt-3">{successMessage}</div>}

      {/* ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Add;