//main.js se encuentra guardado en la carpeta js/main.js que es de donde el HTML lo manda llamar
//mandamos la informacion hacia nuestro HTML
const CHART = document.getElementById("lineChart");
/*Revisar documentacion de Chart.js para ver mas opciones globales,
DESCOMENTAR SI QUIEREN QUE LA GRAFICA NO SEA RESPONSIVA
Chart.defaults.global.responsive = false;*/
let lineChart = new Chart(CHART, {
	type: 'line',
	//insercion de datos
	data: {
		/*labels nos remarca cuanto se vera de nuestra grafica, no importando cuantos
		datos contenga nuestro 'data' no los mostrara*/
		labels: ["one", "two", "three"],
		//datasets nos da las propiedades que contendra la grafica//
		datasets: [
		{
			//nombre de la linea//
			label: "EL PRIMERO",
			/*En este caso tenemos que nuestra linea no estara rellena como
			en 'EL SEGUNDO'*/
			fill: false,
			/*LineTension solo se usa en esta grafica y nos remarca que tan curveada queremos la linea*/
			lineTension: 0.1,
			/*colores y bordes*/
			backgroundColor: "rgba(75,192,192,0.4)",
			borderColor: "rgba(75,192,192,1)",
			borderCapStyle: "butt",
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: "rgba(75,192,192,1)",
			pointBorderColor: "#fff",
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: "rgba(75,192,192,1)",
			pointHoverBorderColor: "rgba(220,220,220,1)",
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius:10,
			//espacio de los datos, si hay mas de lo que esta en nuestro labels no se mostraran//
			data: [65,59,80],

		},//finaliza la primera linea, sigue la siguiente linea agregada
			{
			label: "EL SEGUNDO",
			fill: true,
			lineTension: 0.1,
			backgroundColor: "rgba(75,75,192,0.4)",
			borderColor: "rgba(75,72,192,1)",
			borderCapStyle: "butt",
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: "rgba(75,72,192,1)",
			pointbackgroundColor: "#fff",
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: "rgba(75,72,192,1)",
			pointHoverBorderColor: "rgba(220,220,220,1)",
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius:10,
			data: [55,63,33],
		}

		]
	},
	/*agregamos opciones en donde agregamos un objeto escala,
	dentro de este, tendremos el objeto yAxes que representa
	al 'eje Y' el cual sin el objeto ticks y BeginAtZero nos
	mostrara una grafica que empiece por el primer dato mas chico
	que este en nuestro data... para ver la diferencia comentar
	toda la parte de options*/
	options: {
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true,
				}
			}]
		}
	}
});