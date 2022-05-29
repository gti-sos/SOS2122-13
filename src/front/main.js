import App from './App.svelte';
import {zingchart, ZC} from 'zingchart/es6';
// to import the pareto chart module
import 'zingchart/modules-es6/zingchart-pareto.min.js';

const app = new App({
	target: document.body,
	props: {
		name: 'SOS2122-13'
	}
});

export default app;