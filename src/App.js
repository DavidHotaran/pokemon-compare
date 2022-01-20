import './App.css';
import React, {useState, useEffect} from "react";

function Row({intitial, updatePokemon, index}) {
  const [pokemon, setPokemon] = useState("");
  const [imgNum, setImgNum] = useState("");
  const [stats, setStats] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [s, _] = useState(["hp", "attack", "defense", "sp. attack", "sp. defense", "speed"]);
  const options = ["orange", "banana", "apple"];

  const handleChange = (e) => {
    setPokemon(e.target.value.toLocaleLowerCase())
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    .then((p) => p.json())
    .then((p) => {
      setImgNum(p.id);
      setStats(p.stats);
      setDisplayName(pokemon);
      updatePokemon({name:pokemon, stats:p.stats, imgNum:p.id}, index);
    })
    .catch();

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


function CompareStats({pokemon}) {

  let [stats, setStats] = useState([]);
  
  useEffect( ()=> {
    console.log(pokemon)
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
    console.log("doing comparison")
    /* TODO FIND A FIX FOR THIS */
    let a = []
    for(let i = 0; i < 6; i++) {
      let [stat, index] = compare([pokemon[0].stats[i].base_stat, pokemon[1].stats[i].base_stat, pokemon[2].stats[i].base_stat]);
      let name = pokemon[0].stats[i].stat.name
      /* TODO FIND A FIX FOR THIS */
      let ob = {stat:stat, pokemon:getPokemon(index), name:name, imgNum:pokemon[index].imgNum};
      a.push(ob)
    }
    /* TODO FIND A FIX FOR THIS */
    setStats(a)
    console.log("done")
  }

    return(
      <div className='container '>
        {stats.length === 6 && stats.map((p,i) => (
          <div className='row d-flex align-items-center' key={i}>
            <p className='col text-capitalize fw-bold'>{p.name}</p>
            <p className='col text-capitalize fw-bold'>{p.stat}</p>
            <img className='col img-fluid' style={{height:"6.25rem"}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${p.imgNum}.gif`} alt=''/>
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
      console.log("APP", pokemon)

    }else {
    setPokemon([...pokemon, p])
    console.log("APP", pokemon)
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
