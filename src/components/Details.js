import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Details.css'; 

const Details = () => {
    const [socialLinks, setSocialLinks] = useState({
        linkedln: '',
        github: '',
        instagram: '',
    });
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const token = localStorage.getItem('token'); 
        const response = await axios.post('http://localhost:8080/details', socialLinks, {
        headers: {
         Authorization: `Bearer ${token}`
                }
         });
         if (response.status === 201) {
         alert('Details submitted successfully');
         }
        } catch (error) {
        console.error('Error submitting details:', error);
        }
    };
    const handleGoHome = () => {
    navigate('/home'); 
    };
    return (
        <div className="details-container">
            <form className="details-form" onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="linkedln">Linkedln:</label>
                    <input
                    type="text"
                    id="linkedln"
                    name="linkedln"
                    placeholder="linkedln"
                    value={socialLinks.linkedln}
                    onChange={handleChange}
                    />
                </div>
            <div className="form-group">
                <label htmlFor="github">Github:</label>
                <input
                type="text"
                    id="github"
                    name="github"
                    placeholder="github"
                    value={socialLinks.github}
                    onChange={handleChange}
                    />
             </div>
                <div className="form-group">
                <label htmlFor="linkedin">Instagram:</label>
                    <input
                        type="text"
                        id="instagram"
                        name="instagram"
                        placeholder="instagram"
                        value={socialLinks.instagram}
                        onChange={handleChange}
                    />
                </div>
             <button type="submit">Submit</button>
            </form>
            <button className="go-home-button1" onClick={handleGoHome}>Back to Home</button> {/* Back to Home Button */}
        </div>
    );
};
export default Details;
