<script>
    import {onMount} from 'svelte';
    export let params = {};
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";
    
    let codeError = null;

    const delay = ms => new Promise(res => setTimeout(res, ms));
  
    let country = params.country;

    let DataMenE = [];
    let DataWomenE = [];
    let DataPercentagesE = [];

    let DataMenI = [];
    let DataWomenI = [];
    let DataPercentagesI = [];


    async function getData(){
        let res_emigrants;
        let res_immigrants;

        if(country==null){
            res_emigrants = await fetch(`/api/v2/emigrants`);
            res_immigrants = await fetch(`/api/v2/immigrants`);
            
        }else{
            res_emigrants = await fetch(`/api/v2/emigrants/${country}`);
            res_immigrants = await fetch(`/api/v2/immigrants/${country}`);
        }

        if (res_emigrants.ok && res_immigrants.ok) {

            const json_emigrants = await res_emigrants.json();
            const json_immigrants = await res_immigrants.json();

            EmigrantsDatos(json_emigrants);
            ImmigrantsDatos(json_immigrants);

            if(country==null){

                DataMenE = [];
                DataWomenE = [];
                DataPercentagesE = [];

                DataMenI = [];
                DataWomenI = [];
                DataPercentagesI = [];
            }

            console.log(json_emigrants);
            console.log(json_immigrants);
            country = null;

            await delay(3000);
            loadGraph();

        }else{

            codeError = 404;

            DataMenE = [];
            DataWomenE = [];
            DataPercentagesE = [];

            DataMenI = [];
            DataWomenI = [];
            DataPercentagesI = [];

            await delay(3000);
            loadGraph();
        }
    }
    
    async function EmigrantsDatos(json){

        for(let i = 0; i<json.length; i++){
                let aux = [];
                aux = [];

                aux.push(json[i].year);
                aux.push(json[i].men);
                DataMenE.push(aux);

                aux.push(json[i].year);
                aux.push(json[i].women);
                DataWomenE.push(aux);

                aux = [];
                aux.push(json[i].year);
                aux.push(json[i].percentages);
                DataPercentagesE.push(aux);
               
            }
            console.log(DataWomenE);
            console.log(DataPercentagesE);
            console.log(DataMenE);
    }

    async function ImmigrantsDatos(json){

        for(let i = 0; i<json.length; i++){

            let aux = [];
            aux.push(json[i].year);
            aux.push(json[i].men);
            DataMenI.push(aux);

            aux = [];
            aux.push(json[i].year);
            aux.push(json[i].women);
            DataWomenI.push(aux);
            
            aux = [];
            aux.push(json[i].year);
            aux.push(json[i].percentages);
            DataPercentagesI.push(aux);
        }
            console.log(DataMenI);
            console.log(DataWomenI);
            console.log(DataPercentagesI);
    }

    async function loadGraph(){
        
        Highcharts.chart('container', {
        
            title: {
                text: `Gráfico Emigrantes e Immigrantes`
            },
        
            yAxis: {
                title: {
                    text: 'Valor'
                }
            },
        
            xAxis: {
                accessibility: {
                    title: {
                    text: 'Año'
                }
                }
            },
        
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    }
                }
            },
            series: [

                {
                    name: 'Hombres Emigrants',
                    data: DataMenE
                },
                {
                    name: 'Mujeres Emigrantes',
                    data: DataWomenE
                },
                {
                    name: 'Porcentaje de Emigrantes',
                    data: DataPercentagesE
                },

                {
                    name: 'Hombres Immigrantes',
                    data: DataMenI
                },
                {
                    name: 'Mujeres Immigrantes',
                    data: DataWomenI
                },
                {
                    name: 'Porcentaje de Immigrantes',
                    data: DataPercentagesI
                },
            ]
        
        });
    }
    
    onMount(getData);
    
    </script>
    <svelte:head>
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/modules/series-label.js"></script>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>
        <script src="https://code.highcharts.com/modules/export-data.js"></script>
        <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
    
    </svelte:head>
    
    <main>
        
        
        <figure class="highcharts-figure">
            <div id="container"></div>
        </figure>
        <br>
        <br>
        <div ALIGN = "center">
            <Button ALIGN = "center" outline color="dark" on:click="{()=>{
                pop();
            }}">
            Volver
            </Button>
        </div>
        <br><br>
    </main>