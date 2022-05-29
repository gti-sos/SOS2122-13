<script>
    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";
    import UncontrolledAlert from "sveltestrap/src/UncontrolledAlert.svelte";
    
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let errorC= 0;
    let campos = [];

    let men = ["Hombres Emigrantes"];
    let women = ["Mujeres Emigrantes"];
    let percentages = ["Porcentaje de Emigrantes"];

    let plastic_waste = ["Residuos Plásticos"];
    let gaseous_waste = ["Residuos Gaseosos"];
    let collected_waste = ["Residuos Recogidos"];

    async function getData(){
        
        let load1 = await fetch(`/api/v2/emigrants/loadInitialData`);
        let load2 = await fetch(`/remoteApiPollution/loadInitialData`);

        await delay(1000);

        let res_emigrants;
        let res_pollution;

        res_emigrants = await fetch(`/api/v2/emigrants`);
        res_pollution = await fetch(`/remoteApiPollution`);

        if (res_emigrants.ok && res_pollution.ok) {

            const json = await res_emigrants.json();
            const json_reg = await res_pollution.json();

            const countries = [];

            for(let i = 0; i<json_reg.length;i++){
                countries.push(json_reg[i].country+"/"+json_reg[i].year);
            }

            for(let i = 0; i<json.length; i++){
                let fecha = json[i].country+"/"+json[i].year;
                campos.push(fecha);

                if(countries.includes(fecha)){
                    let index = countries.indexOf(fecha);
                    plastic_waste.push(json_reg[index].plastic_waste);
                    gaseous_waste.push(json_reg[index].gaseous_waste);
                    collected_waste.push(json_reg[index].collected_waste);
                    json_reg.splice(index, 1);

                }else{
                    plastic_waste.push(0);
                    gaseous_waste.push(0);
                    collected_waste.push(0);
                }
                women.push(json[i].women);
                percentages.push(json[i].percentages);
                men.push(json[i].men);
            }
            for(let i = 0; i<json_reg.length; i++){

                campos.push(json_reg[i].country+"/"+json_reg[i].year);
                plastic_waste.push(json_reg[i].plastic_waste);
                gaseous_waste.push(json_reg[i].gaseous_waste);
                collected_waste.push(json_reg[i].collected_waste);

                women.push(0);
                percentages.push(0);
                men.push(0);
            }
            loadGraph();

        }else{
            errorC = 200.4;
            loadGraph();
        }
    }
    
    async function loadGraph() {
        Highcharts.chart("container", {
            chart: {
                type: "spline",
            },
            title: {
                text: "Estadísticas de Emigración y Contaminación",
            },
            subtitle: {
                text: "Inegración API SOS 3",
            },
            yAxis: {
                title: {
                    text: "Valor",
                },
            },
            xAxis: {
                title: {
                    text: "País-Año",
                },
                categories: campos,
            },
            legend: {
                layout: "vertical",
                align: "right",
                verticalAlign: "middle",
            },
            series: [
                {
                    name: "Hombres",
                    data: men,
                },
                {
                    name: "Mujeres",
                    data: women,
                },
                {
                    name: "Porcentaje",
                    data: percentages,
                },
                {
                    name: "Rediduos Plásticos",
                    data: plastic_waste,
                },
                {
                    name: "Residuos Gaseosos",
                    data: gaseous_waste,
                },
                {
                    name: "Residuos Recogidos",
                    data: collected_waste,
                },
            ],
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 500,
                        },
                        chartOptions: {
                            legend: {
                                layout: "horizontal",
                                align: "center",
                                verticalAlign: "bottom",
                            },
                        },
                    },
                ],
            },
        });
    }
    
    onMount(getData);
    
</script>

 <svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container" />
    </figure>
</main>