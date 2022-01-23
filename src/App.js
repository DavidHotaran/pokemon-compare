import './App.css';
import React, {useState, useEffect} from "react";
import getData from './data';

function AutoComplete({setImg, setStats, setDisplayName, updatePokemon, index}){
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

function Row({intitial, updatePokemon, index}) {
  const [stats, setStats] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const STAT = ["hp", "attack", "defense", "sp. attack", "sp. defense", "speed"];
  const [img, setImg] = useState("");
  
  useEffect( () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${intitial}/`)
    .then((p) => p.json())
    .then((p) => {
      setImg(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${p.id}.gif`)
      setStats(p.stats)
      setDisplayName(intitial)
    })
    .catch()
  }, []);

  return (
    <div className='col custom-border '> {/* col 1 */}
          <div className='d-flex justify-content-center text-center'> {/* contain and center: title, img */}
            <div> {/* container to keep everything in col */}
            <AutoComplete setStats={setStats} setDisplayName={setDisplayName} updatePokemon={updatePokemon} index={index} setImg={setImg}/>
            <h1 className='display-5 text-capitalize mt-2'>{displayName}</h1>
            <img className='img-fluid my-3' style={{height: "6.25rem"}} src={img} alt=''/>
            </div>
          </div>
          <div> {/* table container */}
            <div className='row px-4'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Stat</th>
                    <th scope="col">Value</th>
                    <th scope="col">Range</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {STAT.map((stat,index) => (
                    <tr key={index}>
                      <th scope="row" className='text-capitalize'>{stat}</th>
                      <td>{stats && stats[index].base_stat}</td>
                      <td colSpan={"7"} ><div className='mt-1' style={stats &&{ width: stats[index].base_stat > 100 ? "99%" : `${stats[index].base_stat / 100 * 100}%`, borderRadius:"10px", height:"15px", backgroundColor:`${stats[index].base_stat <= 50 ? "orange" : stats[index].base_stat <90 && stats[index].base_stat>50 ? "yellow" : stats[index].base_stat >=90 ? "green" : "black"}`}}></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> {/* end table row */}
          </div> {/* end table container */}
        </div> 
  );
}


function CompareStats({pokemon}) {

  let [stats, setStats] = useState([]);
  
  useEffect( ()=> {
    doCompare();
  }, [pokemon])


  /* Get 3 stats, return highest stat and which Pokemon that belonged to */
  const compare = (stat) => {
    let highestStat = Math.max(...stat);
    let whichPokemon = stat.indexOf(highestStat);

    return [highestStat, whichPokemon]; 
  };

  /* Find out which pokemon had highest stat */
  const getPokemon = (index) => {
    switch(index){
      case 0:
        return pokemon[index].name;
      case 1:
        return pokemon[index].name;
      case 2:
        return pokemon[index].name;
    }
  }

  /* Entry point to function */
  const doCompare = () => {
    if(pokemon.length <= 2){
      return;
    }
    /* TODO FIND A FIX FOR THIS */
    let a = []
    for(let i = 0; i < 6; i++) {
      let [stat, index] = compare([pokemon[0].stats[i].base_stat, pokemon[1].stats[i].base_stat, pokemon[2].stats[i].base_stat]);
      let name = pokemon[0].stats[i].stat.name
      let imgNum = pokemon[index].imgNum;
      let img = imgNum > 649 ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imgNum}.png` 
                               : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${imgNum}.gif`
      /* TODO FIND A FIX FOR THIS */
      let ob = {stat:stat, pokemon:getPokemon(index), name:name, img:img};
      a.push(ob)
    }
    /* TODO FIND A FIX FOR THIS */
    setStats(a)

  }

    return(
      <div className='container '>
        {stats.length === 6 && stats.map((p,i) => (
          <div className='row d-flex align-items-center' key={i}>
            <p className='col text-capitalize fw-bold'>{p.name}</p>
            <p className='col text-capitalize fw-bold'>{p.stat}</p>
            <img className='col img-fluid' style={{height:"6.25rem"}} src={p.img} alt=''/>
          </div>
          
        ))}
      </div>
    );
}

function App() {

  const [pokemon, setPokemon] = useState([]);

  const updatePokemon = (p, i) => {
    if(pokemon.length === 3){
      const oldPokemon = [ ...pokemon];
      oldPokemon[i] = p
      setPokemon(oldPokemon)

    }else {
    setPokemon([...pokemon, p])
    }
  };

  return (
    <div>
      <div className='App'>
        <h3 className='display-3 text-center'>Pokémon Compare</h3>
        <div className='row row-cols-sm-1 row-cols-md-1 row-cols-lg-3 mx-auto px-4 mt-5'> {/*row */}
          <Row intitial={"charmander"} updatePokemon={updatePokemon} index={0}/>
          <Row intitial={"charmeleon"} updatePokemon={updatePokemon} index={1}/>
          <Row intitial={"charizard"} updatePokemon={updatePokemon} index={2}/>
        </div>
        <div  className='row row-cols-sm-1 row-cols-md-1 row-cols-lg-3 mx-auto px-4 my-3'>
        <div className='col mx-auto custom-border'>
            <h3 className='display-5 text-center mb-3'>Pokémon Comparison breakdown</h3>
            <CompareStats pokemon={pokemon}/>
          </div>
        </div>

      </div>
      {/* <footer className="footer mt-auto py-3 custom-footer text-center">
        <div className="container">
          <span className="text-muted">David Hotaran, 2022</span>
        </div>
      </footer> */}
    </div>
  );
}

export default App;
