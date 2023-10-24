<template>
	<div class="main">
		<div class="search-bar">
			<input
				type="text"
				v-model="searchQuery"
				placeholder="Search for a Pokemon"
			/>
		</div>

		<div class="pokemon-container" id="pokemon-list">
			<template v-for="pokemon in filteredPokemonList" :key="pokemon.id">
				<PokemonCard :pokemon="pokemon" />
			</template>
		</div>
	</div>
</template>
<script setup>
	import PokemonCard from "../components/PokemonCard.vue";
	import { ref, computed } from "vue";
	import { pokeapi } from "../api/pokeapi";

	const pokemonList = ref([]);
	const searchQuery = ref("");

	for (let i = 1; i <= 151; i++) {
		fetch(pokeapi + i)
			.then((response) => response.json())
			.then((data) => showPokemon(data));
	}

	const showPokemon = (poke) => {
		const pokemon = {
			id: poke.id,
			name: poke.name,
			img: poke.sprites.other.dream_world.front_default,
			types: poke.types.map((type) => type.type.name),
		};
		pokemonList.value.push(pokemon);
	};

	const filteredPokemonList = computed(() => {
		return pokemonList.value.filter((pokemon) => {
			return pokemon.name
				.toLowerCase()
				.includes(searchQuery.value.toLowerCase());
		});
	});
</script>
<style scoped>
	.main {
		display: flex;
		flex-direction: column;
	}
	.search-bar {
		align-self: center;
	}
	input[type="text"] {
		border: none;
		outline: none;
		font-size: 1rem;
		padding: 0.5rem;
		border-radius: 100vmax;
		margin-bottom: 50px;
	}
</style>
