<template>
	<div class="main">
		<NavBar @filter-by-type="filterByType" />
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
	import NavBar from "../components/NavBar.vue";
	import { ref, computed } from "vue";
	import { pokeapi } from "../api/pokeapi";

	const pokemonList = ref([]);
	const searchQuery = ref("");
	const filterType = ref("all");

	const fetchData = async () => {
		try {
			for (let i = 1; i <= 1119; i++) {
				const response = await fetch(pokeapi + i);
				const data = await response.json();
				showPokemon(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const showPokemon = (poke) => {
		const pokemon = {
			id: poke.id,
			name: poke.name,
			img: poke.sprites.other.dream_world.front_default,
			types: poke.types.map((type) => type.type.name),
		};
		pokemonList.value.push(pokemon);
	};

	fetchData();

	const filteredPokemonList = computed(() => {
		if (filterType.value === "all") {
			return pokemonList.value.filter((pokemon) => {
				return pokemon.name
					.toLowerCase()
					.includes(searchQuery.value.toLowerCase());
			});
		} else {
			return pokemonList.value.filter((pokemon) => {
				return (
					pokemon.types.includes(filterType.value) &&
					pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
				);
			});
		}
	});

	const filterByType = (type) => {
		filterType.value = type;
	};
</script>

<style scoped>
	.main {
		display: flex;
		flex-direction: column;
	}
	.search-bar {
		align-self: center;
		margin-top: 1rem;
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
