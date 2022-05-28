<script>
    import { onMount } from 'svelte';
	import Table from 'sveltestrap/src/Table.svelte';
	import Button from 'sveltestrap/src/Button.svelte';
	import { Alert } from 'sveltestrap';

	var BASE_API_URL = "/api/v2/emigrants";

    let emigrant = [];
	let color = "danger";

	let limitPages = 0;
	let offset = 0;
	let limit = 15;
	let from = null;
	let to = null;

	let newData = {
		country: "",
		year: "",
		men: "",
        women: "",
        percentages: ""
	}

	let checkMSG = null;
	let nEntradas;
	let visible = false;

	
    onMount(getData);

	//GET al conjunto de recursos
    async function getData(){

        console.log("Fetching emigrants data....");
		
		let cadena = `/api/v2/emigrants?limit=${limit}&&offset=${offset*10}&&`;

		if (from != null) {
			cadena = cadena + `from=${from}&&`
		}
		if (to != null) {
			cadena = cadena + `to=${to}&&`
		}
		console.log(cadena);

        const res = await fetch(cadena); 

        if(res.ok){
			let cadenaPagina = cadena.split(`limit=${limit}&&offset=${offset*10}`);
			limPagesF(cadenaPagina[0]+cadenaPagina[1]);
            const data = await res.json();
            emigrant = data;
			nEntradas = emigrant.length;
            console.log("Received: "+emigrant.length);
        }else{
			checkMSG = res.status;
			console.log("ERROR!")
		}
    }

	//GET para cargar los datos iniciales
	async function LoadData(){

        console.log("Loading emigrants data...");
		await fetch(BASE_API_URL + "/loadInitialData");
        const res = await fetch(BASE_API_URL + "?limit=10&offset=0");
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            emigrant = json;
            visible = true;
            nEntradas=6;
            console.log("Received " + emigrant.length + " entry data.");
            color = "success";
            checkMSG = "Los datos iniciales han sido cargados correctamente";
        } else {
            color = "danger";
            checkMSG= res.status + ": " + "No se pueden cargar los datos";
            console.log("ERROR!");
        }
    }

	//Límite de Páginas según los datos que tenemos
	async function limPagesF(cadena){
	
        const res = await fetch(cadena,
			{
				method: "GET"
			});

			if(res.ok){
				const data = await res.json();
				limitPages = Math.floor(data.length/10);
				if(limitPages === data.length/10){
					limitPages = limitPages-1;
				}
        }
	}

	//Insertar un nuevo dato
	async function insertData(){
		 
         console.log("Inserting emigrant data...");
         if (newData.country == "" || newData.year == null || newData.men == null || newData.women == null || newData.percentages == null ) {
            alert("Todos los campos deber ser escritos");
         }

         else{

             const res = await fetch("/api/v2/emigrants",
			 {
             method:"POST",
             body:JSON.stringify(newData),
             headers:{
                 "Content-Type": "application/json"
             }

             }).then(function (res) {

				if(res.status == 201){
				getData();
				nEntradas++;
				console.log("Introduced");
				checkMSG = "Los datos han sido introducidos correctamente";
				}

				else if(res.status == 400){
				console.log("ERROR");
				checkMSG = "Ya existe";
				}
				
				else if(res.status == 409){
				console.log("ERROR");
				checkMSG = "Los datos son incorrectos";

				}
            });	
        }
    }

	//Delete un recurso
	async function deleteData(countryD, yearD){

		const res = await fetch(BASE_API_URL + "/" + countryD + "/" + yearD, {
            method: "DELETE"
        }).then(function (res) {
            visible = true;
            getData();   

            if (res.status==200) {
                nEntradas--;
                color = "success";
                checkMSG = "Recurso "+countryD +" "+yearD+ " borrado correctamente";
                console.log( countryD + " Deleted");      

            } else if (res.status==404) {
                color = "danger";
                checkMSG = "No se ha encontrado el objeto " + countryD;
                console.log("Resource NOT FOUNDD");  

            } else {
                color = "danger";
                checkMSG= res.status + ": " + "No se pudo borrar el recurso";
                console.log("ERROR!");
            }      
        });
    }

	//DELETE todos los recursos
	async function deleteAll(){

        console.log("Deleting emigrant data...");

		if (confirm("¿Está seguro de que desea eliminar todos los datos?")){

			console.log("Deleting emigrants data...");
			const res = await fetch(BASE_API_URL, {
				method: "DELETE"

			}).then(function (res) {
                visible=true;
				if (res.ok && nEntradas>0){
                    nEntradas = 0;
					getData();

                    color = "success";
					checkMSG="Todos los datos han sido eliminados correctamente";
					console.log("OK");

				} else if (totaldata == 0){
                    console.log("ERROR");
                    color = "danger";
					checkMSG= "No hay ninguna entrada";

                } else{
					console.log("ERROR");
                    color = "danger";
					checkMSG= "No se han podido eliminar los datos";
				}
			});
		}
	}

	
