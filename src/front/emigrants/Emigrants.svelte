<script>
    import { onMount } from 'svelte';
    import Table from 'sveltestrap/src/Table.svelte';
    import Button from 'sveltestrap/src/Button.svelte';
	import { Alert } from 'sveltestrap';
    
    var BASE_API_URL = "/api/v2/emigrants";

    let entries = [];
    let visible = false;
    let color = "danger";

	let data = {
		country: "",
		year: null,
		year: null,
        men: null,
        women: null,
        percentages: null
	}

    let checkMSG = "";
    let page = 1;
    let totaldata=6;
    
    onMount(getData);

    //get la conjunto de recursos
    async function getData(){

        console.log("Fetching entries....");
        const res = await fetch("/api/v2/emigrants"); 
        if(res.ok){
            console.log("Ok:");
            const data = await res.json();
            entries = data;
            console.log("Received: "+entries.length);
        }else {
                checkMSG= res.status + ": Recursos no encontrados ";
                console.log("ERROR!");
            }
    }
    //get para cargar los datos iniciales
    async function loadStats() {
 
        console.log("Fetching emigrants data...");
        await fetch(BASE_API_URL + "/loadInitialData");
        const res = await fetch(BASE_API_URL + "?limit=10&offset=0");
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            entries = json;
            visible = true;
            totaldata=6;
            console.log("Received " + entries.length + " entry data.");
            color = "success";
            checkMSG = "Datos cargados correctamente";
        } else {
            color = "danger";
            checkMSG= res.status + ": " + "No se pueden cargar los datos";
            console.log("ERROR! ");
        }
    }

    //Insertar un nuevo dato

    async function insertStat(){
		 
         console.log("Inserting inequality data...");
         //Comprobamos que el año y la fecha no estén vacíos, el string vacio no es null
         if (data.country == "" || data.year == null || data.men == null || data.women == null || data.percentages == null ) {
             alert("Debe rellenar todos los campos");
         }
         else{
             const res = await fetch("/api/v2/emigrants",{
             method:"POST",
             body:JSON.stringify(data),
             headers:{
                 "Content-Type": "application/json"
             }
             }).then(function (res) {
                 if(res.status == 201){
                    getData();
                     console.log("Data introduced");
                     errorMSG = 201;
                 }
                 else if(res.status == 400){
                     window.alert("No se introdujo bien el dato");
                     console.log("ERROR Data was not correctly introduced");
                     errorMSG = 400;
                 }
                 else if(res.status == 409){
                     console.log("ERROR");
                     errorMSG = 409;
                 }
             });	
         }
     }

    //Delete un recurso

    async function deleteStat(countryDelete, yearDelete) {
        const res = await fetch(BASE_API_URL+ "/" + countryDelete + "/" + yearDelete, {
            method: "DELETE"
        }).then(function (res) {
            visible = true;
            getData();      
            if (res.status==200) {
                totaldata--;
                errorMSG = 200.2;
                console.log("Deleted " + countryDelete);            
            }else if (res.status==404) {
                errorMSG = 404;
                console.log("DATA NOT FOUND");            
            } else {
                errorMSG= res.status;
                console.log("ERROR!");
            }      
        });
    }

    //DELETE todos los recursos
    async function deleteALL() {
		console.log("Deleting entry data...");

		if (confirm("¿Está seguro de que desea eliminar todas los datos?")){

			console.log("Deleting all entry data...");
			const res = await fetch(BASE_API_URL, {
				method: "DELETE"

			}).then(function (res) {
                visible=true;
				if (res.ok && totaldata>0){
                    totaldata = 0;
					getData();

                    color = "success";
					checkMSG="Datos eliminados correctamente";
					console.log("OK All data erased");

				} else if (totaldata == 0){
                    console.log("ERROR Data was not erased");
                    color = "danger";
					checkMSG= "Todos los datos ya han sido borrados";
                } else{
					console.log("ERROR Data was not erased");
                    color = "danger";
					checkMSG= "No se han podido eliminar los datos";
				}
			});
		}
	}
</script>

<main>

    <h1 style ="text-align: center;">Tabla de datos de Emigrantes</h1>

        {#await entries}
            Loading entry stats data...
        {:then entries}
        
        <Alert color={color} isOpen={visible} toggle={() => (visible = false)}>
            {#if checkMSG}
                {checkMSG}
            {/if}
        </Alert>

        <br>

        <Table bordered responsive> 
            <thead>
                <tr>
                    <th>Pais</th>
                    <th>Año</th>
                    <th>Hombres</th>
                    <th>Mujeres</th>
                    <th>Porcentaje</th>
                    <th colspan="2">Acciones</th>
                </tr>
        </thead>
        <tbody>
            <tr>
                <td><input type = "text" placeholder="spain" bind:value="{data.country}"></td> 
                <td><input type = "text" placeholder="2016" bind:value="{data.year}"></td> 
                <td><input type = "number" placeholder="4.6" bind:value="{data.men}"></td>    
                <td><input type = "number" placeholder="4" bind:value="{data.women}"></td>  
                <td><input type = "number" placeholder="5" bind:value="{data.percentages}"></td>

                <td colspan="2" style="text-align: center;"><Button outline color="primary" on:click={insertStat}>Insertar</Button></td>  
            </tr>

        {#each entries as entry}
            <tr>
                
                <td><a href="api/v1/emigrants/{entry.country}/{entry.year}">{entry.country}</a></td>
                <td>{entry.year}</td>
                <td>{entry.men}</td>
                <td>{entry.women}</td>
                <td>{entry.percentages}</td>
                <td><Button outline color="danger" on:click="{deleteStat(entry.country, entry.year)}">Borrar</Button></td>
                <td><a href="#/emigrants/{entry.country}/{entry.year}"><Button outline color="primary">Editar</Button></a></td>
            </tr>
                
        {/each}

        </tbody>
        <br>

        </Table>
        <Button color="success" on:click="{loadStats}">
            Cargar datos inciales
        </Button>
        <Button color="danger" on:click="{deleteALL}">
            Eliminar todo
        </Button>


        {/await} 
</main>