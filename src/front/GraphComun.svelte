<script>

    import {onMount} from 'svelte';
    import { pop }from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const emigrants_PATH = "/api/v2/emigrants";
    const immigrants_PATH = "/api/v2/immigrants";
    
    let DataMenE = [];
    let DataWomenE = [];
    let DataPercentagesE = [];
   
    let DataMenI = [];
    let DataWomenI = [];
    let DataPercentagesI = [];

    async function loadGraph(){

            console.log("Fetching emi/immi stats...");
            
            const resEmigrants = await fetch(emigrants_PATH);
            const resImmigrants = await fetch(immigrants_PATH);

            DataMenE = await resEmigrants.json();
            DataMenI = await resImmigrants.json();

            if(resEmigrants == 0 || resImmigrants == 0){

                console.log("ERROR MSG");
                alert("Cargue los datos iniciales para visualizarlos");
                pop();
            }
            
            if(resEmigrants.ok){
                
                DataMenE.sort((a,b) => a.country.localeCompare(b.country));

                DataMenE.forEach(stat => {
                        DataWomenE.push(stat.country+"/"+stat.year);
                        DataPercentagesE.push(stat["percentages"]);
                    
                });

            }else{
                console.log("ERROR");
            }

           
            if(resImmigrants.ok){

                DataMenI.sort((a,b) => a.country.localeCompare(b.country));

                DataMenI.forEach(stat => {
                        DataWomenI.push(stat.country+"/"+stat.year);
                        DataPercentagesI.push(stat["percentages"]);
                    
                });

            }else{
                console.log("ERROR");
            }

            if(DataWomenE.length == 0 && DataWomenI.length == 0){

        
                alert("Cargue los datos iniciales para visualizarlos");
                pop();
            }
      
            console.log("Cargando Datos de las APIs");

            Highcharts.chart('container', {

                chart: {
                    type: 'area'
                },
                
                title: {
                    text: 'Gráfica Emigración e Inmigración por Países'
                },
                xAxis: {  
                    allowDecimals: false,
                    title: {
                        text: 'País y Año'
                    },
                    categories: DataWomenE,
                },
                yAxis: {
                    title: {
                        text: 'Porcentajes'
                    },
                },
                series: [
                {
                    name: 'Porcentaje de Emigrantes',
                    data: DataPercentagesE
                },
                {
                    name: 'Porcentaje de Immigrantes',
                    data: DataPercentagesI
                }]
            });
        }
    </script>
    
    <svelte:head>
    
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/modules/series-label.js"></script>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>
        <script src="https://code.highcharts.com/highcharts-more.js"></script>
        <script src="https://code.highcharts.com/modules/export-data.js"></script>
        <script src="https://code.highcharts.com/modules/dumbbell.js"></script>
        <script src="https://code.highcharts.com/modules/lollipop.js"></script>
        <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
      
    </svelte:head>
    
    
    <main>
    
      <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
          Gráfico en el que se representa los porcentajes de población de emigrantes e inmigrantes en varios países en diferentes años.
        </p>
      </figure>
    
      <p align="center"><Button outline color="secondary" on:click="{pop}">Atrás</Button></p>
     
    </main>
    
    <style>
            .highcharts-figure{
                min-width: 320px; 
                max-width: 800px;
                margin: 1em auto;
            }
            #container {
                height: 450px;
            }  
      </style>