</script>

<main>
   
	<h1 style ="text-align: center;">Emigrantes</h1>

	{#await emigrant}
		loading emigrants data...
		{:then emigrant}

		<Alert color={color} isOpen={visible} toggle={() => (visible = false)}>
            {#if checkMSG}
                {checkMSG}
            {/if}
        </Alert>

		<Table ALIGN="center">

			<thead ALIGN = "center">
				<tr text-align="center">
					<th >Búsqueda por rango de años: </th>
				</tr>
			</thead>
		
			<tbody ALIGN="center">
				<tr>
					<td><input placeholder="Fecha de Inicio" type="number"  bind:value="{from}"></td>
				</tr>
				<tr>
					<td><input placeholder="Fecha de Fin" type="number"  bind:value="{to}"></td>
				</tr>

				<tr>
					<td align="center"><Button outline color="primary" on:click="{()=>{
						if (from == null || to == null) {
							checkMSG="los campos no pueden estar vacíos";
						}else{
							getData();
						}
					}}">
						Buscar
						</Button>
					</td>
				</tr>
			</tbody>
			
		</Table>

		<br>
		<br>
		<h1 style ="text-align: center;">Tabla de datos de Emigrantes</h1>
		<br>

		<Table ALIGN="center" bordered responsive>
			<thead>
				<tr ALIGN="center">
					<th>País</th>
					<th>Año</th>
					<th>Hombres</th>
					<th>Mujeres</th>
					<th>Porcentajes</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input type="text"  placeholder="spain" bind:value="{newData.country}"></td>
					<td><input type="number"  placeholder="2010" bind:value="{newData.year}"></td>
					<td><input type="number"  placeholder="4.9" bind:value="{newData.men}"></td>
					<td><input type="number"  placeholder="7.1" bind:value="{newData.women}"></td>
					<td><input type="number"  placeholder="3.5" bind:value="{newData.percentages}"></td>

					<td style="text-align: center;">
						<Button outline color="primary" on:click="{insertData}">
						Añadir 
						</Button>
					</td>
				</tr>
				{#each emigrant as entry}
					<tr>
						<td>{entry.country}</td>
						<td>{entry.year}</td>
						<td>{entry.men}</td>
						<td>{entry.women}</td>
						<td>{entry.percentages}</td>
						<td><Button outline color="danger" on:click={deleteData(entry.country,entry.year)}>
							Borrar
						</Button>
						<td><Button outline color="warning" on:click={function (){
							window.location.href = `/#/emigrants/${entry.country}/${entry.year}`
						}}>
							Editar
						</Button>
						
						</td>
					</tr>
				{/each}
			</tbody>

		</Table>

		<br>

		<div align="center">

			{#each Array(limitPages + 1) as _,page}
			
				<Button coutline color="success" on:click={()=>{offset = page;getData();}}>{page} </Button>&nbsp
		
			{/each}
			</div>

		<div align="center">
			<Button outline color="success" on:click={LoadData}>Cargar datos iniciales</Button>&nbsp
			<Button outline color="danger" on:click={deleteAll}>Eliminar todo</Button>
		</div>
		<br>
		<br>
	{/await}

</main>