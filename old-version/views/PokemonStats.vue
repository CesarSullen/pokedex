<template>
	<PokemonStat :pokemon="pokemon" :locations="locations"></PokemonStat>
</template>

<script setup>
	import PokemonStat from "../components/PokemonStat.vue";
	import { useRoute } from "vue-router";
	import { pokeapi } from "../api/pokeapi";
	import { ref } from "vue";

	const routeId = useRoute().params.id;
	const pokemon = ref();

	const fetchData = async () => {
		await fetch(pokeapi + `${routeId}`)
			.then((response) => response.json())
			.then((data) => showPokemon(data));
	};
	fetchData();

	function showPokemon(poke) {
		pokemon.value = {
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
	}

	const locations = ref([]);
	fetch(pokeapi + `${routeId}` + "/encounters")
		.then((response) => response.json())
		.then((data) => {
			locations.value = data.map((encounter) => encounter.location_area.name);
		});
</script>
