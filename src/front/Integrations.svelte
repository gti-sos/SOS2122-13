
<main>

    <hr>
    <h1 align = "center">SOS2122 / Grupo 13</h1>
    <hr>
    <h1 align = "center">
        Integraciones y Usos
    </h1>

    

    <div id = "columnas">

        <div class= "emigrants" ALIGN = "center">

            <h1>Emigrantes</h1>
            <p>(developed by <a href="https://github.com/celiasg21">
                [Celia Sánchez Gaitán])</a>
            </p>
        
            <hr>
            <h2>Gráfica Individual: </h2>
            <br>
            <button onclick="window.location.href='https://sos2122-13.herokuapp.com/#/emigrants-graph'">Gráfica Emigrantes Highcharts</button>
            <br>
            <button onclick="window.location.href='https://sos2122-13.herokuapp.com/#/emigrants-graph-C3'">Gráfica Emigrantes C3.js</button>
            <hr>

            <h2>Gráfica Grupal (Integración Emigrantes e Inmigrantes): </h2>
            <br>
            <button onclick="window.location.href='https://sos2122-13.herokuapp.com/#/analytics'">Gráfica Grupal</button>
            <hr>

            <h1>Integraciones</h1>
            <br>
            <h3>Integración Emigrantes y Carbón</h3>
            <button onclick="window.location.href='https://sos2122-13.herokuapp.com/#/IntCoalStats'">Gráfica</button>
            <h3>Integración Emigrantes y Gastos en Defensa</h3>
            <button onclick="window.location.href='https://sos2122-13.herokuapp.com/#/IntDefenseSpentStats'">Gráfica</button>
            <hr>

            <h1>Usos</h1>
            <br>
            <h3>Uso API Externa 1 </h3>
            <button onclick="window.location.href='https://sos2122-13.herokuapp.com/#/Externa1'">Gráfica</button>
            <h3>Uso API Externa 2</h3>
            <button onclick="window.location.href='https://sos2122-13.herokuapp.com/#/Externa2'">Gráfica</button>
            <h3>Uso API Carbón</h3>
            <button onclick="window.location.href='https://sos2122-13.herokuapp.com/#/UsoCoalStats'">Gráfica</button>
            <h3>Uso API Defensa</h3>
            <button onclick="window.location.href='https://sos2122-13.herokuapp.com/#/UsoDefenseSpentStats'">Gráfica</button>
            <hr>
            

           

        </div>

        <div class= "emigrants" ALIGN = "center">

            <h1>Inmigrantes</h1>
            <p>(developed by <a href="https://github.com/ThomasTejGor">
                [Thomas Tejeda Gordon])</a>
            </p>
        
            <hr>
            
           

        </div>

        

    </div>

    <hr>

  
</main>

<style>
   

    #columnas {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    #columnas > div {
        width: 50%;
    }
</style>