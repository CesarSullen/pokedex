<template>
	<div class="main">
		<div class="pokemon-container" id="pokemon-list">
			<template v-for="pokemon in pokemonList" :key="pokemon.id">
				<PokemonCard :pokemon="pokemon" />
			</template>
		</div>
	</div>
</template>

<script setup>
	import PokemonCard from "../components/PokemonCard.vue";
	import { ref } from "vue";
	const URL = "https://pokeapi.co/api/v2/pokemon/";

	const pokemonList = ref([]);

	for (let i = 1; i <= 151; i++) {
		fetch(URL + i)
			.then((response) => response.json())
			.then((data) => showPokemon(data));
	}

	function showPokemon(poke) {
		const pokemon = {
			id: poke.id,
			name: poke.name,
			img: poke.sprites.other.dream_world.front_default,
			height: poke.height,
			weight: poke.weight,
			types: poke.types.map((type) => type.type.name),
		};

		pokemonList.value.push(pokemon);
	}
</script>
