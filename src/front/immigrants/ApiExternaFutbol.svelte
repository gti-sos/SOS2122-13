<script>
    import {onMount} from 'svelte';

    let myConfig = {};
    let datos = [];
    let equipos = [];
    let victorias = [];
    let empates = [];
    let derrotas = [];

    async function getData(){
      console.log("Fetching data...");
        const resData = await fetch("https://www.thesportsdb.com/api/v1/json/2/lookuptable.php?l=4335&s=2021-2022");
        if(resData.ok){
        
            const data = await resData.json();
            
            datos = data;
            
            datos.table.forEach(element => {
                equipos.push(element.strTeam);
                victorias.push(element.intWin);
                empates.push(element.intDraw);
                derrotas.push(element.intLoss);
                
            });
            
            
        }
    }

    getData();

myConfig = {
  type: 'bar',
  title: {
    text: 'Datos de resultados de equipos en relación a partidos jugados',
    fontSize: 24,
  },
  legend: {
    draggable: true,
  },
  scaleX: {

    label: { text: 'Equipos' },

    labels: equipos
  },
  scaleY: {
    
    label: { text: 'Partidos' }
  },
  plot: {
    
    animation: {
      effect: 'ANIMATION_EXPAND_BOTTOM',
      method: 'ANIMATION_STRONG_EASE_OUT',
      sequence: 'ANIMATION_BY_NODE',
      speed: 275,
    }
  },
  series: [

    {
      
      values: victorias,
      text: 'Victorias'
    },
    {
      
      values: empates,
      text: 'Empates'
    },
    {
      
      values: derrotas,
      text: 'Derrotas'
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
    <div id="myChart"></div>


</main>