const pokemonList = document.getElementById("pokemonList");

const totalPokemons = 1118;
let offset = 0;
let limit = 8;

// Pokémon List
async function fetchPokemon(offset) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );

    const data = await response.json();

    const pokemonList = document.getElementById("pokemonList");

    data.results.forEach(async (pokemonData) => {
      const pokemonResponse = await fetch(pokemonData.url);
      const pokemon = await pokemonResponse.json();

      const pokemonCard = {
        id: pokemon.id,
        name: pokemon.name,
        img: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types.map((type) => type.type.name),
      };

      const link = document.createElement("a");
      link.href = `./views/pokemon-stats.html?id=${pokemonCard.id}`;

      const card = document.createElement("div");
      card.classList.add("pokemon-card");

      card.innerHTML = `
              <div class="pokemon-img">
                  <img src="${pokemonCard.img}" alt="${pokemonCard.name}">
              </div>
              <div class="pokemon-info">
                  <h3 class="pokemon-name">${pokemonCard.name}</h3>
                  
                  <div class="pokemon-types bold">${pokemonCard.types
                    .map((type) => {
                      const typeClass = type.toLowerCase();
                      return `<span class="type ${typeClass}">${type}</span>`;
                    })
                    .join("")}</div>
              </div>
            `;

      link.appendChild(card);
      pokemonList.appendChild(link);
    });
  } catch (error) {
    console.log(error);
  }
}

fetchPokemon(offset);

// Pagination
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

prevBtn.addEventListener("click", () => {
  pokemonList.innerHTML = "";
  if (offset > 0) {
    offset -= limit;
    fetchPokemon(offset);
  }
});

nextBtn.addEventListener("click", () => {
  pokemonList.innerHTML = "";
  offset += limit;
  fetchPokemon(offset);
});

// Pokémon types
const categories = document.getElementById("categories");

for (let i = 1; i <= 18; i++) {
  fetch(`https://pokeapi.co/api/v2/type/${i}`)
    .then((response) => response.json())
    .then((data) => {
      const typeBtn = document.createElement("button");
      const typeImg = document.createElement("img");
      const typeText = document.createElement("p");

      typeImg.classList.add("type-img");
      typeImg.setAttribute("src", `./public/icons/${data.name}.svg`);
      typeImg.id = data.name;

      typeBtn.classList.add("type-btn");
      typeBtn.classList.add("category");

      typeText.textContent = `${data.name.toUpperCase()}`;
      typeText.classList.add("type-text");

      typeBtn.appendChild(typeImg);
      typeBtn.appendChild(typeText);

      categories.appendChild(typeBtn);

      typeBtn.onclick = function () {
        window.location.href = `./views/pokemon-types.html?name=${data.name}`;
      };
    })
    .catch((error) => {
      console.error("Fetch error:", error);
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
