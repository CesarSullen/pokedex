const pokemonList = document.getElementById("pokemonList");

const totalPokemons = 151; // Primera generación
// Obtaining Pokémon List
for (let i = 1; i <= totalPokemons; i++) {
  fetch("https://pokeapi.co/api/v2/pokemon/" + i)
    .then((response) => response.json())
    .then((data) => {
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
      pokemonList.appendChild(link);
    })
    .catch((error) => console.log(error));
}

// Obtaining Pokémon types
const categories = document.getElementById("categories");
for (let i = 1; i <= 18; i++) {
  fetch("https://pokeapi.co/api/v2/type/" + i)
    .then((response) => response.json())
    .then((data) => {
      const typeBtn = document.createElement("button");
      typeBtn.onclick = function () {
        window.location.href = `./views/pokemon-types.html?name=${data.name}`;
      };

      typeBtn.classList.add("type-btn");
      typeBtn.classList.add("category");
      typeBtn.textContent = data.name.toUpperCase();

      categories.appendChild(typeBtn);
    });
}

/* 
// Interception Observer
const sections = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);
sections.forEach((section) => {
  observer.observe(section);
});
 */
