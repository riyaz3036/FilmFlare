import React from 'react'
import './movie-card.css'
import poster_unavail from '../assets/images/poster_unavail.png'
import { BASE_URL } from '../Utils/config';
import { useNavigate } from "react-router-dom";


const MovieCard =({movie})=>{

    const navigate = useNavigate();
    console.log(movie);

    return (

        <div className="movie__card" onClick={()=>navigate(`/movie/${movie._id}`)}>
            <div className="movie_card_img">
                <img src={movie.image ? `${BASE_URL}/${movie.image.replace(/\\/g, '/')}` : poster_unavail} alt="movie-image"/>
            </div>

            <div className="card__main">
                <div className="card__top">
                    <i class="ri-calendar-line"></i>
                    <p>{movie.year}</p>
                </div>

                <h5 className="movie__title">{movie.name}</h5>
            </div>
        </div>

    )
};

export default MovieCard;