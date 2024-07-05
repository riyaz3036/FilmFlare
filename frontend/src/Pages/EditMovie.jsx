import React, { useState, useContext, useEffect } from 'react';
import { Form, FormGroup } from 'reactstrap';
import { BASE_URL } from '../Utils/config.js';
import { useNavigate, useParams } from 'react-router-dom';
import ChooseActor from '../Components/ChooseActor/ChooseActor.js';
import ChooseProducer from '../Components/ChooseProducer/ChooseProducer.js';
import { AuthContext } from "../context/AuthContext";
import useFetch from '../hooks/useFetch.js';

const EditMovie = () => {
    const navigate = useNavigate();
    const { id } = useParams();  // Get movie ID from URL parameters
    const { user } = useContext(AuthContext); // Get user id from context

    // Fetch movie data
    const { data, loading, error } = useFetch(user ? `${BASE_URL}/movie/${id}` : null); 

    // Initialize state for the form details
    const [movieDetails, setMovieDetails] = useState({
        user_id: user._id,
        name: '',
        year: '',
        plot: '',
        actors: [],
        producer: '',
        image: null
    });

    const [addCast, setAddCast] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (data) {
            setMovieDetails({
                user_id: user._id,
                name: data.name,
                year: data.year,
                plot: data.plot,
                actors: data.actors,
                producer: data.producer,
                image: null  // Reset the image field
            });
        }
    }, [data, user._id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

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

            setMovieDetails({
                ...movieDetails,
                image: file,
            });
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (movieDetails.producer === '' || movieDetails.actors.length === 0) {
                alert("Add At least 1 Producer and 1 Actor");
                setIsSubmitting(false);
                return;
            }


            const res = await fetch(`${BASE_URL}/movie/${id}`, {
                method: 'PUT',  // Use PUT for updating existing movies
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movieDetails),
            });

            const result = await res.json();

            if (res.ok) {
                alert("Movie updated successfully!");
                navigate('/');
            } else {
                alert(result.message || 'Failed to update movie');
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
                <h2 className="text-center">Edit a Movie</h2>
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
                    <button className="add__" type="submit" disabled={isSubmitting}>Update</button>
                </Form>
            </div>
            {/* Add Actor Popup */}
            {addCast === 2 && <ChooseActor setAddCast={setAddCast} movieDetails={movieDetails} setMovieDetails={setMovieDetails} />}
            {/* Add Producer Popup */}
            {addCast === 1 && <ChooseProducer setAddCast={setAddCast} movieDetails={movieDetails} setMovieDetails={setMovieDetails} />}
        </div>
    );
};

export default EditMovie;
