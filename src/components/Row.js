import '../App.css';
import React, {useState, useEffect} from "react";
import AutoComplete from './AutoComplete';

export default function Row({intitial, updatePokemon, index}) {
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
  