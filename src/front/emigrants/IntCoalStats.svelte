<script>
    import {onMount} from 'svelte';

    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let errorC= 0;
    let campos = [];

    let men = ["Hombres Emigrantes"];
    let women = ["Mujeres Emigrantes"];
    let percentages = ["Porcentaje de Emigrantes"];

    let productions = ["Producción"];
    let exports = ["Exportación"];
    let consumption = ["Consumo"];

    async function getData(){
        
        let load1 = await fetch(`/api/v2/emigrants/loadInitialData`);
        let load2 = await fetch(`https://sos2122-22.herokuapp.com/api/v2/coal-stats/loadinitialdata`);

        await delay(1000);

        let res_emigrants;
        let res_coal;
        res_emigrants = await fetch(`/api/v2/emigrants`);
        res_coal = await fetch(`https://sos2122-22.herokuapp.com/api/v2/coal-stats`);

        if (res_emigrants.ok && res_coal.ok) {

            const json = await res_emigrants.json();
            const json_reg = await res_coal.json();
            const countries = [];

            for(let i = 0; i<json_reg.length;i++){

                countries.push(json_reg[i].country + "/" + json_reg[i].year);
            }
            for(let i = 0; i<json.length; i++){

                let fecha = json[i].country+"/"+json[i].year;

                campos.push(fecha);

                if(countries.includes(fecha)){
                    let index = countries.indexOf(fecha);

                    productions.push(json_reg[index].productions);
                    exports.push(json_reg[index].exports);
                    consumption.push(json_reg[index].consumption);

                    json_reg.splice(index, 1);

                }else{

                    productions.push(0);
                    exports.push(0);
                    consumption.push(0);
                }

                women.push(json[i].women);
                percentages.push(json[i].percentages);
                men.push(json[i].men);
            }

            for(let i = 0; i<json_reg.length; i++){

                campos.push(json_reg[i].country+"/"+json_reg[i].year);
                productions.push(json_reg[i].productions);
                exports.push(json_reg[i].exports);
                consumption.push(json_reg[i].consumption);
                women.push(0);
                percentages.push(0);
                men.push(0);
            }

            await delay(2000);
            loadGraph();

        }else{

            errorC = 200.4;
            await delay(1000);
            loadGraph();
        }
    }
    
    async function loadGraph() {
        Highcharts.chart("container", {
            chart: {
                type: "bar",
            },
            title: {
                text: "Estadísticas de Emigración y Carbón",
            },
            subtitle: {
                text: "Integración API SOS 1",
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
                    name: "Producción",
                    data: productions,
                },
                {
                    name: "Exportación",
                    data: exports,
                },
                {
                    name: "Consumo",
                    data: consumption,
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