<script>
    import { onMount } from 'svelte';


    let emigrants = [];

    onMount(getEmigrants);

    async function getEmigrants(){
        console.log("Fetching Emigrants....");
        const res = await fetch("/api/v1/emigrants");
        if(res.ok){
            const data = await res.json();
            emigrants = data;
            console.log("Received emigrants: " +emigrants.length);

        }
    }
</script>
<main>
    {#await emigrants}
    loading
	    {:then emigrants} 
	
	    <table>
		    <thead>
			    <th>
				    Pais
			    </th>
			    <th>
				    Año
			    </th>
			    <th>
				    Hombres
			    </th>
			    <th>
				    Mujeres
			    </th>
			    <th>
				    Porcentaje
			    </th>
		    </thead>
		    <tbody>
			    {#each emigrants as emigrant}
				    <tr>
					    <td>{emigrant.country}</td>
					    <td>{emigrant.year}</td>
					    <td>{emigrant.men}</td>
					    <td>{emigrant.women}</td>
					    <td>{emigrant.percentages}</td>
				    </tr>
			    {/each}
		    </tbody>
	    </table>
    {/await}
</main>