import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Autosuggest from 'react-autosuggest';
import '../../styles/navbar.css';

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        if (inputLength === 0) return [];

        const combinedData = [...store.people, ...store.planets, ...store.vehicles];

        return combinedData.filter(item =>
            item.name.toLowerCase().includes(inputValue)
        );
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const onSuggestionSelected = (event, { suggestion }) => {
        const type = suggestion.url.includes('people') ? 'character' : 
                     suggestion.url.includes('planets') ? 'planet' : 'vehicle';
        const id = suggestion.uid;
        navigate(`/details/${type}/${id}`);
    };

    const getSuggestionValue = suggestion => suggestion.name;

    const renderSuggestion = suggestion => (
        <div>
            {suggestion.name}
        </div>
    );

    const clearInput = () => {
        setValue('');
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: 'Search characters, planets, vehicles...',
        value,
        onChange: (event, { newValue }) => {
            setValue(newValue);
        }
    };

    return (
        <nav className="navbar navbar-light bg-light mb-3">
            <div className="container">
                <div>
                    <Link to="/">
                        <img 
                            src="https://1000logos.net/wp-content/uploads/2017/06/Star-Wars-Logo-1.png"
                            className="card-img-top" 
                            alt="Card image" 
                            style={{ width: "150px" }}
                        />
                    </Link>
                </div>
                <div className="autosuggest-container">
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        onSuggestionSelected={onSuggestionSelected}
                        inputProps={inputProps}
                    />
                    {value && (
                        <button className="clear-button" onClick={clearInput}>
                            &times;
                        </button>
                    )}
                </div>
                <div className="dropdown">
                    <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        Favorites <span className="badge bg-dark">{store.favorites.length}</span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {store.favorites.length > 0 ? (
                            store.favorites.map((item, index) => (
                                <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                                    <Link to={item.url}>{item.name}</Link>
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => actions.removeFavorite(item.name)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-item">No favorites added</li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
