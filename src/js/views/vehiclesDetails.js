import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const VehiclesDetails = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            await actions.getVehiclesInfo(id);
            setDetails(store.vehiclesInfo[id]);
        };

        fetchDetails();
    }, [id, store.vehiclesInfo]);

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container m-5">
            <div className="row">
                <div className="col-md-4">
                    <img src={`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`} className="img-fluid" alt={details.name} />
                </div>
                <div className="col-md-8">
                    <h1>{details.name}</h1>
                    <p>A vehicle within the Star Wars universe</p>
                    <div className="row">
                        <div className="col-md-4">
                            <strong>Name:</strong>
                            <p>{details.name}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Model:</strong>
                            <p>{details.model}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Manufacturer:</strong>
                            <p>{details.manufacturer}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Cost in Credits:</strong>
                            <p>{details.cost_in_credits}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Length:</strong>
                            <p>{details.length}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Max Atmosphering Speed:</strong>
                            <p>{details.max_atmosphering_speed}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};