const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get("id");

async function fetchData() {
  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((response) => response.json())
    .then((data) => showPokemon(data));
}

fetchData();

function showPokemon(poke) {
  const pokemon = {
    id: poke.id,
    name: poke.name,
    img: poke.sprites.other.dream_world.front_default,
    gif: poke.sprites.other.showdown.front_default,
    height: poke.height,
    weight: poke.weight,
    types: poke.types.map((type) => type.type.name),
    abilities: poke.abilities.map((ability) => ability.ability.name),
    baseXP: poke.base_experience,
    moves: poke.moves.map((move) => move.move.name),
    stats: poke.stats.map((stat) => stat.base_stat),
  };

  // Adding the elements to the DOM
  const pokemonIdElement = document.querySelector(".pokemon-id");
  pokemonIdElement.innerText = "#" + pokemon.id;

  const pokemonImgContainer = document.getElementById("pokemonImgContainer");

  const pokemonName = document.querySelector(".pokemon-name");
  pokemonName.textContent = pokemon.name;

  const pokemonTypes = document.querySelector(".pokemon-types");

  const pokemonImg = document.createElement("img");
  pokemonImg.src = pokemon.gif;

  const pokemonMeasures = document.querySelector(".pokemon-measures");
  const pokemonWeight = document.getElementById("pokemonWeight");
  const pokemonHeight = document.getElementById("pokemonHeight");

  pokemon.types.forEach((type) => {
    const typeP = document.createElement("p");
    typeP.id = type;
    typeP.classList.add("type", type.toLowerCase());
    typeP.textContent = type;
    pokemonTypes.appendChild(typeP);
  });

  pokemonWeight.innerText = pokemon.weight / 10 + " kg";
  pokemonHeight.innerText = pokemon.height / 10 + " m";

  pokemonImgContainer.appendChild(pokemonImg);
  pokemonImgContainer.appendChild(pokemonMeasures);

  // Obtaining Stats Data
  const statsData = [
    {
      name: "HP",
      value: pokemon.stats[0],
      imgSrc: "https://cdn-icons-png.flaticon.com/512/602/602455.png",
    },
    {
      name: "XP",
      value: pokemon.baseXP,
      imgSrc: "https://cdn-icons-png.flaticon.com/512/5542/5542205.png",
    },
    {
      name: "ATK",
      value: pokemon.stats[1],
      imgSrc: "https://cdn-icons-png.flaticon.com/512/1840/1840692.png",
    },
    {
      name: "DEF",
      value: pokemon.stats[2],
      imgSrc: "https://cdn-icons-png.flaticon.com/512/490/490014.png",
    },
    {
      name: "SPATK",
      value: pokemon.stats[3],
      imgSrc: "https://cdn-icons-png.flaticon.com/512/867/867922.png",
    },
    {
      name: "SPDEF",
      value: pokemon.stats[4],
      imgSrc: "https://cdn-icons-png.flaticon.com/512/1840/1840215.png",
    },
    {
      name: "SPD",
      value: pokemon.stats[5],
      imgSrc: "https://cdn-icons-png.flaticon.com/512/1455/1455324.png",
    },
  ];

  const pokemonStat = document.getElementById("pokemonStats");
  statsData.forEach((stat) => {
    const statDiv = document.createElement("div");
    statDiv.classList.add("stat");

    const img = document.createElement("img");
    img.src = stat.imgSrc;
    img.classList.add("stat-img");

    const statName = document.createElement("h4");
    statName.textContent = stat.name;

    const customMeter = document.createElement("div");
    customMeter.classList.add("custom-meter");

    const meterValue = document.createElement("div");
    meterValue.classList.add("meter-value");
    meterValue.style.width = 0;
    const percentage = (stat.value / 255) * 100;

    setTimeout(() => {
      meterValue.style.width = percentage + "%";
    }, 1000);

    const statValue = document.createElement("h4");
    statValue.classList.add("important-text");
    statValue.textContent = stat.value;

    customMeter.appendChild(meterValue);

    statDiv.appendChild(img);
    statDiv.appendChild(statName);
    statDiv.appendChild(customMeter);
    statDiv.appendChild(statValue);
    pokemonStat.appendChild(statDiv);
  });

  // Pokémon Description
  async function getPokemonDescription() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
      );
      const data = await response.json();
      const descriptions = data.flavor_text_entries;

      // EN
      const englishDescription = descriptions.find(
        (entry) => entry.language.name === "en"
      );
      const descriptionText = englishDescription.flavor_text.replace(
        /\n/g,
        " "
      );
      displayDescription(descriptionText);
    } catch (error) {
      console.error("Error fetching Pokémon description:", error);
    }
  }
  getPokemonDescription();

  function displayDescription(description) {
    const pokemonDescription = document.getElementById("pokemonDescription");
    pokemonDescription.innerText = description;
  }

  const pokemonAbilities = document.getElementById("pokemonAbilities");

  pokemon.abilities.forEach((ability) => {
    const abilityP = document.createElement("p");
    abilityP.classList.add("section-body");
    abilityP.textContent = ability.replace(/-/g, " ");
    pokemonAbilities.appendChild(abilityP);
  });

  const pokemonLocations = document.getElementById("pokemonLocations");

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/encounters`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        const noLocationsMessage = document.createElement("p");
        noLocationsMessage.classList.add(
          "section-body",
          "warning-text",
          "bold"
        );
        noLocationsMessage.textContent =
          "You cannot find this Pokémon in the world";
        pokemonLocations.appendChild(noLocationsMessage);
      } else {
        data.forEach((encounter) => {
          const locationName = document.createElement("p");
          locationName.classList.add("section-body");
          locationName.textContent = encounter.location_area.name.replace(
            /-/g,
            " "
          );
          pokemonLocations.appendChild(locationName);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching locations:", error);
    });

  const pokemonMoves = document.getElementById("pokemonMoves");

  pokemon.moves.forEach((move) => {
    const moveP = document.createElement("p");
    moveP.classList.add("section-body");
    moveP.textContent = move.replace(/-/g, " ");
    pokemonMoves.appendChild(moveP);
  });
  updateOGTags(pokemon.name, pokemon.img);
}

// Updating OG Tags
function updateOGTags(title, imgURL) {
  // Title tag
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute("content", title);
  } else {
    console.warn("OG title tag not found.");
  }

  // Image tag
  const ogImg = document.querySelector('meta[property="og:image"]');
  if (ogImg) {
    ogImg.setAttribute("content", imgURL);
  } else {
    console.warn("OG image tag not found.");
  }
}

// Accordion
const items = document.querySelectorAll(".accordion-item");

items.forEach((item) => {
  const header = item.querySelector(".accordion-header");

  header.addEventListener("click", () => {
    const content = item.querySelector(".accordion-content");
    const toggle = item.querySelector(".accordion-toggle");

    content.classList.toggle("active");
    toggle.classList.toggle("turned");
  });
});
