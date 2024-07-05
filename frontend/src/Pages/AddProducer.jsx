import React, { useState,useContext } from 'react';
import { Form, FormGroup } from 'reactstrap';
import { BASE_URL } from '../Utils/config.js';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

const AddProducer = () => {
    
    const navigate = useNavigate();
    const { user,dispatch } = useContext(AuthContext);//to get user id


    // To store movie details
    const [actorDetails, setActorDetails] = useState({
        user_id: user._id,
        username: '',
        dob: '',
        bio: '',
        image: null,
        gender: 'male'
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setActorDetails({
            ...actorDetails,
            [id]: value,
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            if (file.size > 5 * 1024 * 1024) {  // Check file size (2 MB limit)
                alert('File size exceeds 5 MB limit. Please choose a smaller file.');
                event.target.value = '';  // Clear the file input
                return;
            }

            console.log(`File selected: ${file.name}, Size: ${Math.round(file.size / 1024)} KB, Type: ${file.type}`);

            setActorDetails({
                ...actorDetails,
                image: file,
            });
        }
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('user_id', actorDetails.user_id);
        formData.append('username', actorDetails.username);
        formData.append('dob', actorDetails.dob);
        formData.append('bio', actorDetails.bio);
        formData.append('image', actorDetails.image);
        formData.append('gender', actorDetails.gender);
        

        try {
            const res = await fetch(`${BASE_URL}/producer/`, {
                method: 'POST',
                body: formData,
            });

            const result = await res.json();

            if (res.ok) {
                alert("Producer added successfully!");
                navigate('/add-cast');
            } else {
                alert(result.message);
            }
        } catch (err) {
            alert(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add__main">
            <div className="add__container">
                <h2 className="text-center">Add a Producer</h2>
                <Form onSubmit={handleSubmit} enctype="multipart/form-data">
                    <FormGroup className="login__container_form">
                        <label htmlFor="username">Name:</label>
                        <input type="text" placeholder="Add Producer's Name" required id="username" value={actorDetails.username} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup className="login__container_form">
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" value={actorDetails.gender} onChange={handleChange} required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </FormGroup>
                    <FormGroup className="login__container_form">
                        <label htmlFor="dob">Date:</label>
                        <input type="date" required id="dob" value={actorDetails.dob} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup className="login__container_form">
                        <label htmlFor="bio">Bio:</label>
                        <textarea id="bio" placeholder="Add Bio" value={actorDetails.bio} onChange={handleChange} required></textarea>
                    </FormGroup>
                    <FormGroup className="login__container_form">
                        <label htmlFor="image">Image:</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </FormGroup>
                    <button className="add__" type="submit" disabled={isSubmitting}>Add</button>
                </Form>
            </div>
        </div>
    );
};

export default AddProducer;
