const urlParams = new URLSearchParams(window.location.search);
const typeName = urlParams.get("name");

const pokemonListByType = document.getElementById("pokemonListByType");

for (let i = 1; i <= 151; i++) {
  fetch("https://pokeapi.co/api/v2/pokemon/" + i)
    .then((response) => response.json())
    .then((data) => {
      if (data.types.map((type) => type.type.name).includes(typeName)) {
        const pokemon = {
          id: data.id,
          name: data.name,
          img: data.sprites.other.dream_world.front_default,
          types: data.types.map((type) => type.type.name),
        };

        const link = document.createElement("a");
        link.href = `./views/pokemon-stats.html?id=${pokemon.id}`;

        const card = document.createElement("div");
        card.classList.add("pokemon-card");

        card.innerHTML = `
          <div class="pokemon-img">
              <img src="${pokemon.img}" alt="${pokemon.name}">
          </div>
          <div class="pokemon-info">
              <h3 class="pokemon-name">${pokemon.name}</h3>
              
              <div class="pokemon-types bold">${pokemon.types
                .map((type) => {
                  const typeClass = type.toLowerCase();
                  return `<span class="type ${typeClass}">${type}</span>`;
                })
                .join("")}</div>
          </div>
        `;

        link.appendChild(card);
        pokemonListByType.appendChild(link);
      }
    })
    .catch((error) => console.log(error));
}
