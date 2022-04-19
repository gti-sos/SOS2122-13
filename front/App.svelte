<script>
	import Router from "svelte-spa-router";
	import Home from "./Home.svelte";
	import ImmigrantsTable from './ImmigrantsTable.svelte';
	import EmigrantsTable from './EmigrantsTable.svelte';

	const routes = {
		"/": Home,
		"./ImmigrantsTable.svelte" : ImmigrantsTable,
		"./EmigrantsTable.svelte" : EmigrantsTable
		
	};
</script>

<main>
	<Router {routes} />
</main>

<!--
<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
<<<<<<< HEAD
=======

>>>>>>> 1df13d157d1ca436cc0e0de115166013faa966a0
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
<<<<<<< HEAD
=======

>>>>>>> 1df13d157d1ca436cc0e0de115166013faa966a0
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
-->

