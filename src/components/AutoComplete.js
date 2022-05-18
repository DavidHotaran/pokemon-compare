import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import getData from '../data';

export default function AutoComplete({ setImg, setStats, setDisplayName, updatePokemon, index, setType }) {

  async function handleSubmit(event, value) {
    event.preventDefault();
    if (value === null) return;

    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}/`);
    const pokemon = await data.json();
    const image = pokemon.id > 649
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`;

    setImg(image);
    setStats(pokemon.stats);
    setDisplayName(value);
    updatePokemon({ name: value, stats: pokemon.stats, imgNum: pokemon.id }, index);
    setType(pokemon.types.map((type) => (type.type.name)));
  };

  return (
    <Autocomplete
      onChange={(event, value) => handleSubmit(event, value)}
      options={getData()}
      sx={{ width: 300, marginTop: 2 }}
      renderInput={(params) => <TextField {...params} label="Pokemon" />}
    />
  );
};
