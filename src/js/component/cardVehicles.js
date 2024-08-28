import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import ImageWithFallback from "./ImageWithFallback";

export const CardForVehicles = (props) => {
    const { actions, store } = useContext(Context);
    const [details, setDetails] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            await actions.getVehiclesInfo(props.vehicle.uid);
            setDetails(store.vehiclesInfo[props.vehicle.uid]);
        };

        fetchDetails();
    }, [props.vehicle.uid, store.vehiclesInfo]);

    useEffect(() => {
        setIsFavorite(store.favorites.some(fav => fav.name === props.vehicle.name));
    }, [store.favorites, props.vehicle.name]);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            actions.removeFavorite(props.vehicle.name);
        } else {
            actions.addFavorite('vehicle', props.vehicle.uid, props.vehicle.name);
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="card col-12 col-md m-3" style={{ minWidth: "300px" }}>
            <ImageWithFallback 
                src={`https://starwars-visualguide.com/assets/img/vehicles/${props.vehicle.uid}.jpg`} 
                fallbackSrc="https://placehold.co/300x200"
                alt="Card image" 
                width={300} 
                height={200}
            />
            <div className="card-body">
                <h5 className="card-title">{props.vehicle.name}</h5>
                {details ? (
                    <>
                        <p className="card-text">Model: {details.model}</p>
                        <p className="card-text">Length: {details.length}</p>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/details/vehicle/${props.vehicle.uid}`} className="btn btn-dark">Learn more!</Link>
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
