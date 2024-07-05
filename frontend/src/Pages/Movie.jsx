import React, { useContext } from "react";
import '../styles/movie.css';
import { Container, Col, Row } from 'reactstrap';
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from '../Utils/config.js';
import useFetch from '../hooks/useFetch.js';
import { AuthContext } from "../context/AuthContext";
import user_unavail from '../assets/images/user_unavail.jpg'
import poster_unavail from '../assets/images/poster_unavail.png'



const Movie = () => {
    const navigate = useNavigate();
    const { id } = useParams();  // Get movie ID from URL parameters
    const { user } = useContext(AuthContext); // Get user id from context
    const { data, loading, error } = useFetch(user ? `${BASE_URL}/movie/${id}` : null); // Fetch movie data

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    const movie = data || {};
    const actors = movie.actors || [];
    const producer = movie.producer || {};

    return (
        <div className="movie_page">

            <div className="flex justify-end"><button className="px-3 py-2 mb-2 mr-2 font-semibold text-sm" style={{backgroundColor:'#f5c518',borderRadius:'10px'}} onClick={()=>navigate(`/edit-movie/${id}`)}>Edit Movie</button></div>

            <div className="movie_page_top mb-10">
                <div className="movie_page_left">
                    <img src={movie.image ? `${BASE_URL}/${movie.image.replace(/\\/g, '/')}` : poster_unavail} alt="Movie Poster"/>
                </div>
                <div className="movie_page_right">
                    <p className="movie_page_title">{movie.name || 'Movie Title'}</p>
                    <div className="movie_page_year">
                        <i className="ri-calendar-line"></i>
                        <p>{movie.year || 'Year'}</p>
                    </div>
                    <p className="movie_page_plot">{movie.plot || 'Plot'}</p>
                </div>
            </div>

            <div className="movie_page_bottom">
                {/* Producer Section */}
                <div className="movie_page_producer mb-10">
                    <p className="text-white text-xl">Producer</p>
                    {producer.username ? (
                        <div className="actor_card">
                            <div className="actor_card_img">
                                <img src={producer.image ? `${BASE_URL}/${producer.image.replace(/\\/g, '/')}` : user_unavail} alt="Producer"/>
                            </div>
                            <p className="actor_card_name">{producer.username}</p>
                            <p className="actor_card_gen">{producer.gender || 'Gender'}</p>
                            <div className="actor_card_dob">
                                <p className="actor_card_dob_title">DOB:</p>
                                <p className="actor_card_dob_date">{producer.dob || 'Date of Birth'}</p>
                            </div>
                            <p className="actor_card_bio">{producer.bio || 'Bio'}</p>
                        </div>
                    ) : (
                        <p>No producer information available.</p>
                    )}
                </div>

                {/* Actors Section */}
                <div className="movie_page_actors">
                    <p className="text-white text-xl">Actors</p>
                    {actors.length > 0 ? (
                        <Container>
                            <Row>
                                {actors.map((actor) => (
                                    <Col lg="3" className="mb-4" key={actor._id}>
                                        <div className="actor_card">
                                            <div className="actor_card_img">
                                                <img src={actor.image ? `${BASE_URL}/${actor.image.replace(/\\/g, '/')}` : user_unavail} alt="Actor"/>
                                            </div>
                                            <p className="actor_card_name">{actor.username}</p>
                                            <p className="actor_card_gen">{actor.gender || 'Gender'}</p>
                                            <div className="actor_card_dob">
                                                <p className="actor_card_dob_title">DOB:</p>
                                                <p className="actor_card_dob_date">{actor.dob || 'Date of Birth'}</p>
                                            </div>
                                            <p className="actor_card_bio">{actor.bio || 'Bio'}</p>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    ) : (
                        <p>No actors information available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Movie;
