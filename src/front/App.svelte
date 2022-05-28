<script>
	import Router from "svelte-spa-router";
	import Home from "./Home.svelte";
	
	import Emigrants from "./emigrants/Emigrants.svelte";
	import EditEmigrants from "./emigrants/EditEmigrants.svelte";
	import EmigrantsGraph from "./emigrants/EmigrantsGraph.svelte";
	import C3EmigrantGraph from "./emigrants/EmigrantsGraphC3.svelte";
	import UsoCoalStats from "./emigrants/UsoCoalStats.svelte";
	import IntCoalStats from "./emigrants/IntCoalStats.svelte";
	import UsoDefenseSpentStats from "./emigrants/UsoDefenseSpentStats.svelte";
	import IntDefenseSpentStats from "./emigrants/IntDefenseSpentStats.svelte";
	import Externa1 from "./emigrants/ApiExterna1.svelte";
	import Externa2 from "./emigrants/ApiExterna2.svelte";
	

	import ImmigrantsGraph from "./immigrants/ImmigrantsGraph2.svelte";
	import Immigrants from './immigrants/Immigrants.svelte';
	import EditImmigrants from "./immigrants/EditImmigrants.svelte";
	
	import GeneralGraph from "./Graph.svelte";
	import GeneralGraph1 from "./Graph1.svelte";

	import Integrations from "./Integrations.svelte";

	const routes = {

		"/info": Home,

		"/graph/:country": GeneralGraph,
		"/analytics": GeneralGraph1,

		"/integrations": Integrations,

		"/immigrants" : Immigrants,
		"/immigrants/:country/:year" : EditImmigrants,
		"/immigrants-graph": ImmigrantsGraph,

		"/emigrants" : Emigrants,
		"/emigrants/:country/:year" : EditEmigrants,
		"/emigrants-graph": EmigrantsGraph,
		"/emigrants-graph-C3": C3EmigrantGraph,
		"/UsoCoalStats": UsoCoalStats,
		"/IntCoalStats": IntCoalStats,
		"/UsoDefenseSpentStats": UsoDefenseSpentStats,
		"/IntDefenseSpentStats": IntDefenseSpentStats,
		"/Externa1": Externa1,
		"/Externa2": Externa2
		
	};

</script>

<main>
	<Router {routes} />
</main>
