<script>
    import { onMount }from "svelte";
    import { pop }from "svelte-spa-router";
	import Button from "sveltestrap/src/Button.svelte";
    import Table from "sveltestrap/src/Table.svelte"; 
    import { Alert } from 'sveltestrap';

    
    export let params = {};

    var BASE_API_URL= "/api/v2/immigrants";
    
    
    let immigrants = {};
    let updateCountry = "";
    let updateYear = "";
    let updatedMen = "";
    let updatedWomen = "";
    let updatedPercentages = "";

    let errorMSG = "";
    let visible = false;
    let color = "danger";


    onMount(getData);


    async function getData(){
        console.log("Fetching immigrant data...");

        const res = await fetch(BASE_API_URL + "/" + params.country + "/" + params.year);

        if(res.ok){
            console.log("Ok");
            const json = await res.json();
            updatedMen = immigrants.updatedMen;
            updatedWomen = immigrants.updatedWomen;
            updatedPercentages = immigrants.updatedPercentages;
            console.log("Recived immigrants data");
        }else{
            color = "danger"
            visible = true;
            errorMSG = "Error " + res.status + " : " + "No existe ningún recurso con los parametros " +  params.country +" " + params.year;
            console.log("ERROR" + errorMSG);
        }
    }
    async function updateData(){ 

            console.log("Editing immigrants data...");

            const res = await fetch(BASE_API_URL + "/" + params.country + "/" + params.year, {

                    method:"PUT",

                    body : JSON.stringify({
                        country: params.country,
                        year: parseInt(params.year),
                        men: parseFloat(updatedMen),
                        women: parseFloat(updatedWomen),
                        percentages: parseFloat(updatedPercentages)
                    }),

                    headers:{
                        "Content-Type": "application/json"
                    }

                }).then(function (res) {

                    visible = true;

                    if(res.status == 200){

                        getData(); 
                        console.log("Data introduced");
                        color = "success";
                        errorMSG="Dato actualizado";

                    }else if(res.status == 400){

                        console.log("Data incorrect");
                        errorMSG="Los campos se han introducido de manera incorrecta";
                    }
                    else{
                        
                        console.log("Data not edited");
                        errorMSG= "Debe completar todos los campos";
                    }

                });	
    }

</script>

<main>

    <Alert color={color} isOpen={visible} toggle={() => (visible = false)}>
        {#if errorMSG}
		    {errorMSG}
	    {/if}
    </Alert>
    
    <br>

    <h1 ALIGN= "center"> Editar: {params.country}-{params.year}  </h1>
    <br>

    <Table bordered>

        <thead>
            <tr>
                <th>País</th>
                <th>Año</th>
                <th>Hombres</th>
                <th>Mujeres</th>
                <th>Porcentaje</th>
                <th></th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>{params.country}</td>
                <td>{params.year}</td>
                <td><input bind:value="{updatedMen}"></td>
                <td><input bind:value="{updatedWomen}"></td>
                <td><input bind:value="{updatedPercentages}"></td>
                <td><Button class="btn btn-success" on:click={updateData}>Actualizar</Button></td>
            </tr>
        </tbody>
    </Table>

    <div ALIGN = "center">

        <Button class="btn btn-warning" on:click="{pop}">Atrás</Button>
    </div>
</main>

