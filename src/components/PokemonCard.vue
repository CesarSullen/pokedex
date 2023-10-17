<template>
	<div class="pokemon-card">
		<p class="pokemon-id-back">{{ pokemon.id }}</p>
		<div class="pokemon-img">
			<img :src="pokemon.img" :alt="pokemon.name" />
		</div>

		<div class="pokemon-info">
			<h2 class="pokemon-name">{{ pokemon.name }}</h2>
			<div class="pokemon-types">
				<p v-for="type in pokemon.types" :key="type" :id="type" class="type">
					{{ type }}
				</p>
			</div>
			<div class="pokemon-stats">
				<p class="stat">{{ pokemon.height }}m</p>
				<p class="stat">{{ pokemon.weight }}kg</p>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { defineProps } from "vue";

	const props = defineProps({
		pokemon: {
			type: Object,
			required: true,
		},
	});
</script>
