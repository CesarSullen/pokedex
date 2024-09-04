const pokemonStat = document.getElementById("pokemon-stat");

const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get("id");

async function fetchData() {
  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((response) => response.json())
    .then((data) => showPokemon(data));
}

fetchData();

function showPokemon(poke) {
  pokemon = {
    id: poke.id,
    name: poke.name,
    img: poke.sprites.other.dream_world.front_default,
    height: poke.height,
    weight: poke.weight,
    types: poke.types.map((type) => type.type.name),
    abilities: poke.abilities.map((ability) => ability.ability.name),
    baseXP: poke.base_experience,
    moves: poke.moves.map((move) => move.move.name),
    stats: poke.stats.map((stat) => stat.base_stat),
  };

  const pokemonStatHTML = `
  <div class="pokemon-stat">
    <h1 class="pokemon-name">${pokemon.name}</h1>
    <div class="pokemon-img-container section">
      <img src="${pokemon.img}" />
      <div class="pokemon-types">
        ${pokemon.types
          .map((type) => `<p id="${type}" class="type">${type}</p>`)
          .join("")}
      </div>
    </div>

    <div class="section pokemon-stats">
      <h2 class="section-title">Stats</h2>
      <div class="stat">
        <img src="https://cdn-icons-png.flaticon.com/512/602/602455.png" class="stat-img" />
        <h3 class="stat-name">HP: ${pokemon.stats[0]}</h3>
      </div>
      <div class="stat">
        <img src="https://cdn-icons-png.flaticon.com/512/5542/5542205.png" class="stat-img" />
        <h3 class="stat-name">XP: ${pokemon.baseXP}</h3>
      </div>
      
      <div class="stat">
        <img src="https://cdn-icons-png.flaticon.com/512/1840/1840692.png" class="stat-img" />
        <h3 class="stat-name">ATK: ${pokemon.stats[1]}</h3>
      </div>
      <div class="stat">
        <img src="https://cdn-icons-png.flaticon.com/512/490/490014.png" class="stat-img" />
        <h3 class="stat-name">DEF: ${pokemon.stats[2]}</h3>
      </div>
      <div class="stat">
        <img src="https://cdn-icons-png.flaticon.com/512/867/867922.png" class="stat-img" />
        <h3 class="stat-name">SPATK: ${pokemon.stats[3]}</h3>
      </div>
      <div class="stat">
        <img src="https://cdn-icons-png.flaticon.com/512/1840/1840215.png" class="stat-img" />
        <h3 class="stat-name">SPDEF: ${pokemon.stats[4]}</h3>
      </div>
      <div class="stat">
        <img src="https://cdn-icons-png.flaticon.com/512/1455/1455324.png" class="stat-img" />
        <h3 class="stat-name">SPD: ${pokemon.stats[5]}</h3>
      </div>
    </div>

    <div class="section pokemon-abilities">
      <h2 class="section-title">Abilities</h2>
      ${pokemon.abilities
        .map((ability) => `<p class="section-body">${ability}</p>`)
        .join("")}
    </div>

    <div class="section pokemon-moves">
      <h2 class="section-title">Moves</h2>
      ${pokemon.moves
        .map((move) => `<p class="section-body">${move}</p>`)
        .join("")}
    </div>

  </div>
`;

  // Agregar la estructura HTML al DOM
  document.getElementById("pokemon-stat").innerHTML = pokemonStatHTML;

  pokemonStat.innerHTML = pokemonStatHTML;
}

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/encounters`)
  .then((response) => response.json())
  .then((data) => {
    locations = data.map((encounter) => encounter.location_area.name);
    const locationsHTML = `
      <div class="bold">Locations: ${locations.join(", ")}</div>
    `;
    pokemonStat.innerHTML += locationsHTML;
  });
