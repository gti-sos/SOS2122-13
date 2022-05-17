<script>
	import Router from "svelte-spa-router";
	import Home from "./Home.svelte";
	import Immigrants from './immigrants/Immigrants.svelte';
	import EditImmigrants from "./immigrants/EditImmigrants.svelte";
	import Emigrants from "./emigrants/Emigrants.svelte";
	import EditEmigrants from "./emigrants/EditEmigrants.svelte";
	import ImmigrantsGraph from "./immigrants/ImmigrantsGraph2.svelte";
	import EmigrantsGraph from "./emigrants/EmigrantsGraph.svelte";
	import GeneralGraph from "./Graph.svelte";

	const routes = {

		"/info": Home,

		"/graph/:country": GeneralGraph,

		"/immigrants" : Immigrants,
		"/immigrants/:country/:year" : EditImmigrants,
		"/immigrants-graph": ImmigrantsGraph,

		"/emigrants" : Emigrants,
		"/emigrants/:country/:year" : EditEmigrants,
		"/emigrants-graph": EmigrantsGraph

	};

</script>

<main>
	<Router {routes} />
</main>
