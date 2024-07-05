import React, { useContext, useState } from "react";
import user_unavail from '../../assets/images/user_unavail.jpg';
import { AuthContext } from "../../context/AuthContext.js";
import { BASE_URL } from '../../Utils/config.js';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch.js';
import ReactPaginate from 'react-paginate'; // Import ReactPaginate

const ChooseProducer = ({ setAddCast, movieDetails, setMovieDetails }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); // to get user id

    // Fetch producer data
    const { data } = useFetch(user ? `${BASE_URL}/user/${user._id}` : null); // call API. It has all user data
    let producers = data?.producers || []; // Use `producers` instead of `actors`

    // State for pagination
    const [currentPage, setCurrentPage] = useState(0);
    const producersPerPage = 6; // Number of producers per page

    // Calculate the start and end index for the producers to display
    const startIndex = currentPage * producersPerPage;
    const endIndex = startIndex + producersPerPage;
    const currentProducers = producers.slice(startIndex, endIndex);

    // Function to set the producer
    const setProducer = (producer) => {
        setMovieDetails({ ...movieDetails, producer: producer._id });
    };

    // Handle page change
    const handlePageChange = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <div className="flex items-center justify-center add_actor_popup">
            <div className="add_actor_popup_main">
                <div className="flex justify-end cursor-pointer actor_popup_cross" onClick={() => setAddCast(0)}>
                    <i className="ri-close-line"></i>
                </div>

                <p className="text-center text-white font-medium text-xl">Producers</p>

                <div className="actor_popup_all_actors">
                    {
                        currentProducers.length > 0 ? (
                            currentProducers.map((producer, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-2 actor_popup_actor ${movieDetails.producer === producer._id ? 'selected' : ''}`}
                                    onClick={() => setProducer(producer)}
                                >
                                    <div className="actor_popup_dp">
                                        <img
                                            src={producer.image ? `${BASE_URL}/${producer.image.replace(/\\/g, '/')}` : user_unavail}
                                            alt={`${producer.username}'s profile`}
                                        />
                                    </div>
                                    <p className="text-white m-0">{producer.username}</p>
                                    {movieDetails.producer === producer._id && (
                                        <i className="ri-check-double-line"></i>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-white">No producers found.</p>
                        )
                    }
                </div>

                {/* Pagination */}
                <ReactPaginate
                    previousLabel={"< Previous"}
                    nextLabel={"Next >"}
                    breakLabel={"..."}
                    pageCount={Math.ceil(producers.length / producersPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
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
};

export default ChooseProducer;
