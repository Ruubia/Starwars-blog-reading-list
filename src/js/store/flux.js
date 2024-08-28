const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            people: JSON.parse(localStorage.getItem("people")) || [],
            peopleInfo: JSON.parse(localStorage.getItem("peopleInfo")) || {},
            planets: JSON.parse(localStorage.getItem("planets")) || [],
            planetsInfo: JSON.parse(localStorage.getItem("planetsInfo")) || {},
            vehicles: JSON.parse(localStorage.getItem("vehicles")) || [],
            vehiclesInfo: JSON.parse(localStorage.getItem("vehiclesInfo")) || {},
            favorites: JSON.parse(localStorage.getItem("favorites")) || []
        },
        actions: {
            getPeople: () => {
                const store = getStore();
                if (store.people.length === 0) {
                    fetch("https://www.swapi.tech/api/people?page=1&limit=83", {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json"
                        }
                    })
                    .then(resp => {
                        if (!resp.ok) {
                            throw new Error(`error status: ${resp.status}`);
                        }
                        return resp.json();
                    })
                    .then(data => {
                        setStore({ people: data.results });
                        localStorage.setItem("people", JSON.stringify(data.results));
                    })
                    .catch(error => {
                        console.error("Error", error);
                    });
                }
            },
            getPeopleInfo: (id) => {
                const store = getStore();
                if (!store.peopleInfo[id]) {
                    fetch(`https://www.swapi.tech/api/people/${id}`, {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json"
                        }
                    })
                    .then(resp => {
                        if (!resp.ok) {
                            throw new Error(`error status: ${resp.status}`);
                        }
                        return resp.json();
                    })
                    .then(data => {
                        setStore({ peopleInfo: { ...store.peopleInfo, [id]: data.result.properties } });
                        localStorage.setItem("peopleInfo", JSON.stringify({ ...store.peopleInfo, [id]: data.result.properties }));
                    })
                    .catch(error => {
                        console.error("Error", error);
                    });
                }
            },
            getPlanets: () => {
                const store = getStore();
                if (store.planets.length === 0) {
                    fetch("https://www.swapi.tech/api/planets?page=1&limit=60", {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json"
                        }
                    })
                    .then(resp => {
                        if (!resp.ok) {
                            throw new Error(`error status: ${resp.status}`);
                        }
                        return resp.json();
                    })
                    .then(data => {
                        setStore({ planets: data.results });
                        localStorage.setItem("planets", JSON.stringify(data.results));
                    })
                    .catch(error => {
                        console.error("Error", error);
                    });
                }
            },
            getPlanetsInfo: (id) => {
                const store = getStore();
                if (!store.planetsInfo[id]) {
                    fetch(`https://www.swapi.tech/api/planets/${id}`, {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json"
                        }
                    })
                    .then(resp => {
                        if (!resp.ok) {
                            throw new Error(`error status: ${resp.status}`);
                        }
                        return resp.json();
                    })
                    .then(data => {
                        setStore({ planetsInfo: { ...store.planetsInfo, [id]: data.result.properties } });
                        localStorage.setItem("planetsInfo", JSON.stringify({ ...store.planetsInfo, [id]: data.result.properties }));
                    })
                    .catch(error => {
                        console.error("Error", error);
                    });
                }
            },
            getVehicles: () => {
                const store = getStore();
                if (store.vehicles.length === 0) {
                    fetch("https://www.swapi.tech/api/vehicles?page=1&limit=76", {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json"
                        }
                    })
                    .then(resp => {
                        if (!resp.ok) {
                            throw new Error(`error status: ${resp.status}`);
                        }
                        return resp.json();
                    })
                    .then(data => {
                        setStore({ vehicles: data.results });
                        localStorage.setItem("vehicles", JSON.stringify(data.results));
                    })
                    .catch(error => {
                        console.error("Error", error);
                    });
                }
            },
            getVehiclesInfo: (id) => {
                const store = getStore();
                if (!store.vehiclesInfo[id]) {
                    fetch(`https://www.swapi.tech/api/vehicles/${id}`, {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json"
                        }
                    })
                    .then(resp => {
                        if (!resp.ok) {
                            throw new Error(`error status: ${resp.status}`);
                        }
                        return resp.json();
                    })
                    .then(data => {
                        setStore({ vehiclesInfo: { ...store.vehiclesInfo, [id]: data.result.properties } });
                        localStorage.setItem("vehiclesInfo", JSON.stringify({ ...store.vehiclesInfo, [id]: data.result.properties }));
                    })
                    .catch(error => {
                        console.error("Error", error);
                    });
                }
            },
            addFavorite: (type, id, name) => {
                const store = getStore();
                const url = `/details/${type}/${id}`;
                if (!store.favorites.find(fav => fav.name === name)) {
                    const newFavorites = [...store.favorites, { type, id, name, url }];
                    setStore({ favorites: newFavorites });
                    localStorage.setItem("favorites", JSON.stringify(newFavorites));
                }
            },
            removeFavorite: (name) => {
                const store = getStore();
                const newFavorites = store.favorites.filter(fav => fav.name !== name);
                setStore({ favorites: newFavorites });
                localStorage.setItem("favorites", JSON.stringify(newFavorites));
            }
        }
    };
};

export default getState;

