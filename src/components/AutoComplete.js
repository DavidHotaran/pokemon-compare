import '../App.css';
import React, {useState} from "react";
import getData from '../data';

export default function AutoComplete({setImg, setStats, setDisplayName, updatePokemon, index}){
    const [suggestion, setSuggestion] = useState([]);
    const [pokemon, setPokemon] = useState("");
    const [keyIndex, setKeyIndex] = useState(0);
  
    const handleChange = (e) => {
      let userInput = e.target.value;
  
      setPokemon(userInput);
      const data = getData();
      let suggest = data.filter(
        suggestion =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      ).sort();
      setSuggestion(suggest);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
      .then((p) => p.json())
      .then((p) => {
        setImg(p.id > 649 ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png` : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${p.id}.gif`);
        setStats(p.stats);
        setDisplayName(pokemon);
        updatePokemon({name:pokemon, stats:p.stats, imgNum:p.id}, index);
        setSuggestion([""]);
      })
      .catch();
    };
  
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
        setKeyIndex(keyIndex -1)
        setPokemon(suggestion[keyIndex-1])
      } 
      if (e.keyCode === 40){ //down arrow
       if(keyIndex === suggestion.length-1){
         return
       }
        setKeyIndex(keyIndex+1)
        setPokemon(suggestion[keyIndex+1])
      }
    }
  
    return(
      <div>
        <form onSubmit={handleSubmit} >
                <input className='form-control mt-2' type={'search'} value={pokemon} onChange={handleChange} placeholder="Search for a Pokemon" onKeyDown={handleKey}/>
              </form>
              {pokemon.length >=1 && suggestion.length >=1 && 
              <ul className='suggestions'>
                {suggestion.map((pokemon, index) => (
                  <li key={index} className={index === keyIndex ? "suggestion-active" : ""} >
                  {pokemon}
                  </li>
                ))}
              </ul>}
      </div>
    )
  
  }
  