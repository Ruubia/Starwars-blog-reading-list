import React, { useContext } from "react";
import { Card } from "../component/cardCharacters";
import { CardPlanets } from "../component/cardPlanets";
import { CardVehicles } from "../component/cardVehicles";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
    const { store } = useContext(Context);

    const eachCharacter = store.people.map((people, index) => (
        <Card key={index} people={people} />
    ));

    const eachPlanet = store.planets.map((planet, index) => (
        <CardForPlanets key={index} planet={planet} />
    ));

    const eachVehicle = store.vehicles.map((vehicle, index) => (
        <CardForVehicles key={index} vehicle={vehicle} />
    ));

    return (
        <>
            <div className="m-5">
                <h1>Characters</h1>
                <div className="scrollmenu d-flex">
                    {eachCharacter}
                </div>
            </div>
            <div className="m-5">
                <h1>Planets</h1>
                <div className="scrollmenu d-flex">
                    {eachPlanet}
                </div>
            </div>
            <div className="m-5">
                <h1>Vehicles</h1>
                <div className="scrollmenu d-flex">
                    {eachVehicle}
                </div>
            </div>
        </>
    );
};
