import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const PlanetsDetails = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            await actions.getPlanetsInfo(id);
            setDetails(store.planetsInfo[id]);
        };

        fetchDetails();
    }, [id, store.planetsInfo]);

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container m-5">
            <div className="row">
                <div className="col-md-4">
                    <img src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} className="img-fluid" alt={details.name} />
                </div>
                <div className="col-md-8">
                    <h1>{details.name}</h1>
                    <p>A planet within the Star Wars universe</p>
                    <div className="row">
                        <div className="col-md-4">
                            <strong>Name:</strong>
                            <p>{details.name}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Climate:</strong>
                            <p>{details.climate}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Diameter:</strong>
                            <p>{details.diameter}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Gravity:</strong>
                            <p>{details.gravity}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Population:</strong>
                            <p>{details.population}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Terrain:</strong>
                            <p>{details.terrain}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

