import React, { useContext, useState } from "react";
import '../styles/add-cast.css';
import { useNavigate } from "react-router-dom";
import { Container, Col, Row } from 'reactstrap';
import user_unavail from '../assets/images/user_unavail.jpg';
import { BASE_URL } from '../Utils/config.js';
import useFetch from '../hooks/useFetch.js';
import { AuthContext } from "../context/AuthContext";
import ReactPaginate from 'react-paginate'; // Import ReactPaginate

const AddCast = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); // to get user id
    const { data } = useFetch(user ? `${BASE_URL}/user/${user._id}` : null); // call API. It has all user data

    let actors = data?.actors || [];
    let producers = data?.producers || [];

    // State for pagination
    const [currentActorPage, setCurrentActorPage] = useState(0);
    const [currentProducerPage, setCurrentProducerPage] = useState(0);

    const actorsPerPage = 5; // Number of actors per page
    const producersPerPage = 5; // Number of producers per page

    // Calculate the start and end index for the actors and producers to display
    const startActorIndex = currentActorPage * actorsPerPage;
    const endActorIndex = startActorIndex + actorsPerPage;
    const currentActors = actors.slice(startActorIndex, endActorIndex);

    const startProducerIndex = currentProducerPage * producersPerPage;
    const endProducerIndex = startProducerIndex + producersPerPage;
    const currentProducers = producers.slice(startProducerIndex, endProducerIndex);

    // Function to handle actor page change
    const handleActorPageChange = (event) => {
        setCurrentActorPage(event.selected);
    };

    // Function to handle producer page change
    const handleProducerPageChange = (event) => {
        setCurrentProducerPage(event.selected);
    };

    return (
        <div className="p-5 cast__">
            <div className="flex gap-3 cast_main mb-5">
                <div className="font-semibold cast__main__div" onClick={() => navigate('/add-actor')}>Add Actor</div>
                <div className="font-semibold cast__main__div" onClick={() => navigate('/add-producer')}>Add Producer</div>
            </div>

            {/* Producers List */}
            <div>
                <p className="text-white text-2xl font-medium">Producers</p>
                <Container>
                    <Row>
                        {currentProducers.length > 0 ? (
                            currentProducers.map((producer, index) => (
                                <Col lg="3" className="mb-4" key={index}>
                                    <div className="actor_card">
                                        <div className="actor_card_img">
                                            <img src={producer.image ? `${BASE_URL}/${producer.image.replace(/\\/g, '/')}` : user_unavail} alt={`${producer.username}'s profile`} />
                                        </div>
                                        <p className="actor_card_name">{producer.username}</p>
                                        <p className="actor_card_gen">{producer.gender}</p>
                                        <div className="actor_card_dob">
                                            <p className="actor_card_dob_title">DOB:</p>
                                            <p className="actor_card_dob_date">{producer.dob}</p>
                                        </div>
                                        <p className="actor_card_bio">{producer.bio}</p>
                                    </div>
                                </Col>
                            ))
                        ) : (
                            <p className="text-white">No producers found.</p>
                        )}
                    </Row>
                </Container>
                {/* Pagination for Producers */}
                <ReactPaginate
                    previousLabel={"< Previous"}
                    nextLabel={"Next >"}
                    breakLabel={"..."}
                    pageCount={Math.ceil(producers.length / producersPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handleProducerPageChange}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </div>

            {/* Actors List */}
            <div>
                <p className="text-white text-2xl font-medium">Actors</p>
                <Container>
                    <Row>
                        {currentActors.length > 0 ? (
                            currentActors.map((actor, index) => (
                                <Col lg="3" className="mb-4" key={index}>
                                    <div className="actor_card">
                                        <div className="actor_card_img">
                                            <img src={actor.image ? `${BASE_URL}/${actor.image.replace(/\\/g, '/')}` : user_unavail} alt={`${actor.username}'s profile`} />
                                        </div>
                                        <p className="actor_card_name">{actor.username}</p>
                                        <p className="actor_card_gen">{actor.gender}</p>
                                        <div className="actor_card_dob">
                                            <p className="actor_card_dob_title">DOB:</p>
                                            <p className="actor_card_dob_date">{actor.dob}</p>
                                        </div>
                                        <p className="actor_card_bio">{actor.bio}</p>
                                    </div>
                                </Col>
                            ))
                        ) : (
                            <p className="text-white">No actors found.</p>
                        )}
                    </Row>
                </Container>
                {/* Pagination for Actors */}
                <ReactPaginate
                    previousLabel={"< Previous"}
                    nextLabel={"Next >"}
                    breakLabel={"..."}
                    pageCount={Math.ceil(actors.length / actorsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handleActorPageChange}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </div>
        </div>
    );
}

export default AddCast;
