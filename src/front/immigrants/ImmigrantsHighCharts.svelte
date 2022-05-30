<script>
  import{Nav, NavItem, NavLink } from "sveltestrap";
  import {onMount} from 'svelte';
  const BASE_API_PATH = "/api/v2";
  let immigrantsData=[];
  let immigrantsCountryYear = [];
  let men = [];
  let women = [];
  let percentages = [];

  
  async function loadGraph() {
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
      
      Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Número de inmigrantes de cada país'
    },
    xAxis: {
        categories: immigrantsCountryYear,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Número de inmigrantes (u)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.2f} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Hombres',
        data: men
    }, {
        name: 'Mujeres',
        data: women
    }, {
        name: 'Porcentajes',
        data: percentages
    }]
});

}
    

</script>

<svelte:head>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/series-label.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script
  src="https://code.highcharts.com/modules/accessibility.js"
  on:load={loadGraph}></script>
</svelte:head>

<main>
  <Nav>
      <NavItem>
        <NavLink href="#/info">Página Principal</NavLink>
      </NavItem>
  </Nav>

  <div>
      <h2>
        Inmigrantes
      </h2>
    </div>

  <div>
      <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
          Gráfico de columnas que muestra el número de inmigrantes de cada país.
        </p>
      </figure>
  </div>
  

  
</main>

