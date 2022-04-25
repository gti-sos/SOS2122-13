<script>
    import { onMount }from "svelte";
    import { pop }from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte"; 
	import Button from "sveltestrap/src/Button.svelte";
    import { Alert } from 'sveltestrap';

    var BASE_API_URL = "/api/v2/emigrants";

    
    export let params = {};

    let visible = false;
    let color = "danger";
    
    let emigrants = {};
    let updatedMen = "";
    let updatedWomen = "";
    let updatedPercentages = "";
    let errorMsg = "";
    
    onMount(getStat);
    
    async function getStat(){
        console.log("Fetching datas...");
        const res = await fetch(BASE_API_URL + "/" + params.country + "/" + params.year);
        if(res.ok){
            console.log("Ok");
            const json = await res.json();
            updatedMen = emigrants.updatedMen;
            updatedWomen = emigrants.updatedWomen;
            updatedPercentages = emigrants.updatedPercentages;
            console.log("Recived data");
        }else{
            visible = true;
            color = "danger"
            errorMsg = "Error " + res.status + " : " + "Ningún recurso con los parametros " + params.country +" " + params.year;
            console.log("ERROR" + errorMsg);
        }
    }
    async function updateStat(){   
                 
            console.log("Editing life stats data...");
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
                        getStat(); 
                        console.log("Data introduced");
                        color = "success";
                        errorMsg="Recurso actualizado correctamente";
                    }else{
                        console.log("Data not edited");
                        errorMsg= "Rellene todos los campos";
                    }
                });	
    }
</script>

<main>

    <Alert color={color} isOpen={visible} toggle={() => (visible = false)}>
        {#if errorMsg}
		    {errorMsg}
	    {/if}
    </Alert>

    <h1>Recurso '{params.country} , {params.year} ' listo para editar</h1>
    <Table bordered>
        <thead>
            <tr>
                <th>País</th>
                <th>Año</th>
                <th>Hombres</th>
                <th>Mujeres</th>
                <th>Porcentaje</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{params.country}</td>
                <td>{params.year}</td>
                <td><input bind:value="{updatedMen}"></td>
                <td><input bind:value="{updatedWomen}"></td>
                <td><input bind:value="{updatedPercentages}"></td>
                <td><Button outline color="primary" on:click={updateStat}>Actualizar</Button></td>
            </tr>
        </tbody>
    </Table>

    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>