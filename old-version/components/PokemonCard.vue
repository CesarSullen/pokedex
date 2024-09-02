<template>
  <router-link :to="{ name: 'PokemonStats', params: { id: pokemon.id } }">
    <div class="pokemon-card">
      <p class="back-id">{{ pokemon.id }}</p>
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
      </div>
    </div>
  </router-link>
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
