import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RequestFullAccess: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    tel: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
      <div className="bg-white shadow-lg rounded-lg p-6 md:w-1/2">
        {submitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Thank you for your request!</h2>
            <p>We will contact you shortly.</p>
            <button onClick={() => navigate('/')}>Go back to the home page</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Request Full Access</h2>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="tel"
              name="tel"
              placeholder="Telephone"
              value={formData.tel}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              rows={4}
            />
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded font-semibold">
              Submit
            </button>
          </form>
        )}
      </div>
      <div className="bg-gray-100 shadow-lg rounded-lg p-6 md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Why Choose Full Access?</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Comprehensive data insights tailored for your business.</li>
          <li>Priority customer support.</li>
          <li>Access to exclusive features and early updates.</li>
          <li>Enhanced security and compliance features.</li>
          <li>Customizable solutions to fit your unique needs.</li>
        </ul>
        <div className="mt-8 text-center">
          <p>For any questions:</p>
          <h5>
            <a href="mailto:hello@pxlstudio.app" className="text-blue-600 hover:underline">
              hello@pxlstudio.app
            </a>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default RequestFullAccess;
