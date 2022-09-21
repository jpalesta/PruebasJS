class Entrega {
    constructor(id, zona, al, an, la) {
        this.id = id;
        this.zona = zona;
        this.al = al;
        this.an = an;
        this.la = la;
        this.volumen = (this.al * this.la * this.an) / 1000000;
        this.pendiente = true;
    }
}
class Vehiculo {
    constructor(id, marca, modelo, al, an, la) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.al = al;
        this.an = an;
        this.la = la;
        this.volumen = (this.al * this.la * this.an) / 1000000;
    }
}
class HojaDeRuta {
    constructor(id, entregas, volumen, vehiculo, ocupacion) {
        this.id = id;
        this.entregas = entregas;
        this.volumenEntregasZona = volumen;
        this.vehiculo = vehiculo
        this.ocupacion = ocupacion
    }
}
//array con entregas de ejemplo para no tener que cargar muchas entregas
let entregas = [
    new Entrega(1, 4, 100, 100, 100),
    new Entrega(2, 2, 10, 5, 100),
    new Entrega(3, 1, 100, 10, 20),
    new Entrega(4, 3, 10, 200, 100),
    new Entrega(5, 4, 150, 100, 10),
];
//array de vehículos de ejemplo
let vehiculos = [
    new Vehiculo(1, "Renault", "Kangoo", 105, 115, 180),
    new Vehiculo(2, "Mercedes", "Sprinter", 175, 150, 330),
];
//array vacío de hojas de ruta para que genere el id y se vaya completando
let hojasDeRuta = [];

function elegirZona() {
    zona = Number(
        prompt(`Ingrese una zona de entrega:
    1: CABA
    2: NORTE
    3: SUR
    4: OESTE
    `)
    );
    if (zona != 1 && zona != 2 && zona != 3 && zona != 4) {
        do {
            zona = Number(
                prompt(`Ingrese una zona de entrega:
    1: CABA
    2: NORTE
    3: SUR
    4: OESTE
    `)
            );
        } while (zona != 1 && zona != 2 && zona != 3 && zona != 4);
        return zona;
    } else {
        return zona;
    }
}

function crearNuevaEntrega() {
    let altura = Number(prompt(`Ingrese la Altura en centímetros`));
    let ancho = Number(prompt(`Ingrese el Ancho en centímetros`));
    let largo = Number(prompt(`Ingrese el Largo en centímetros`));

    entregas.push(
        new Entrega(
            entregas.length + 1,
            elegirZona(),
            altura,
            ancho,
            largo
        )
    );
    alert("La entrega fue creada correctamente");

    let nuevaFilaClon = nuevaFila.cloneNode(true)
    section.appendChild(nuevaFilaClon)
    nuevaFilaClon.children[0].innerText = entregas.length
    nuevaFilaClon.children[1].innerText = zona
    nuevaFilaClon.children[2].innerText = altura
    nuevaFilaClon.children[3].innerText = ancho
    nuevaFilaClon.children[4].innerText = largo
    nuevaFilaClon.children[5].innerText = (altura * ancho * largo) / 1000000

}

function crearNuevoVehiculo() {
    let marca = prompt(`Ingrese la marca del vehículo`);
    let modelo = prompt(`Ingrese el modelo del vehículo`);
    let altura = Number(prompt(`Ingrese la Altura en centímetros`));
    let ancho = Number(prompt(`Ingrese el Ancho en centímetros`));
    let largo = Number(prompt(`Ingrese el Largo en centímetros`));

    vehiculos.push(
        new Vehiculo(
            vehiculos.length + 1,
            marca,
            modelo,
            altura,
            ancho,
            largo
        )
    );
    alert("El vehículo fue agregado con éxito");
    elegirFuncion();
}

