// src/components/Contact.jsx
import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
    setFormData({ name: '', email: '', message: '' }); // Clear the form
  };

  const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px'
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ color: '#333' }}>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          style={{ ...inputStyle, height: '100px' }}
          required
        />
        <button type="submit" style={buttonStyle}>Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
