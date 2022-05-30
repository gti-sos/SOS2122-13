<script>
    import { onMount } from "svelte";
   
   import{Nav, NavItem, NavLink } from "sveltestrap";

   const BASE_API_PATH = "/api/v2";

   let myConfig = {};
   let immigrantsData=[];
   let immigrantsCountryYear = [];
   let men = [];
   let women = [];
   let percentages = [];

   async function getData() {
       console.log("Fetching data...");
       const res = await fetch(BASE_API_PATH + "/immigrants");
       
           
       if (res.ok) {
           const data = await res.json();
           
           immigrantsData = data;
         immigrantsData.forEach(stat => {
           immigrantsCountryYear.push(stat.country+"-"+stat.year);
           men.push(parseInt(stat.men));
           women.push(parseInt(stat.women));
           percentages.push(parseFloat(stat.percentages));
           });
           
       }
   }
   

   getData();

   myConfig = {
     type: 'bar',
     title: {
       text: 'Datos de Inmigración por países',
       fontSize: 24,
     },
     legend: {
       draggable: true,
     },
     scaleX: {
   
       label: { text: 'Países año' },
   
       labels: immigrantsCountryYear
     },
     scaleY: {
       
       label: { text: 'Datos' }
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
         
         values: men,
         text: 'Hombres inmigrantes',
       },
       {
         
         values: women,
         text: 'Mujeres inmigrantes'
       },
       {
         
         values: percentages,
         text: 'Porcentaje'
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
</script>

<svelte:head>
   <script src="https://cdn.zingchart.com/zingchart.min.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <head>
       <script src="https://cdn.zingchart.com/zingchart.min.js"></script>
     </head>

     <Nav>
      <NavItem>
        <NavLink href="#/info">Página Principal</NavLink>
      </NavItem>
  </Nav>
   <div id="myChart"></div>
</main>