function crearNuevaHojaDeRuta() {

    elegirZona();

    let listadoEntregasPendientesPorZona = entregas.filter(
        (entrega) => entrega.zona == zona && entrega.pendiente === true
    );

    let volumenEntregasZona = 0
    for (let i = 0; i < listadoEntregasPendientesPorZona.length; i++) {
        let va = listadoEntregasPendientesPorZona[i]
        volumenEntregasZona = (volumenEntregasZona + va.volumen);
    };

    //tengo que ver como hacer que esta selección sea dinámica, es decir, que se modifiquen las opciones de vehículos en función de los vehículos disponibles
    vh = Number(
        prompt(`Seleccione el vehículo:
        1: RN KANGOO
        2: MZ SPRINTER
        `)
    );

    let vehiculoElegido = vehiculos.find((vehiculo) => vehiculo.id === vh);

    let ocupacion = (volumenEntregasZona / vehiculoElegido.volumen) * 100;

    hojasDeRuta.push(
        new HojaDeRuta(
            (id = hojasDeRuta.length + 1),
            (entregas = listadoEntregasPendientesPorZona),
            (volumen = volumenEntregasZona),
            (vehiculo = vehiculoElegido),
            //no supe como mostrar la ocupación con el sigo de porcentaje al lado
            (ocupacion = ocupacion.toFixed(2))
        )
    );
    console.log(hojasDeRuta)

    elegirFuncion()
};

//Los muestros con consola porque no encontré de que manera mostrarlo que no sea uno por uno con alerts y no me pareció práctico, imagino que con DOM se va a poder mostrar más facil
function verEntregasPendientesPorZona() {
    elegirZona();
    const listadoEntregasPendientesPorZona = entregas.filter(
        (entrega) => entrega.zona == zona && entrega.pendiente === true
    );
    //Este lo había puesto para estar seguro que me filtraba y me olvidé de sacarlo
    console.log(listadoEntregasPendientesPorZona);
    let listado = ``
    for (const ep of listadoEntregasPendientesPorZona) {
        listado += `Entrega N°: ` + ep.id + ` Zona: ` + ep.zona + ` Volumen: ` + ep.volumen + `\n`
    }
    alert(listado)

    // elegirFuncion();
}

//ídem entregasPendientes
function verListadoDeVehiculos() {
    const listadoDeVehiculos = vehiculos.sort((v1, v2) => {
        if (v1.marca < v2.marca) {
            return -1;
        } else if (v1.marca > v2.marca) {
            return 1;
        } else {
            return 0;
        }
    });
    console.log(listadoDeVehiculos);

    // elegirFuncion();
}

let section = document.getElementById("filas");
let temp = document.querySelector("template");
let nuevaFila = temp.content.querySelector("tr");

function mostrarEntregas() {
    entregas.forEach((entrega) => {
        let nuevaFilaClon = nuevaFila.cloneNode(true)
        section.appendChild(nuevaFilaClon)
        nuevaFilaClon.children[0].innerText = entrega.id
        nuevaFilaClon.children[1].innerText = entrega.zona
        nuevaFilaClon.children[2].innerText = entrega.al
        nuevaFilaClon.children[3].innerText = entrega.an
        nuevaFilaClon.children[4].innerText = entrega.la
        nuevaFilaClon.children[5].innerText = entrega.volumen
    })
}

const boton = document.getElementById("botonFunciones");
boton.onclick = function () {
    eleccion = prompt(`Por favor indique la acción a realizar
    1. Crear nueva entrega.
    2. Ver entregas pendientes por zona.
    3. Crear hoja de ruta.
    4. Agregar un nuevo vehículo.
    5. Ver listado de vehículos
    6. Salir`);

    if (eleccion === null || eleccion == 6) {
        alert("En otra ocación");
    } else if (eleccion == 1) {
        crearNuevaEntrega();
    } else if (eleccion == 2) {
        verEntregasPendientesPorZona();
    } else if (eleccion == 3) {
        crearNuevaHojaDeRuta();
    } else if (eleccion == 4) {
        crearNuevoVehiculo();
    } else if (eleccion == 5) {
        verListadoDeVehiculos();
    } else {
        alert("Opción no válida");
        elegirFuncion();
    }
};

//función general
function main() {
    mostrarEntregas()
}

main();