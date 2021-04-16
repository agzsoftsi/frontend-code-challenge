import React, { useState } from 'react';
import './App.css';

const URL_PATH = "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

const App = () => {
    const [search, setSearch] = useState('');
    const [namePokemon, setNamePokemon] = useState();
    const [picPokemon, setPicPokemon] = useState();
    const [typePokemon, setTypePokemon] = useState();
    const [typePokemon2, setTypePokemon2] = useState();
  

    const onChange = (evt) =>{
        setSearch(evt.target.value);
    }

    const searchPoke = async (poketype) =>{
        try{
            const response = await fetch(URL_PATH);
            const data = await response.json();
            const dataFound = data.filter(elem => elem.Name.toLowerCase() === search.toLowerCase());

           /* if(dataFound.length < 1){
                const dataFound = data.filter(elem => (elem.Types.toLowerCase()).map(type => type === search.toLowerCase()));
                return dataFound;
            }*/

            return dataFound;
        }
        catch (err){
            console.error(err);
        }
    }

    const onClick = async(evt) =>{
        try{
            const data = await searchPoke(search);
            console.log(data[0].Name);
            setNamePokemon(data[0].Name);
            setPicPokemon(data[0].img);
            setPicPokemon(data[0].img);
            setTypePokemon(data[0].Types[0].toLowerCase());
            setTypePokemon2(data[0].Types[1].toLowerCase());
        }
        catch (err){
            console.error(err);
        }
        
    }
    
    return (<>
        <label htmlFor="maxCP" className="max-cp">
            <input type="checkbox" id="maxCP" />
            <small>
                Maximum Combat Points
            </small>
        </label>
        <div className='search-section'>
            <input type="text" 
                className="input"
                placeholder="Pokemon or type" 
                onChange={onChange}
            />
            <div className="search-button"><button onClick={onClick}>Search
            </button>
            </div>
        </div>
        
        <div className="loader"></div>
        <ul className="suggestions">
            <li>
                <img src={picPokemon} alt="" />
                <div className="info">
                    <h1>
                        <span className="hl">{namePokemon}</span></h1>
                    <span className={"type "+ typePokemon}>{typePokemon}</span>
                    <span className={"type "+ typePokemon2}>{typePokemon2}</span>
                
                </div>
            </li>
            <li>
                <img src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png" alt="" />
                <div className="info">
                    <h1 className="no-results">
                        No results
                    </h1>
                </div>
            </li>
        </ul>
    </>);
}

export default App;
