import '../App.css';
import React, {useState, useEffect} from "react";

export default function CompareStats({pokemon}) {

    let [stats, setStats] = useState([]);
    
    useEffect( ()=> {
      doCompare();
    }, [pokemon]);
  
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
    };
  
    /* Entry point to function */
    const doCompare = () => {
      if(pokemon.length <= 2){
        return;
      }
      /* TODO FIND A FIX FOR THIS */
      let a = [];
      for(let i = 0; i < 6; i++) {
        let [stat, index] = compare([pokemon[0].stats[i].base_stat, pokemon[1].stats[i].base_stat, pokemon[2].stats[i].base_stat]);
        let name = pokemon[0].stats[i].stat.name;
        let imgNum = pokemon[index].imgNum;
        let img = imgNum > 649 ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imgNum}.png` 
                               : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${imgNum}.gif`;
        /* TODO FIND A FIX FOR THIS */
        let ob = {stat:stat, pokemon:getPokemon(index), name:name, img:img};
        a.push(ob);
      }
      /* TODO FIND A FIX FOR THIS */
      setStats(a);
    }
  
      return(
        <div  className='row row-cols-sm-1 row-cols-md-1 row-cols-lg-3 mx-auto px-4 my-3'>
        {stats.length === 6 && 
        <div className='col mx-auto custom-border'>
            <h3 className='display-5 text-center mb-3'>Pokémon Comparison breakdown</h3>
             {stats.map((p,i) => (
            <div className='row d-flex align-items-center' key={i}>
              <p className='col text-capitalize fw-bold'>{p.name}</p>
              <p className='col text-capitalize fw-bold'>{p.stat}</p>
              <img className='col img-fluid' src={p.img} alt=''/>
            </div>
          ))}
          </div>
        }
        </div>  
      );
};