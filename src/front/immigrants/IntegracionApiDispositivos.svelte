<script>
    import {onMount} from 'svelte';
    import{Nav, NavItem, NavLink } from "sveltestrap";
    

    let pais_año = [];
    let men = [];
    let women = [];
    let percentages = [];
    
    let tdw = [];
    let mpd = [];
    let mpr = [];

    async function getData(){
        console.log("Fetching data...");
        let load1 = await fetch(`/api/v2/immigrants/loadInitialData`);
        let load2 = await fetch(`/remoteApiTechnologyDevices/loadInitialData`);

        let res_immigrants;
        let res_devices;

        res_immigrants = await fetch(`/api/v2/immigrants`);
        res_devices = await fetch(`/remoteApiTechnologyDevices`);

        if (res_immigrants.ok && res_devices.ok) {
            const json = await res_immigrants.json();
            const json_api = await res_devices.json();
            const countries = [];
            for(let i = 0; i<json_api.length;i++){
                countries.push(json_api[i].country+"-"+json_api[i].year);
            }
            for(let i = 0; i<json.length; i++){
                let fecha = json[i].country+"/"+json[i].year;
                pais_año.push(fecha);
                if(countries.includes(fecha)){
                    let index = countries.indexOf(fecha);
                    tdw.push(json_api[index].tdwasted);
                    mpd.push(json_api[index].mpdisuse);
                    mpr.push(json_api[index].mpreused);
                    json_api.splice(index, 1);
                }

                women.push(json[i].women);
                percentages.push(json[i].percentages);
                men.push(json[i].men);
            }
            for(let i = 0; i<json_api.length; i++){
                pais_año.push(json_api[i].country+"/"+json_api[i].year);
                tdw.push(json_api[i].tdwasted);
                mpd.push(json_api[i].mpdisuse);
                mpr.push(json_api[i].mpreused);
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
                categories: pais_año
                }
            },
            data: {
                type: "step",
                labels:true,
                columns: [
                    men,
                    women,
                    percentages,
                    tdw,
                    mpd,
                    mpr
                ]
            },
            bar: {
                width: {
                ratio: 0.5
                }
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
    <Nav>
        <NavItem>
          <NavLink href="#/info">Página Principal</NavLink>
        </NavItem>
    </Nav>

    <div align = "center">
        <h2>
          Integracion estadísticas Inmigrantes y dispositivos que contaminan
        </h2>
      </div>
    <div id="myChart" align="center"></div>

</main>