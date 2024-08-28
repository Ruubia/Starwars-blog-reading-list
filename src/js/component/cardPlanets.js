import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import imageFallback from "./imageFallback";

export const CardForPlanets = (props) => {
    const { actions, store } = useContext(Context);
    const [details, setDetails] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            await actions.getPlanetsInfo(props.planet.uid);
            setDetails(store.planetsInfo[props.planet.uid]);
        };

        fetchDetails();
    }, [props.planet.uid, store.planetsInfo]);

    useEffect(() => {
        setIsFavorite(store.favorites.some(fav => fav.name === props.planet.name));
    }, [store.favorites, props.planet.name]);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            actions.removeFavorite(props.planet.name);
        } else {
            actions.addFavorite('planet', props.planet.uid, props.planet.name);
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="card col-12 col-md m-3" style={{ minWidth: "300px" }}>
            <ImageWithFallback 
                src={`https://starwars-visualguide.com/assets/img/planets/${props.planet.uid}.jpg`} 
                fallbackSrc="https://placehold.co/300"
                alt="Card image" 
                width={300}
                height={300}
            />
            <div className="card-body">
                <h5 className="card-title">{props.planet.name}</h5>
                {details ? (
                    <>
                        <p className="card-text">Climate: {details.climate}</p>
                        <p className="card-text">Diameter: {details.diameter}</p>
                        <p className="card-text">Gravity: {details.gravity}</p>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/details/planet/${props.planet.uid}`} className="btn btn-dark">Learn more!</Link>
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
