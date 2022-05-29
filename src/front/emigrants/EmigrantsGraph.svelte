<script>

    const BASE_API_PATH = "/api/v2";
    import { onMount } from 'svelte';
    
    let Data=[];
    let countries = [];
    let men = [];
    let women = [];
    let percentages = [];
 
	
    let load = false;

    async function loadChart() {

        
        const res = await fetch(BASE_API_PATH + "/emigrants");
       
        if (res.ok) {
            const data = await res.json();
            Data = data;

          Data.forEach(stat => {
            countries.push(stat.country+"-"+stat.year);
            men.push(parseInt(stat.men));
            women.push(parseInt(stat.women));
            percentages.push(parseFloat(stat.percentages));
            });

            load=true;
        }
        
            
    Highcharts.chart('container', {
      chart: {
          type: 'bar'
      },
      title: {
          text: 'Número de Emigrantes de cada país'
      },
      xAxis: {
          categories: countries,
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Emigrantes'
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
    //onMount(loadChart); 
  </script>
  
  <svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script
    src="https://code.highcharts.com/modules/accessibility.js"
    on:load={loadChart}></script>
    
  </svelte:head>
  
  <main>
  
    <div>
        <h2>
          Emigrantes
        </h2>
      </div>
  
    <div>
        <figure class="highcharts-figure">
          <div id="container" />
          <p class="highcharts-description">
            Gráfico de barras que muestra el número de emigrantes de cada país.
          </p>
        </figure>
    </div>
    
  
  </main>
  
  <style>
    main {
        text-align: center;
        padding: 30px;       
    }
    
   
  </style>