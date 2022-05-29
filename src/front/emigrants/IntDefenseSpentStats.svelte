<script>
    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";
    import UncontrolledAlert from "sveltestrap/src/UncontrolledAlert.svelte";

    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    
    let campos = [];
    let codigo= 0;
    let men = ["Hombres Emigrantes"];
    let women = ["Mujeres Emigrantes"];
    let percentages = ["Porcentaje de Emigrantes"];

    let spen_mill_eur = ["Gasto en millones"];
    let public_percent = ["% en Gasto público"];
    let pib_percent = ["% PIB"];

    async function getData(){
        
        let load1 = await fetch(`/api/v2/emigrants/loadInitialData`);
        let load2 = await fetch(`https://sos2122-26.herokuapp.com/api/v2/defense-spent-stats/loadinitialdata`);

        await delay(1000);
        
        let res_emigrants;
        let res_defense;

        res_emigrants = await fetch(`/api/v2/emigrants`);
        res_defense = await fetch(`https://sos2122-26.herokuapp.com/api/v2/defense-spent-stats`);

        if (res_emigrants.ok && res_defense.ok) {

            const json = await res_emigrants.json();
            const json_reg = await res_defense.json();
            const countries = [];

            for(let i = 0; i<json_reg.length;i++){
                countries.push(json_reg[i].country+"/"+json_reg[i].year);
            }
            for(let i = 0; i<json.length; i++){

                let fecha = json[i].country+"/"+json[i].year;
                campos.push(fecha);

                if(countries.includes(fecha)){

                    let index = countries.indexOf(fecha);

                    spen_mill_eur.push(json_reg[index].spen_mill_eur);
                    public_percent.push(json_reg[index].public_percent);
                    pib_percent.push(json_reg[index].pib_percent);

                    json_reg.splice(index, 1);

                }else{
                    spen_mill_eur.push(0);
                    public_percent.push(0);
                    pib_percent.push(0);
                }

                women.push(json[i].women);
                percentages.push(json[i].percentages);
                men.push(json[i].men);
            }

            for(let i = 0; i<json_reg.length; i++){

                campos.push(json_reg[i].country+"/"+json_reg[i].year);

                spen_mill_eur.push(json_reg[i].spen_mill_eur);
                public_percent.push(json_reg[i].public_percent);
                pib_percent.push(json_reg[i].pib_percent);

                women.push(0);
                percentages.push(0);
                men.push(0);
            }
            await delay(2000);
            loadGraph();

        }else{
            codigo = 200.4;
            await delay(1000);
            loadGraph();
        }
    }
    
    async function loadGraph() {
        Highcharts.chart("container", {
            chart: {
                type: "column",
            },
            title: {
                text: "Estadísticas de Emigración y Gastos en Defensa",
            },
            subtitle: {
                text: "Inegración API SOS 2",
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
                    name: "spen_mill_eur",
                    data: spen_mill_eur,
                },
                {
                    name: "public_percent",
                    data: public_percent,
                },
                {
                    name: "pib_percent",
                    data: pib_percent,
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