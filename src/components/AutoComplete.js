import '../App.css';
import React, {useState} from "react";
import getData from '../data';

export default function AutoComplete({setImg, setStats, setDisplayName, updatePokemon, index, setType}){
    const [suggestion, setSuggestion] = useState([""]);
    const [pokemon, setPokemon] = useState("");
    const [keyIndex, setKeyIndex] = useState(0);
    const [error, setError] = useState(false);
  
    const handleChange = (e) => {
      let userInput = e.target.value;
  
      setPokemon(userInput);
      const data = getData();
      let suggest = data.filter(
        suggestion =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      ).sort();
      setSuggestion(suggest)

      if(suggest.length === 0){
        setSuggestion([""])
        setError(true)
      } else{
        setSuggestion(suggest)
        setError(false)
      }   
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();

      if(error) return;
  
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
      .then((p) => p.json())
      .then((p) => {
        setImg(p.id > 649 ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png` 
                          : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${p.id}.gif`
              );
        setStats(p.stats);
        setDisplayName(pokemon);
        updatePokemon({name:pokemon, stats:p.stats, imgNum:p.id}, index);
        setType(p.types.map((type) => (type.type.name)))
        setSuggestion([""]);
        setPokemon("")
      }, (err) => console.log(err))
      .catch();
    };

    const handleClick = (pokemon) => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
      .then((p) => p.json())
      .then((p) => {
        setImg(p.id > 649 ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png` : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${p.id}.gif`);
        setStats(p.stats);
        setDisplayName(pokemon);
        updatePokemon({name:pokemon, stats:p.stats, imgNum:p.id}, index);
        setType(p.types.map((type) => (type.type.name)))
        setSuggestion([""]);
        setPokemon("")
      })
      .catch();
    }
  
    const handleKey = (e) => {
      
      if (e.keyCode  === 8){ //backspace reset index
        setKeyIndex(0)
      }
      if (e.keyCode  === 13){ //enter, set pokemon, reset index
        setPokemon(suggestion[keyIndex])
        setKeyIndex(0)
      } 
      if (e.keyCode  === 38){ //up arrow
        if(keyIndex === 0) return;
        document.getElementById("sh").scrollBy(0, -24) //controll scrolling of list results back up
        setKeyIndex(keyIndex -1)
        setPokemon(suggestion[keyIndex-1])
      } 
      if (e.keyCode === 40){ //down arrow
       if(keyIndex === suggestion.length-1){
         return
       }
        document.getElementById("sh").scrollBy(0, 24) //controll scrolling of list results back up
        setKeyIndex(keyIndex+1)
        setPokemon(suggestion[keyIndex+1])
      }
    }
  
    return(
      <div style={{position:"relative"}}>
        <form className="row g-3 mt-3" onSubmit={handleSubmit}>
          <div className="col-auto" >
            <input className={error ? 'form-control is-invalid': 'form-control'} type={'search'} value={pokemon} onChange={handleChange} placeholder="Search for a Pokemon" onKeyDown={handleKey} />
              <div className="invalid-feedback">
                Can't find a Pokémon with that name.
              </div>
              {pokemon.length >=1 && !error && 
              <ul className='suggestions' id="sh">
                {suggestion.map((pokemon, index) => (
                  <li key={index} className={index === keyIndex ? "suggestion-active" : ""} onClick={() => handleClick(pokemon)}>
                  {pokemon}
                  </li>
                ))}
              </ul>}
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">Search</button>
          </div>
        </form>
      </div>
    );
};
  