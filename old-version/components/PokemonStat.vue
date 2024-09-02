<template>
  <h1 class="pokemon-name">{{ pokemon.name }}</h1>
  <div class="stats-container">
    <div class="pokemon-img-container">
      <img :src="pokemon.img" />
      <div class="pokemon-types">
        <p :id="type" class="type" v-for="type in pokemon.types" :key="type">
          {{ type }}
        </p>
      </div>
    </div>

    <div class="section">
      <div class="pokemon-stats">
        <div class="stat">
          <img
            src="https://cdn-icons-png.flaticon.com/512/602/602455.png"
            class="stat-img"
          />
          <h3 class="stat-name">HP: {{ pokemon.stats[0] }}</h3>
        </div>
        <div class="stat">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5542/5542205.png"
            class="stat-img"
          />
          <h3 class="stat-name">XP: {{ pokemon.baseXP }}</h3>
        </div>
        <div class="stat">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1840/1840692.png"
            class="stat-img"
          />
          <h3 class="stat-name">ATK: {{ pokemon.stats[1] }}</h3>
        </div>
        <div class="stat">
          <img
            src="https://cdn-icons-png.flaticon.com/512/490/490014.png"
            class="stat-img"
          />
          <h3 class="stat-name">DEF: {{ pokemon.stats[2] }}</h3>
        </div>
        <div class="stat">
          <img
            src="https://cdn-icons-png.flaticon.com/512/867/867922.png"
            class="stat-img"
          />
          <h3 class="stat-name">SPATK: {{ pokemon.stats[3] }}</h3>
        </div>
        <div class="stat">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1840/1840215.png"
            class="stat-img"
          />
          <h3 class="stat-name">SPDEF: {{ pokemon.stats[4] }}</h3>
        </div>
        <div class="stat">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1455/1455324.png"
            class="stat-img"
          />
          <h3 class="stat-name">SPD: {{ pokemon.stats[5] }}</h3>
        </div>

        <div class="pokemon-abilities">
          <h2 class="section-title">Abilities:</h2>
          <p
            v-for="ability in pokemon.abilities"
            :key="ability"
            class="section-body"
          >
            {{ ability }}
          </p>
        </div>
      </div>

      <!--IT DOES'NT WORK
			<div class="pokemon-locations">
				<h2 class="section-title">Locations:</h2>

				<p
					v-for="location in props.locations"
					:key="location"
					class="section-body"
				>
					{{ location }}
				</p>
			</div> -->
    </div>
    <div class="pokemon-moves">
      <h2 class="section-title">Moves:</h2>

      <p v-for="move in pokemon.moves" :key="move" class="section-body">
        {{ move }}
      </p>
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
  locations: {
    type: Array,
    required: true,
  },
});
</script>
