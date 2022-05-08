<script>
	import Router from "svelte-spa-router";
	import Home from "./Home.svelte";
	import Immigrants from './immigrants/Immigrants.svelte';
	import EditImmigrants from "./immigrants/EditImmigrants.svelte";
	import Emigrants from "./emigrants/Emigrants.svelte";
	import EditEmigrants from "./emigrants/EditEmigrants.svelte";
	//import MyGraph from "./MyGraph.svelte";
	import ImmigrantsGraph from "./immigrants/ImmigrantsGraph2.svelte";
	import EmigrantsGraph from "./emigrants/EmigrantsGraph.svelte";

	const routes = {

		"/info": Home,

		"/immigrants" : Immigrants,
		"/immigrants/:country/:year" : EditImmigrants,

		"/emigrants" : Emigrants,
		"/emigrants/:country/:year" : EditEmigrants,
		"/immigrants-graph": ImmigrantsGraph,
		"/emigrants-graph": EmigrantsGraph

	};

</script>

<main>
	<Router {routes} />
</main>
