<script>

    import {onMount} from 'svelte';

    let myConfig = {};
    let datos = [];
    let paises = [];
    let muertes = [];
    let muertes_por_millon = [];
    
    async function getData(){
      console.log("Fetching data...");
        const resData = await fetch("https://coronavirus-19-api.herokuapp.com/countries");
        if(resData.ok){
        
            const stats = await resData.json();
            
            datos = stats.slice(1,10);
            
            datos.forEach(element => {
                paises.push(element.country);
                muertes.push(element.deaths);
                muertes_por_millon.push(element.deathsPerOneMillion);
                
            });
            
            
        }
    }

    getData();


     myConfig = {
  type: "area",
  plotarea: {
    
    adjustLayout: true
  },
  scaleX: {
    label: { 
      text: "Paises",
    },
   
    labels: paises
  },
  series: [{
      values: muertes,
      text: 'muertes',
    },
    {
      values: muertes_por_millon,
      text: 'muertes por millon',
    }
  ]
};

    

    loadGraph();

    async function loadGraph() {
        zingchart.render({
            id: 'myChart',
            data: myConfig,
        });
    }

    
    onMount(loadGraph);
    </script>
    <svelte:head>

        <script src="https://cdn.zingchart.com/zingchart.min.js" on:load="{loadGraph}"></script>
    
    </svelte:head>
    
    <main>
        <head>
            <script src="https://cdn.zingchart.com/zingchart.min.js"></script>
          </head>

          <div align = "center">
            <h2>
              Gráfica que muestra las muertes relacionadas por COVID-19
            </h2>
          </div>
        <div id="myChart"></div>
    </main>