<script>
    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";

    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let score1 = [];
    let score2 = [];
    let campos = [];

    async function getData(){

        const options = {
            method: "GET",

            headers: {

                "X-RapidAPI-Host": "unibet.p.rapidapi.com",
                "X-RapidAPI-Key": "a6ec3331ddmsh3c56e0404abc15ep1e604ejsn3c343b00a960"
            }
        };
        let res = await fetch("https://unibet.p.rapidapi.com/live-matches-by-sport?sport=football",options);

        await delay(2000);

        if (res.ok) {

            let json = await res.json();

            for(let i = 0; i<10; i++){
                
                campos.push(json[i].name);
                score1.push(json[i].team1.score);
                score2.push(json[i].team2.score);
            }

            loadGraph();

        }else{

            campos = [];
            score1 = [];
            score2 = [];

            loadGraph();
        }
    }
    
    async function loadGraph(){

        var ctx = document.getElementById("myChart").getContext("2d");
        var chart = new Chart(ctx, {

            type: "bar",
            responsive: true,
            maintainAspectRatio: false,

            data: {

                labels: campos,
                datasets: [
                    {
                        label: "Puntos Team 1",
                        backgroundColor: 'rgb( 40, 180, 99)',
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointHoverBorderColor: 'rgb(255, 99, 132)',
                        data: score1,
                    },
                    {
                        label: "Puntos Team 2",
                        backgroundColor: 'rgb( 241, 196, 15)',
                        pointBackgroundColor: 'rgb(54, 162, 235)',
                        pointHoverBorderColor: 'rgb(54, 162, 235)',
                        data: score2,
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
                Unibet API
            </h1>
            <h2>
                API Externa 2
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