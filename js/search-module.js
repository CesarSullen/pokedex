document.getElementById("searchBtn").addEventListener("click", function () {
  const inputValue = document.getElementById("searchInput").value.toLowerCase();
  pokemonList.innerHTML = "";

  const totalPokemons = 151; // Primera generación
  const fetchPromises = [];

  for (let i = 1; i <= totalPokemons; i++) {
    fetchPromises.push(
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((response) => response.json())
        .then((data) => {
          const pokemon = {
            id: data.id,
            name: data.name,
            img: data.sprites.other.dream_world.front_default,
            types: data.types.map((type) => type.type.name),
          };

          if (pokemon.name.includes(inputValue)) {
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
            pokemonList.appendChild(link);
          }
        })
        .catch((error) => console.error(error))
    );
  }

  Promise.all(fetchPromises).then(() => {
    if (pokemonList.innerHTML === "") {
      alert("Pokemons were not found.");
    }
  });
});

document
  .getElementById("searchInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      document.getElementById("searchBtn").click();
    }
  });

document.getElementById("clearBtn").addEventListener("click", function () {
  document.getElementById("searchInput").value = "";
});
