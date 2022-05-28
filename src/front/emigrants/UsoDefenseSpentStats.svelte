<script>
    import { onMount } from "svelte";
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    let stats = [];
    let campos = [];

    let spen_mill_eur = [];
    let public_percent = [];
    let pib_percent = [];

    async function gerData() {
        console.log("Fetching stats....");
        
        const res1 = await fetch(
            "https://sos2122-26.herokuapp.com/api/v2/defense-spent-stats/loadinitialdata"
        );
        if (res1.ok) {
            const res = await fetch(
                "https://sos2122-26.herokuapp.com/api/v2/defense-spent-stats"
            );
            if (res.ok) {
                const data = await res.json();
                stats = data;

                console.log("Estadísticas recibidas: " + stats.length);
               
                stats.forEach((stat) => {
                    campos.push(stat.country + "-" + stat.year);
                    spen_mill_eur.push(stat["spen_mill_eur"]);
                    public_percent.push(stat["public_percent"]);
                    pib_percent.push(stat["pib_percent"]);
                });
                
                await delay(1000);
                loadGraph();
            } else {
                console.log("Error al cargar los datos");
            }
        }
    }
    async function loadGraph() {
        Highcharts.chart("container", {
            chart: {
                type: "column",
            },
            title: {
                text: "Estadísticas de gasto en defensa por país",
            },

            subtitle: {
                text: "Uso de API SOS 2",
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
                    name: "Gasto en millones",
                    data: spen_mill_eur,
                },
                {
                    name: "% en gasto público",
                    data: public_percent,
                },
                {
                    name: "% Pib",
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
    onMount(gerData);
    
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