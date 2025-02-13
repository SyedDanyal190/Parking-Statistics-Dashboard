// import React, { useState } from 'react';
// import Loader from "./Loader"; 
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
// import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components
// import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
// import '../Dashboard/Style/Style.css';

// const Add = ({ refreshTollPlazaData }) => {
//   const navigate = useNavigate(); // Initialize the navigate function
//   const [formData, setFormData] = useState({
//     name: '',
//     jsonFiles: [],
//     subFolder: '', // Track which folder is selected (LHR_TO_ISB or ISB_TO_LHR)
//   });
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [step, setStep] = useState(1); // Tracks the current step

//   // Handle input changes for name
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // Handle file input change for selecting files
//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);


//     if (files.length > 10) {
//       toast.error("You can only upload up to 10 files at a time.");
//       return;
//     }

//     setFormData((prevData) => ({ ...prevData, jsonFiles: files }));
//   };

//   // Handle subfolder selection
//   const handleSubfolderChange = (e) => {
//     setFormData((prevData) => ({ ...prevData, subFolder: e.target.value }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formDataToSend = new FormData();
//     formDataToSend.append('name', formData.name);
//     formDataToSend.append('subFolder', formData.subFolder); // Append subfolder to the form data
//     formData.jsonFiles.forEach((file) => formDataToSend.append('jsonFiles', file));

//     try {
//       const response = await fetch('http://localhost:4001/api/parking/upload', {
//       // const response = await fetch('https://trafficapp.applivity.com/api/parking/upload', {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       const result = await response.json();
//       // console.log("Result!!!!!!!!!!!!!!!", result);
//       setSuccessMessage(result.message);

//       // Show success toast message
//       toast.success(result.message || "Files uploaded successfully!");

//       // Step transition logic
//       if (step === 1) {
//         setStep(2); // Move to step 2
//       } else if (step === 2) {
//         setStep(3); // Move to step 3
//       } else {
//         setStep(4); // Final step

//         // Show success toast before navigating
//         toast.success('All steps completed successfully! Navigating to dashboard...');

//         // Navigate to dashboard
//         navigate('/dashboard'); // Use navigate() to programmatically navigate
//         refreshTollPlazaData();
//       }
//     } catch (err) {
//       console.error('Error uploading files:', err);
//       setSuccessMessage('Error uploading files.');

//       // Show error toast
//       toast.error('Error uploading files. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h1 className="mb-4 text-center">Upload Files</h1>
//       <form onSubmit={handleSubmit}>
//         {/* Step 1: Name Input */}
//         {step === 1 && (
//           <div className="mb-3">
//             <label className="form-label">Enter TollPlaza Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="form-control"
//               required
//             />
//           </div>
//         )}

//         {/* Step 2: Select Folder and Upload Files */}
//         {step === 2 && (
//           <div>
//             <div className="mb-3">
//               <label className="form-label">Select Subfolder:</label>
//               <select
//                 name="subFolder"
//                 onChange={handleSubfolderChange}
//                 className="form-select"
//                 required
//               >
//                 <option value="">Select Folder</option>
//                 <option value="ISB_TO_LHR">ISB_TO_LHR</option>
//                 <option value="LHR_TO_ISB">LHR_TO_ISB</option>
//               </select>
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Upload JSON Files:</label>
//               <input
//                 type="file"
//                 accept=".json"
//                 onChange={handleFileChange}
//                 className="form-control"
//                 required
//                 multiple={true}
//               />
//             </div>
//           </div>
//         )}

//         {/* Step 3: File Upload for the second subfolder (ISB_TO_LHR) */}
//         {step === 3 && (
//           <div>
//             <div className="mb-3">
//               <label className="form-label">Select Subfolder:</label>
//               <select
//                 name="subFolder"
//                 onChange={handleSubfolderChange}
//                 className="form-select"
//                 required
//               >
//                 <option value="">Select Folder</option>
//                 <option value="ISB_TO_LHR">ISB_TO_LHR</option>
//                 <option value="LHR_TO_ISB">LHR_TO_ISB</option>
//               </select>
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Upload JSON Files:</label>
//               <input
//                 type="file"
//                 accept=".json"
//                 onChange={handleFileChange}
//                 className="form-control"
//                 required
//                 multiple={true}
//               />
//             </div>
//           </div>
//         )}

//         {/* Submit Button */}
//         <button type="submit" className="btn btn-primary" disabled={loading}>
//           Submit
//         </button>
//       </form>

//       {/* Show Loading Spinner */}
//       {loading && <Loader />}

//       {/* Show Success/Error Messages */}
//       {successMessage && <div className="alert alert-info mt-3">{successMessage}</div>}

//       {/* ToastContainer for displaying toast messages */}
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         className="custom-toast-container" 
//       />
//     </div>
//   );
// };

// export default Add;













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
            placeholder="Enter Toll Plaza Name"
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