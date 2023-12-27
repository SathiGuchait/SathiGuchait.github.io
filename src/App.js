import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';



function App() {


  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [formErrors, setFormErrors] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const initialFormData = { firstName: '', lastName: '', email: '', phone: '' };
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, });

    setFormErrors({ ...formErrors, [name]: '', });

  };
  const validateForm = () => {
    let valid = true;
    const newFormErrors = {};

    // Validate firstName
    if (!formData.firstName.trim()) {
      newFormErrors.firstName = 'First Name is required';
      valid = false;
    }

    // Validate lastName
    if (!formData.lastName.trim()) {
      newFormErrors.lastName = 'Last Name is required';
      valid = false;
    }
    // validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newFormErrors.phone = 'valid phone number is required';
      valid = false;
    }


    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newFormErrors.email = 'Valid Email is required';
      valid = false;
    }

    setFormErrors(newFormErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Send form data using Axios
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);

        if (response.status === 201) {
          console.log(response);
          setFormData(initialFormData);
          setSuccessMessage('Form submitted successfully!');
          setTimeout(() => setSuccessMessage(''), 4000);
        } else {
          console.error('Form submission failed.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };
  }
  // const formik = useFormik({
  //    initialValues:{
  //     firstName: '',
  //     lastName: '',
  //     phone: '',
  //     email: ''
  //    },
  //    validationSchema: Yup.object({
  //     firstName: Yup.string().required(),
  //     lastName: Yup.string().required(),
  //     phone: Yup.string().required().min(10),
  //     email: Yup.string().required().email()

  //    }),
  //    onsubmit:(data)=>{
  //     console.log("formik data", data)
  //    }


  // })


  return (
    <div className="App">
      {successMessage && <div className='success'>{successMessage}</div>}
     
      <h1>Simple Form</h1>
      <div className='container'>
        <form onSubmit={handleSubmit} >

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder='first name'
          />
          <div className="error">{formErrors.firstName}</div>
          <br />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder='last name'
          />
          <div className="error">{formErrors.lastName}</div>
          <br />
          <input
            type="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder='phone number'
          />
          <div className="error">{formErrors.phone}</div>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='email'
          />
          <div className="error">{formErrors.email}</div>
          <br />

          <button type="submit" >Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
