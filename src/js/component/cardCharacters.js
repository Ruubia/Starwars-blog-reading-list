import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import ImageFallback from "./imageFallback";

export const Card = (props) => {
    const { actions, store } = useContext(Context);
    const [details, setDetails] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        actions.getPeopleInfo(props.people.uid)
            .then(() => {
                setDetails(store.peopleInfo[props.people.uid]);
            })
            .catch(error => {
                console.error("Error fetching details:", error);
            });
    }, [props.people.uid, store.peopleInfo, actions]);

    useEffect(() => {
        setIsFavorite(store.favorites.some(fav => fav.name === props.people.name));
    }, [store.favorites, props.people.name]);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            actions.removeFavorite(props.people.name);
        } else {
            actions.addFavorite('character', props.people.uid, props.people.name);
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="card col-12 col-md m-3" style={{ minWidth: "300px" }}>
            <ImageFallback 
                src={`https://starwars-visualguide.com/assets/img/characters/${props.people.uid}.jpg`} 
                onError={(e) => e.target.src = "https://placehold.co/300x450"} 
                alt="Card image" 
                className="img-fluid" 
                width={300} 
                height={450} 
            />
            <div className="card-body">
                <h5 className="card-title">{props.people.name}</h5>
                {details ? (
                    <>
                        <p className="card-text">Gender: {details.gender}</p>
                        <p className="card-text">Hair Color: {details.hair_color}</p>
                        <p className="card-text">Eye Color: {details.eye_color}</p>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/details/character/${props.people.uid}`} className="btn btn-dark">Learn more!</Link>
                    <button 
                        className={`btn ${isFavorite ? 'btn-outline-warning' : 'btn-warning'}`} 
                        onClick={handleFavoriteClick}
                    >
                        <i className={isFavorite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

