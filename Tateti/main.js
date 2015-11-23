//cuando cargue la página se le asignará una función al evento onload
//entre window.onload voy a poner todo el comportamiento de la página
window.onload = function () {
    //me devuelve un array con los objetos de html "td"
    var arrayTds = document.getElementsByTagName("td");
    var equisGanados = 0;
    var circuloGanados = 0;

    var obtenerCantidadSeleccionados = function () {
        return document.getElementsByClassName("activo").length;
    };

    var cambiarTd = function (td) {
        if (td.classList.contains("activo") == false) {
            td.classList.add("activo");
            if (obtenerCantidadSeleccionados() % 2 == 0) {
                td.classList.add("circulo");
                td.innerHTML = "<img src='/imagenes/Circulo.png' />";
            }
            else {
                td.classList.add("equis");
                td.innerHTML = "<img src='/imagenes/X.png' />";
            }
        }
    };

    var validarGanador = function () {
        var empate = true;
        var arrayCombinacionesGanadores = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
        for (var i = 0; i < arrayCombinacionesGanadores.length; i++) {
            var arrayCombinacion = arrayCombinacionesGanadores[i];
            var td1 = document.getElementById(arrayCombinacion[0]);
            var td2 = document.getElementById(arrayCombinacion[1]);
            var td3 = document.getElementById(arrayCombinacion[2]);
            if (td1.classList.contains("equis") && td2.classList.contains("equis") && td3.classList.contains("equis")) {
                alert("Ha ganado el jugador que utiliza la X!!!!");
                equisGanados++;
                document.getElementById("estadistica").innerHTML = "Ganados X = " + equisGanados + "; Ganados O = " + circuloGanados;
                reiniciar();
                empate = false;
            }
            if (td1.classList.contains("circulo") && td2.classList.contains("circulo") && td3.classList.contains("circulo")) {
                alert("Ha ganado el jugador que utiliza los O!!!!");
                circuloGanados++;
                document.getElementById("estadistica").innerHTML = "Ganados X = " + equisGanados + "; Ganados O = " + circuloGanados;
                reiniciar();
                empate = false;
            }
        }

        if (obtenerCantidadSeleccionados() == 9 && empate) {
            alert("Empate");
            reiniciar();
        }
    };

    var reiniciar = function () {
        for (var i = 0; i < arrayTds.length; i++) {
            var td = arrayTds[i];
            td.classList.remove("activo");
            td.classList.remove("equis");
            td.classList.remove("circulo");
            td.innerHTML = "";
        }
    };
    
    var inicializar = function () {
        for (var i = 0; i < arrayTds.length; i++) {
            var td = arrayTds[i];
            td.addEventListener("click", function () {
                cambiarTd(this);
                validarGanador();
            });
        }

        var btnReiniciar = document.getElementById("btnReiniciar");
        btnReiniciar.addEventListener("click", function () {
            reiniciar();
            equisGanados = 0;
            circuloGanados = 0;
            document.getElementById("estadistica").innerHTML = "Ganados X = " + equisGanados + "; Ganados O = " + circuloGanados;
        });
    };

    inicializar();

};