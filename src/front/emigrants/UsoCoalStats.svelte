<script>
    import { onMount } from "svelte";
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    let stats = [];
    let campos = [];

    let productions = [];
    let exports = [];
    let consumption = [];

    async function getData() {
        console.log("Fetching stats...");

        const res1 = await fetch(
            "https://sos2122-22.herokuapp.com/api/v2/coal-stats/loadinitialdata"
        );
        
        if (res1.ok) {
            const res = await fetch(
                "https://sos2122-22.herokuapp.com/api/v2/coal-stats"
            );
            if (res.ok) {
                const data = await res.json();
                stats = data;
                console.log("Estadísticas recibidas: " + stats.length);

                stats.forEach((stat) => {
                    campos.push(stat.country + "-" + stat.year);
                    productions.push(stat["productions"]);
                    exports.push(stat["exports"]);
                    consumption.push(stat["consumption"]);
                });
                
                await delay(1000);
                loadGraph();
            } else {
                console.log("Error al cargar datos");
            }
        }
    }
    async function loadGraph() {
        Highcharts.chart("container", {
            chart: {
                type: "bar",
            },
            title: {
                text: "Estadísticas de carbón",
            },
            subtitle: {
                text: "Uso de API SOS 1",
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