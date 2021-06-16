/* Diseñar un sistema para una tienda donde el menú ofrezca las siguientes opciones:
Cobrar
Retirar dinero de la caja
Ver balance de caja
Ver los montos totales de todas las operaciones realizadas
(Ej: 2500,120,340). etc. 
Salir

1): Debemos ingresar los precios de cada uno de los objetos que el cliente fue comprando, uno por uno hasta que se avise que finalizó la carga. Preguntar si abona con tarjeta o efectivo. Si la compra supera los $2000 y paga en efectivo, realizar un descuento del 5%. Si la compra supera los $5000, realizar un descuento del 10% con ambos medios de pago. Mostrar el total de la cuenta. Si paga en efectivo, consultar con cuánto paga y avisar cuál es el vuelto que se le debe otorgar.
2) Si el monto que se solicita retirar es menor al monto que hay disponible en caja (pagos en efectivo), realizar la operación.
3) Ver cuánto se pagó en tarjeta y cuánto se pagó en efectivo.
4) Mostrar todos los montos de las operaciones (DE COMPRA, no retiros), tanto en tarjeta como en efectivo. Es decir, guardar una vez que se completa la operación, el monto total.
5) Finaliza el programa. */

let check = true;
//opcion 1
let total = 0;
let totalPagar;
let stop = true;
let descuento;
let dinero;
let vuelto;
// opcion 2
let dineroDisponible = 100000000;
let retirar = 0;
let totalRetirado = 0;
//opcion 3
let efectivo = 0;
let tarjeta = 0;
// opcion 4
let nroOperacion = 0;
let operaciones = "";
let totalOperaciones = 0;


while (check) {
    let option = parseInt(prompt("Ingrese una opción" + "\n" + "1) Cobrar" + "\n" + "2) retirar dinero de caja" + "\n" + "3) Ver balance de caja" + "\n" + "4) Ver montos totales de las operaciones realizadas" + "\n" + "5) Salir", 0));

    switch (option) {

        case 1:
            stop = true; //reinicia el valor a verdadero cada vez que el usuario termina de ingresar productos
            while (stop) {
                let products = parseInt(prompt("Ingrese productos" + "\n" + "para salir ingrese '0' ", 0));
                total = total + products;
                if (products === 0) {
                    stop = false;
                }
            }

            //validacion para el metodo de pago
            let metodoPago = prompt("¿Desea abonar con efectivo o tarjeta ?");
            stop = true;
            while (stop) { // por si ingresa un método de pago que no es efectivo o tarjeta
                if (metodoPago === "efectivo") {
                    stop = false;
                } else if (metodoPago === "tarjeta") {
                    stop = false;
                } else {
                    alert("Su método de pago " + metodoPago + " es incorrecto. Debe ingresar 'efectivo' o 'tarjeta'");
                    metodoPago = prompt("¿Desea abonar con efectivo o tarjeta ?");
                }
            }
            // fin validacion de metodo de pago

            // validacion de  descuento
            if (metodoPago === "efectivo" && total > 2000 && total <= 5000) {
                descuento = total * 0.05;
                totalPagar = total - descuento;
            } else if (total > 5000) {
                descuento = total * 0.1;
                totalPagar = total - descuento;
            } else {
                totalPagar = total;
            }
            //fin de validacion descuento

            //logica de la opcion 3
            if (metodoPago === "efectivo") { //suma el total de efectivo
                efectivo += totalPagar;
            }
            if (metodoPago === "tarjeta") { //suma el total de tarjeta
                tarjeta += totalPagar;
            }
            //fin logica opcion 3

            alert(`Total a pagar es $${totalPagar}`);

            //validacion  pago de usuario
            dinero = parseInt(prompt("¿Con cuánto paga?", 0));
            if (dinero >= totalPagar) {
                vuelto = dinero - totalPagar;
                alert(`Su vuelto es  $${vuelto}`);
            }
            if (dinero < totalPagar) {
                stop = true;
                while (stop) {
                    dinero = parseInt(prompt("¿Dinero insuficiente, ingrese otro monto?", 0));
                    if (dinero >= totalPagar) {
                        vuelto = dinero - totalPagar;
                        alert(`Su vuelto es  $${vuelto}`);
                        stop = false;
                    }
                }
            }
            // fin validacion pago de usuario

            // Inicio de lógica que corresponde al punto 4
            nroOperacion = nroOperacion + 1;
            operaciones = operaciones + ("Operación: " + nroOperacion + " con " + metodoPago + " = $" + totalPagar + "\n");
            totalOperaciones = totalOperaciones + totalPagar;
            // Fin de lógica que corresponde al punto 4

            total = 0; //reinicia el total a cero para que en cada operacion no se sume el anterior
            break;

        case 2:
            stop = true;
            while (stop) {
                retirar = parseInt(prompt("¿Cuánto dinero desea retirar?"));
                if (dineroDisponible >= retirar) {
                    stop = false;
                    alert(`Se retiro $${retirar} `);
                } else {
                    while (stop) {
                        retirar = parseInt(prompt("Su saldo es menor al disponible, por favor intente de nuevo"));
                        if (dineroDisponible >= retirar) {
                            stop = false;
                            alert(`Se retiro $${retirar} `);
                        }
                    }
                }
                dineroDisponible = dineroDisponible - retirar;
                alert(`Dinero disponible  $${dineroDisponible}`);
            }
            break;
        case 3:
            alert("Pago con efectivo  $" + efectivo + "\n" + "Pago con tarjeta  $" + tarjeta + "\n" + " Dinero en caja  $" + dineroDisponible);
            break;
        case 4:
            alert(operaciones + "\n" + "------------------------------" + "\n" + "El monto total es: $" + totalOperaciones);
            break;
        case 5:
            check = false;
            break;
        default:
            alert("Debe ingresar una opción válida");

    }
}