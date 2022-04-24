<script>
    import { onMount } from 'svelte';


    let immigrants = [];

    onMount(getImmigrants);

    async function getImmigrants(){
        console.log("Fetching immigrants....");
        const res = await fetch("/api/v1/immigrants");
        if(res.ok){
            const data = await res.json();
            immigrants = data;
            console.log("Received immigrants: " +immigrants.length);

        }
    }
</script>
<main>
    {#await immigrants}
    loading
	    {:then immigrants} 
	
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
			    {#each immigrants as immigrant}
				    <tr>
					    <td>{immigrant.country}</td>
					    <td>{immigrant.year}</td>
					    <td>{immigrant.men}</td>
					    <td>{immigrant.women}</td>
					    <td>{immigrant.percentages}</td>
				    </tr>
			    {/each}
		    </tbody>
	    </table>
    {/await}
</main>