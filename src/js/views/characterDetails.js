import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CharacterDetails = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        actions.getPeopleInfo(id)
            .then(() => {
                setDetails(store.peopleInfo[id]);
            })
            .catch(error => {
                console.error("Error fetching details:", error);
            });
    }, [id, store.peopleInfo, actions]);

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container m-5">
            <div className="row">
                <div className="col-md-4">
                    <img src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} className="img-fluid" alt={details.name} />
                </div>
                <div className="col-md-8">
                    <h1>{details.name}</h1>
                    <p>A person within the Star Wars universe</p>
                    <div className="row">
                        <div className="col-md-4">
                            <strong>Name:</strong>
                            <p>{details.name}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Birth Year:</strong>
                            <p>{details.birth_year}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Gender:</strong>
                            <p>{details.gender}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Height:</strong>
                            <p>{details.height}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Skin Color:</strong>
                            <p>{details.skin_color}</p>
                        </div>
                        <div className="col-md-4">
                            <strong>Eye Color:</strong>
                            <p>{details.eye_color}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

