<script>

    import * as c3 from "c3";
    import { onMount } from 'svelte';

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    let emigrants = [];

    let men = ["men"];
    let women = ["women"];
    let percentages = ["percentages"];

    async function getData(){

        const loaData = await fetch("/api/v2/emigrants/loadInitialData");

        if (loaData.ok) {

            const res = await fetch("/api/v2/emigrants");
            console.log(res);

            if (res.ok) {

                const data = await res.json();
                console.log("Datos totales: " + data.length);

                data.forEach((stat) => {

                    emigrants.push(stat.country + " " + stat.year);
                    men.push(stat["men"]);
                    women.push(stat["women"]);
                    percentages.push(stat["percentages"]);             
                });

                await delay(2000);
                loadGraph();

            } else {
                console.log("Error al cargar datos");
            }
        } else {
                console.log("Error al cargar los datos iniciales");
            }
    }
    async function loadGraph(){
        var chart = c3.generate({
            
    data: {
        
        columns: [
            men,
            women,
            percentages
        ],
        type:'bar'
    },
    bar: {
        width: {
            ratio: 0.5 
        }
    },
    axis: {
        x: {
            type: 'category',
            categories: emigrants
        }
}
});
    }  
    onMount(getData); 
</script>

<svelte:head>

    <link rel="stylesheet" href="./celiaEmi/c3.css">
</svelte:head>

<main>
    <figure>
        <h2 class="title"> Emigrantes </h2>
        <h3 class="title"> Gráfica de la Librería C3.js </h3>
        <div id="chart"></div>
        <p class="description">
            Gráfico de barras que muestra el número de emigrantes de cada país.
        </p>
        <br>
        <br>
    </figure>
    

    
</main>

<style>
    .description{
        margin-top: 10pt;
        text-align:center
    }
    .title{
        margin-bottom: 15pt;
        text-align:center
    }
</style>