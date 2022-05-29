<script>
    import {onMount} from 'svelte';
    

    let pais_año = [];
    let men = [];
    let women = [];
    let percentages = [];
    
    let cero_cincuenta = [];
    let cincuenta_setenta = [];
    let mas_setenta = [];

    async function getData(){
        console.log("Fetching data...");
        let load1 = await fetch(`/api/v2/immigrants/loadInitialData`);
        let load2 = await fetch(`/remoteApiCancerDeaths/loadInitialData`);

        let res_immigrants;
        let res_cancer;

        res_immigrants = await fetch(`/api/v2/immigrants`);
        res_cancer = await fetch(`/remoteApiCancerDeaths`);

        if (res_immigrants.ok && res_cancer.ok) {

            const json = await res_immigrants.json();
            const json_api = await res_cancer.json();
            const countries = [];

            for(let i = 0; i<json_api.length;i++){
                countries.push(json_api[i].country+"-"+json_api[i].year);
            }

            for(let i = 0; i<json.length; i++){
                let fecha = json[i].country+"/"+json[i].year;
                pais_año.push(fecha);
                if(countries.includes(fecha)){
                    let index = countries.indexOf(fecha);
                    cero_cincuenta.push(json_api[index].ages_zero_fifty);
                    cincuenta_setenta.push(json_api[index].ages_fifty_seventy);
                    mas_setenta.push(json_api[index].ages_seventy);
                    json_api.splice(index, 1);
                }

                women.push(json[i].women);
                percentages.push(json[i].percentages);
                men.push(json[i].men);
            }

            for(let i = 0; i<json_api.length; i++){
                pais_año.push(json_api[i].country+"/"+json_api[i].year);
                cero_cincuenta.push(json_api[i].ages_zero_fifty);
                cincuenta_setenta.push(json_api[i].ages_fifty_seventy);
                mas_setenta.push(json_api[i].ages_seventy);
                women.push(0);
                percentages.push(0);
                men.push(0);
            }
            
        }
        loadGraph();
    }

    async function loadGraph(){
        
        var chart = bb.generate({
            bindto: "#myChart",
            axis: {
                x: {
                type: "category",
                categories: campos
                }
            },
            data: {
                type: "spline",
                labels:true,
                columns: [
                    men,
                    women,
                    percentages,
                    cero_cincuenta,
                    cincuenta_setenta,
                    mas_setenta
                ]
            },
            legend: {
                position: "right"
            }
        });
    }
    
    onMount(getData);
</script>

<svelte:head>

    <link rel="stylesheet" href="https://pagecdn.io/lib/billboardjs/3.4.1/billboard.min.css">
    <script src="https://pagecdn.io/lib/billboardjs/3.4.1/billboard.pkgd.min.js" on:load={loadGraph}></script>
</svelte:head>

<main>
    <div id="myChart" align="center"></div>

</main>