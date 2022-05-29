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
	import IntPollutionStats from "./emigrants/IntPollutionStats.svelte";
	import Externa3 from "./emigrants/ApiExterna3.svelte";
	import Externa2 from "./emigrants/ApiExterna2.svelte";
	import Externa1 from "./emigrants/ApiExterna1.svelte";
	
	
	import ImmigrantsGraph from "./immigrants/ImmigrantsHighCharts.svelte";
	import ZingImmigrantsGraph from "./immigrants/ImmigrantsZingCharts.svelte";
	import Immigrants from './immigrants/Immigrants.svelte';
	import EditImmigrants from "./immigrants/EditImmigrants.svelte";
	import ExternaCovid from "./immigrants/ApiExternaCovid.svelte";
	import ExternaFutbol from "./immigrants/ApiExternaFutbol.svelte";
	import IntCancerStats from "./immigrants/IntegracionApiCancer.svelte";
	import IntDevicesStats from "./immigrants/IntegracionApiDispositivos.svelte";
	
	import GeneralGraph from "./GraphComun.svelte";

	import Integrations from "./Integrations.svelte";

	import About from "./Videos.svelte"

	const routes = {

		"/info": Home,

		"/graph/:country": GeneralGraph,
		"/analytics": GeneralGraph,

		"/integrations": Integrations,

		"/about": About,

		"/immigrants" : Immigrants,
		"/immigrants/:country/:year" : EditImmigrants,
		"/immigrants-graph": ImmigrantsGraph,
		"/immigrants-graph-zing": ZingImmigrantsGraph,
		"/ExternaCovid": ExternaCovid,
		"/ExternaFutbol": ExternaFutbol,
		"/IntCancerStats": IntCancerStats,
		"/IntDevicesStats": IntDevicesStats,

		"/emigrants" : Emigrants,
		"/emigrants/:country/:year" : EditEmigrants,
		"/emigrants-graph": EmigrantsGraph,
		"/emigrants-graph-C3": C3EmigrantGraph,
		"/UsoCoalStats": UsoCoalStats,
		"/IntCoalStats": IntCoalStats,
		"/UsoDefenseSpentStats": UsoDefenseSpentStats,
		"/IntDefenseSpentStats": IntDefenseSpentStats,
		"/IntPollutionStats": IntPollutionStats,
		"/Externa1": Externa1,
		"/Externa2": Externa2,
		"/Externa3": Externa3
		
	};

</script>

<main>
	<Router {routes} />
</main>
