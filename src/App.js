import './App.css';
import React, {useState, useEffect} from "react";

function Row({intitial, updatePokemon}) {
  const [pokemon, setPokemon] = useState("");
  const [imgNum, setImgNum] = useState("");
  const [stats, setStats] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [s, _] = useState(["hp", "attack", "defense", "sp. attack", "sp. defense", "speed"]);

  const handleChange = (e) => {
    setPokemon(e.target.value)
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    .then((p) => p.json())
    .then((p) => {
      setImgNum(p.id); ;
      setStats(p.stats);
      setDisplayName(pokemon);
    })
    .catch();

    updatePokemon(pokemon);
  };

  useEffect( () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${intitial}/`)
    .then((p) => p.json())
    .then((p) => {
      setImgNum(p.id);
      setStats(p.stats)
      setDisplayName(intitial)
    })
    .catch()
  }, []);

  return (
    <div className='col custom-border '> {/* col 1 */}
          <div className='d-flex justify-content-center text-center'> {/* contain and center: title, img */}
            <div> {/* container to keep everything in col */}
            <form onSubmit={handleSubmit}>
              <input className='form-control mt-2' type={'search'} onChange={handleChange} placeholder='Search for a Pokémon'/>
            </form>
            <h1 className='display-5 text-capitalize mt-2'>{displayName}</h1>
            <img className='img-fluid my-3' style={{height: "6.25rem"}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${imgNum}.gif`} alt=''/>
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
                  {s.map((stat,index) => (
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


function CompareStats({pokemon1, pokemon2, pokemon3}) {

}

function App() {

  const [pokemon, setPokemon] = useState([]);

  const updatePokemon = (p) => {
    setPokemon([...pokemon, p]);
    console.log(pokemon)
  };

  return (
    <div>
      <div className='App'>
        <h3 className='display-3 text-center'>Pokémon Compare</h3>
        <div className='row row-cols-sm-1 row-cols-md-1 row-cols-lg-3 mx-auto px-4 mt-5'> {/*row */}
          <Row intitial={"charmander"} updatePokemon={updatePokemon}/>
          <Row intitial={"charmeleon"} updatePokemon={updatePokemon}/>
          <Row intitial={"charizard"} updatePokemon={updatePokemon}/>
        </div>
      </div>
      <footer className="footer mt-auto py-3 custom-footer text-center">
        <div className="container">
          <span className="text-muted">David Hotaran, 2022</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
