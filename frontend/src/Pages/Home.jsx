import React,{useState, useContext} from 'react';
import {Container, Col, Row} from 'reactstrap';
import { useNavigate } from "react-router-dom";
import '../styles/home.css'
import MovieList from '../Components/MovieList/MovieList';
import {BASE_URL} from '../Utils/config.js';
import useFetch from '../hooks/useFetch.js';
import {AuthContext} from "../context/AuthContext";
import heroImg01 from '../assets/images/hero-img01.png'
import heroImg02 from '../assets/images/hero-img02.png'
import heroImg03 from '../assets/images/hero-img03.png'



const Home = ()=>{

    const navigate = useNavigate();

    const { user,dispatch } = useContext(AuthContext);//to get user id
    const { data } = useFetch(user ? `${BASE_URL}/user/${user._id}` : null);//call us api. It has all user 

    let movies = data?.movies || [];
    
    
return (
  
   <main className="my__home"> 
        {
            user?
            <>
               {/* Hero Section */}
                <section className="mb-5">
                    <Container>
                    <Row>

                        <Col lg='6'>
                        <div className="hero__content">
                            <h1>Discover the <span className="highlight__text">Magic of Cinema</span></h1>
                            <p>Step into a world where every film tells a story. Dive into our collection of movies, from timeless classics to the latest blockbusters. <br />
                            Join us on a cinematic journey where each screening is an adventure and every movie is a new experience. 
                            Let’s explore the stories, the stars, and the magic of the big screen together!</p>
                        </div>
                        </Col>

                        <Col lg='2'>
                        <div className="hero__img-box">
                            <img src={heroImg01} alt="" />
                        </div>
                        </Col>

                        <Col lg='2'>
                        <div className="hero__img-box mt-4">
                            <img src={heroImg02} alt="" />
                        </div>
                        </Col>

                        <Col lg='2'>
                            <div className="hero__img-box mt-5">
                                <img src={heroImg03} alt="" />
                            </div>
                        </Col>

                    
                    </Row>
                    </Container>
                </section>


                {/* To add Movies */}
                <div className="mb-5">
                    <button className="py-2 px-4 font-semibold" style={{backgroundColor: '#f5c518',borderRadius:'10px'}} onClick={()=>navigate('/add-movie')}>Add Movie</button>
                </div>


                {/* Main section */}  
                <section>
            
                    <Container> 
                    <Row>
                    <Col lg="12" className="mb-5">
                        <h5 className="home__title">Explore Movies</h5>            
                    </Col>

                    <MovieList movies={movies}/>  
                              
                    </Row>
                    </Container>
                </section> 

            </>
            :
            <div className="no__login"><h5>(Click on Profile and Login to Start your Journey)</h5></div>
        }        
   </main>
)

};


export default Home;