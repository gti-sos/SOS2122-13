<script>
	import Router from "svelte-spa-router";
	import Home from "./Home.svelte";
	import ImmigrantsTable from './immigrants/ImmigrantsTable.svelte';
	import Emigrants from "./emigrants/Emigrants.svelte";
	import EditEmigrants from "./emigrants/EditEmigrants.svelte";

	const routes = {

		"/": Home,

		"/ImmigrantsTable.svelte" : ImmigrantsTable,

		"/emigrants" : Emigrants,
		"/emigrants/:country/:year" : EditEmigrants

	};

</script>

<main>
	<Router {routes} />
</main>
