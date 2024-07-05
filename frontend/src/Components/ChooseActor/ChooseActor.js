import React, { useContext, useState } from "react";
import './choose-actor.css';
import user_unavail from '../../assets/images/user_unavail.jpg';
import { AuthContext } from "../../context/AuthContext.js";
import { BASE_URL } from '../../Utils/config.js';
import useFetch from '../../hooks/useFetch.js';
import ReactPaginate from 'react-paginate'; // Import the ReactPaginate component

const ChooseActor = ({ setAddCast, movieDetails, setMovieDetails }) => {
    const { user } = useContext(AuthContext); // to get user id

    // Fetch actor data
    const { data } = useFetch(user ? `${BASE_URL}/user/${user._id}` : null); // call API. It has all user data
    let actors = data?.actors || [];

    // State for pagination
    const [currentPage, setCurrentPage] = useState(0);
    const actorsPerPage = 6; // Number of actors per page

    // Calculate the start and end index for the actors to display
    const startIndex = currentPage * actorsPerPage;
    const endIndex = startIndex + actorsPerPage;
    const currentActors = actors.slice(startIndex, endIndex);

    // Function to toggle actor in the movieDetails actors array
    const toggleActor = (actor) => {
        setMovieDetails(prevDetails => {
            const updatedActorIds = [...(prevDetails.actors || [])];
            const actorIndex = updatedActorIds.findIndex(aId => aId === actor._id);

            if (actorIndex > -1) {
                // Remove actor id if it already exists
                updatedActorIds.splice(actorIndex, 1);
            } else {
                // Add actor id if it does not exist
                updatedActorIds.push(actor._id);
            }

            return { ...prevDetails, actors: updatedActorIds };
        });
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

                <p className="text-center text-white font-medium text-xl">Actors</p>

                <div className="actor_popup_all_actors">
                    {
                        currentActors.length > 0 ? (
                            currentActors.map((actor, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-2 actor_popup_actor ${movieDetails.actors.includes(actor._id) ? 'selected' : ''}`}
                                    onClick={() => toggleActor(actor)}
                                >
                                    <div className="actor_popup_dp">
                                        <img 
                                            src={actor.image ? `${BASE_URL}/${actor.image.replace(/\\/g, '/')}` : user_unavail} 
                                            alt={`${actor.username}'s profile`} 
                                        />
                                    </div>
                                    <p className="text-white m-0">{actor.username}</p>
                                    {movieDetails.actors.includes(actor._id) && (
                                        <i className="ri-check-double-line"></i>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-white">No actors found.</p>
                        )
                    }
                </div>

                {/* Pagination */}
                <ReactPaginate
                    previousLabel={"< Previous"}
                    nextLabel={"Next >"}
                    breakLabel={"..."}
                    pageCount={Math.ceil(actors.length / actorsPerPage)}
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

export default ChooseActor;
