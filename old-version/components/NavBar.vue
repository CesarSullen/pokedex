<template>
	<div class="nav">
		<ul class="nav-list">
			<li class="nav-item">
				<button class="btn nav-btn" id="see-all" @click="filterByType('all')">
					See All
				</button>
			</li>
			<li class="nav-item">
				<button class="btn nav-btn" id="normal" @click="filterByType('normal')">
					Normal
				</button>
			</li>
			<li class="nav-item">
				<button class="btn nav-btn" id="fire" @click="filterByType('fire')">
					Fire
				</button>
			</li>
			<li class="nav-item">
				<button class="btn nav-btn" id="water" @click="filterByType('water')">
					Water
				</button>
			</li>
			<li class="nav-item">
				<button class="btn nav-btn" id="grass" @click="filterByType('grass')">
					Grass
				</button>
			</li>
			<li class="nav-item">
				<button
					class="btn nav-btn"
					id="electric"
					@click="filterByType('electric')"
				>
					Electric
				</button>
			</li>
			<li class="nav-item">
				<button class="btn nav-btn" id="ice" @click="filterByType('ice')">
					Ice
				</button>
			</li>
			<li class="nav-item">
				<button
					class="btn nav-btn"
					id="fighting"
					@click="filterByType('fighting')"
				>
					Fighting
				</button>
			</li>
			<li class="nav-item">
				<button class="btn nav-btn" id="poison" @click="filterByType('poison')">
					Poison
				</button>
			</li>
			<li class="nav-item">
				<button class="btn nav-btn" id="ground" @click="filterByType('ground')">
					Ground
				</button>
			</li>
			<li class="nav-item">
				<button class="btn nav-btn" id="flying" @click="filterByType('flying')">
					Flying
				</button>
			</li>
			<li class="nav-item">
				<button
					class="btn nav-btn"
					id="psychic"
					@click="filterByType('psychic')"
				>
					Psychic
				</button>
			</li>
			<li class="nav-item">
				<button class="btn nav-btn" id="bug" @click="filterByType('bug')">
					Bug
				</button>
			</li>
			<li class="nav-item">
				<button class="btn nav-btn" id="rock" @click="filterByType('rock')">
					Rock
				</button>
			</li>
			<li class="nav-item">
				<button class="btn nav-btn" id="ghost" @click="filterByType('ghost')">
					Ghost
				</button>
			</li>
			<li class="nav-item">
				<button class="btn nav-btn" id="dark" @click="filterByType('dark')">
					Dark
				</button>
			</li>
			<li class="nav-item">
				<button class="btn nav-btn" id="dragon" @click="filterByType('dragon')">
					Dragon
				</button>
			</li>
			<li class="nav-item">
				<button class="btn nav-btn" id="steel" @click="filterByType('steel')">
					Steel
				</button>
			</li>
			<li class="nav-item">
				<button class="btn nav-btn" id="fairy" @click="filterByType('fairy')">
					Fairy
				</button>
			</li>
		</ul>
	</div>
</template>

<script setup>
	import { ref, defineEmits } from "vue";

	const filterType = ref("all");

	const filterByType = (type) => {
		filterType.value = type;
		emits("filter-by-type", type);
	};

	const emits = defineEmits(["filter-by-type"]);
</script>
