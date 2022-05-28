<script>

    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";

    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let laps = [];
    let campos = [];

    async function getData(){

        const options = {
            method: "GET",

            headers: {
                "X-RapidAPI-Host": "formula-1-all-time-statistics.p.rapidapi.com",
                "X-RapidAPI-Key": "a6ec3331ddmsh3c56e0404abc15ep1e604ejsn3c343b00a960"
            }
        };

        let res = await fetch("https://formula-1-all-time-statistics.p.rapidapi.com/2021/races/all",options);

        await delay(2000);

        if (res.ok) {

            let json = await res.json();
            for(let i = 0; i<10; i++){
                
                campos.push(json[i].team);
                laps.push(json[i].laps);
            }

            loadGraph();

        }else{

            campos = [];
            laps = [];
            loadGraph();
        }
    }
    
    async function loadGraph(){

        var ctx = document.getElementById("myChart").getContext("2d");

        var chart = new Chart(ctx, {
            type: "line",
            responsive: true,
            maintainAspectRatio: false,
            data: {
                labels: campos,
                datasets: [

                    {
                        label: "vueltas",
                        backgroundColor: 'rgb(34, 255, 255)',
                        pointBackgroundColor: 'rgb(0, 0, 0)',
                        pointHoverBorderColor: 'rgb(255, 99, 132)',
                        data: laps,
                    },
                   
                ],
            }
        });
    }
    
    onMount(getData);
    
    </script>
    <svelte:head>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js" on:load="{loadGraph}"></script>
    
    </svelte:head>
    
    <main>
        <div>
            <h1>
              Fórmula 1 API
            </h1>
            <h2>
                API Externa 1
            </h2>
        </div>
        <div id="chartBox" >
            <canvas id="myChart" align="center"></canvas>
        </div>
      
        
        <br>
        <Button outline color="dark" on:click="{()=>{
            pop();
        }}">
        Volver
        </Button>
        <br><br>
    </main>
    <style>
        main {
            text-align: center;
            padding: 30px;       
        }
    </style>