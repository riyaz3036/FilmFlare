import React, { useState,useContext } from 'react';
import '../styles/add-movie.css';
import { Form, FormGroup } from 'reactstrap';
import { BASE_URL } from '../Utils/config.js';
import { useNavigate } from 'react-router-dom';
import ChooseActor from '../Components/ChooseActor/ChooseActor.js'
import ChooseProducer from '../Components/ChooseProducer/ChooseProducer.js'
import {AuthContext} from "../context/AuthContext";

const AddMovie = () => {
    const navigate = useNavigate();
    const { user,dispatch } = useContext(AuthContext);//to get user id


    // for popup 0-none 1-producer 2-actor
    const [addCast, setAddCast] = useState(0);

    // To store movie details
    const [movieDetails, setMovieDetails] = useState({
        user_id: user._id,
        name: '',
        year: '',
        plot: '',
        actors: [],
        producer: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieDetails({
            ...movieDetails,
            [name]: value,
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            if (file.size > 2 * 1024 * 1024) {  // Check file size (2 MB limit)
                alert('File size exceeds 2 MB limit. Please choose a smaller file.');
                event.target.value = '';  // Clear the file input
                return;
            }

            console.log(`File selected: ${file.name}, Size: ${Math.round(file.size / 1024)} KB, Type: ${file.type}`);

            setMovieDetails({
                ...movieDetails,
                image: file,
            });
        }
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setIsSubmitting(true);
    
        try {
            if(movieDetails.producer === '' || movieDetails.actors.length === 0){
                alert("Add At least 1 Producer and 1 Actor");
                setIsSubmitting(false);
                return;
            }
    
            const formData = new FormData();
            formData.append('user_id', movieDetails.user_id);
            formData.append('name', movieDetails.name);
            formData.append('year', movieDetails.year);
            formData.append('plot', movieDetails.plot);
            formData.append('producer', movieDetails.producer);
            movieDetails.actors.forEach(actor => formData.append('actors', actor));
            if (movieDetails.image) {
                formData.append('image', movieDetails.image);
            }
            
            console.log(formData);
            
            const res = await fetch(`${BASE_URL}/movie/`, {
                method: 'POST',
                body: formData,
            });
    
            const result = await res.json();
    
            if (res.ok) {
                alert("Movie added successfully!");
            } else {
                alert(result.message);
            }
    
        } catch (err) {
            alert(err.message);
        } finally {
            setIsSubmitting(false);
        }
        navigate('/');
    }
    
    
    
    return (
        <div className="add__main">
            <div className="add__container">
                <h2 className="text-center">Add a Movie</h2>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <FormGroup className="login__container_form">
                        <label htmlFor="name">Movie Name:</label>
                        <input
                            type="text"
                            placeholder="Add Movie Name"
                            required
                            id="name"
                            name="name"
                            value={movieDetails.name}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="login__container_form">
                        <label htmlFor="year">Year:</label>
                        <input
                            type="number"
                            placeholder="Add Release Year"
                            required
                            id="year"
                            name="year"
                            value={movieDetails.year}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="login__container_form">
                        <label htmlFor="plot">Plot:</label>
                        <textarea
                            id="plot"
                            name="plot"
                            required
                            placeholder="Add Plot"
                            value={movieDetails.plot}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="login__container_form">
                        <label htmlFor="image">Poster:</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </FormGroup>

                    <div className="add_cast" onClick={() => { setAddCast(1) }}>
                        <p>Select Producer</p>
                    </div>
                    <div className="add_cast" onClick={() => { setAddCast(2) }}>
                        <p>Select Actors</p>
                    </div>
                    <button className="add__" type="submit" disabled={isSubmitting}>Add</button>
                </Form>
            </div>
            {/* Add Actor Popup */}
            {addCast === 2 ? <ChooseActor setAddCast={setAddCast} movieDetails={movieDetails} setMovieDetails={setMovieDetails}/> : <></>}
            {/* Add Producer Popup */}
            {addCast === 1 ? <ChooseProducer setAddCast={setAddCast} movieDetails={movieDetails} setMovieDetails={setMovieDetails}/> : <></>}
        </div>
    )
};

export default AddMovie;
