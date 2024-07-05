import React from 'react'
import MovieCard from '../../shared/MovieCard'
import {Col } from 'reactstrap'

const MovieList =({movies})=>{
//    console.log(movies);
    return <>
 {
        movies?.map(movie=>(
       <Col lg="4" className="mb-4" key={movie._id}>
            <MovieCard movie={movie}/>
        </Col>
    ))

} 
    </>
};

export default MovieList;