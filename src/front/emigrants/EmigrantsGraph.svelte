<script>
    import{Nav, NavItem, NavLink } from "sveltestrap";
    import { onMount } from "svelte";
    const BASE_API_PATH = "/api/v2";
    let emigrantsData=[];
    let emigrantsCountryYear = [];
    let men = [];
    let women = [];
    let percentages = [];
 
		let errorMsg="Tiene que cargar los datos para visualizar las analíticas.";
    let cargados = false;
    async function loadChart() {
        console.log("Fetching data...");
        const res = await fetch(BASE_API_PATH + "/emigrants");
       
        if (res.ok) {
            const data = await res.json();
            emigrantsData = data;
            emigrantsData.forEach(stat => {
            emigrantsCountryYear.push(stat.country+"-"+stat.year);
            men.push(parseInt(stat.men));
            women.push(parseInt(stat.women));
            percentages.push(parseFloat(stat.percentages));
            });
            cargados=true;
        }
        
    console.log("inequality Chart data: " + emigrantsData);

    Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Emigrantes'
    },
    
    xAxis: {
        categories: emigrantsCountryYear,
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
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

    onMount(loadChart);
</script>

<svelte:head>

<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"  on:load={loadChart}></script>
</svelte:head>

<main>
    <Nav>
        <NavItem>
          <NavLink href="#/info">Página Principal</NavLink>
        </NavItem>
    </Nav>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Gráfico de barras que muestra el número de inmigrantes de cada país.
        </p>
    </figure>
</main>