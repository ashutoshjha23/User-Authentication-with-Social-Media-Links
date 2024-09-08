import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Details.css'; 

const Details = () => {
    const [socialLinks, setSocialLinks] = useState({
        linkedln: '',
        github: '',
        instagram: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        // Fetch user details on component mount
        const fetchDetails = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.get('http://localhost:8080/details', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSocialLinks(response.data);
            } catch (error) {
                console.error('Error fetching details:', error);
                setError('Error fetching details');
            }
        };

        fetchDetails();
    }, []);

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
                        placeholder="Linkedln"
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
                        placeholder="Github"
                        value={socialLinks.github}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="instagram">Instagram:</label>
                    <input
                        type="text"
                        id="instagram"
                        name="instagram"
                        placeholder="Instagram"
                        value={socialLinks.instagram}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <button className="go-home-button1" onClick={handleGoHome}>Back to Home</button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Details;
