import './App.css';
import React, {useState} from "react";
import CompareStats from './components/CompareStats';
import Row from './components/Row';

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
        <CompareStats pokemon={pokemon}/>
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
