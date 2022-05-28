
<main>

    <hr>
    <h1 align = "center">SOS2122 / Grupo 13</h1>
    <hr>

    <div id = "columnas">

        <div class= "columna1" ALIGN = "center">
            <h2>Project description: </h2>
            <br>
            <p>
                <!-- svelte-ignore a11y-missing-attribute -->
                <img src="https://www.pintores-decoradores.com/wp-content/uploads/2017/07/mapamundi.jpg" > 
            </p>

            <p>Nuestro trabajo consiste en el estudio de</p>
            <p>la emigración e inmigración de la población</p>
            <p>del mundo a lo largo de los años.</p>
        </div>

        <div class= "colu" ALIGN = "center">
        

            <h2>Integrantes: </h2>
            <br>
            <p>Celia Sánchez Gaitán</p>
            <p>Thomas Tejeda Gordon</p>
            <hr>

            <h2>Repository: </h2>
            <br>
            <!--<a href="https://github.com/gti-sos/SOS2122-13">
                [gti-sos/SOS2122-13]
            </a>-->
            <button onclick="window.location.href='https://github.com/gti-sos/SOS2122-13'">Repositorio</button>
            <hr>

            <h2>Heroku: </h2>
            <br>
            <button onclick="window.location.href='http://sos2122-13.herokuapp.com'">Heroku</button>
            <hr>

            

        </div>

    </div>
    <hr>

    <div id = "columnas">

        <div class= "emigrants" ALIGN = "center">

            <h1>Emigrantes</h1>
            <p>(developed by <a href="https://github.com/celiasg21">
                [Celia Sánchez Gaitán])</a>
            </p>
        
            <hr>
            
            <h2>Documentación: </h2>
            <br>
            <button onclick="window.location.href='https://sos2122-13.herokuapp.com/api/v2/emigrants/docs'">Documentación</button>
            <hr>

            <h2>Front End: </h2>
            <br>
            <button onclick="window.location.href='https://sos2122-13.herokuapp.com/#/emigrants'">Front End</button>
            <hr>

            <h2>API: </h2>
            <br>
            <button onclick="window.location.href='https://sos2122-13.herokuapp.com/api/v2/emigrants'">API v2</button>
            <button onclick="window.location.href='https://sos2122-13.herokuapp.com/api/v1/emigrants'">API v1</button>
            <hr>

            <h2>Gráfica: </h2>
            <br>
            <button onclick="window.location.href='https://sos2122-13.herokuapp.com/#/emigrants-graph'">GRÁFICA EMIGRANTES</button>
            <hr>

        </div>

        <div class= "emigrants" ALIGN = "center">

            <h1>Inmigrantes</h1>
            <p>(developed by <a href="https://github.com/ThomasTejGor">
                [Thomas Tejeda Gordon])</a>
            </p>
        
            <hr>
            
            <h2>Documentación: </h2>
            <br>
            <button onclick="window.location.href='https://sos2122-13.herokuapp.com/api/v1/immigrants/docs'">Documentación</button>
            <hr>

            <h2>Front End: </h2>
            <br>
            <button onclick="window.location.href='https://sos2122-13.herokuapp.com/#/immigrants'">Front End</button>
            <hr>

            <h2>API: </h2>
            <br>
            <button onclick="window.location.href='https://sos2122-13.herokuapp.com/api/v2/immigrants'">API v2</button>
            <button onclick="window.location.href='https://sos2122-13.herokuapp.com/api/v1/immigrants'">API v1</button>
            <hr>

            <h2>Gráfica: </h2>
            <br>
            <button onclick="window.location.href='https://sos2122-13.herokuapp.com/#/Immigrants-graph'">GRÁFICA IMMIGRANTS</button>
            <hr>

        </div>

        

    </div>

    <hr>

    <p>
        <button onclick="window.location.href='https://sos2122-13.herokuapp.com/#/integrations'">Integraciones</button>
    </p>

  
</main>

<style>
    .columna1 img {
        width: 27vw;
        height: auto;
        border-radius: 12px;
    }

    #columnas {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    #columnas > div {
        width: 50%;
    }
</style>