//main.js se encuentra guardado en la carpeta js/main.js que es de donde el HTML lo manda llamar
//mandamos la informacion hacia nuestro HTML
const CHART = document.getElementById("barChart");
/*Revisar documentacion de Chart.js para ver mas opciones globales,
DESCOMENTAR SI QUIEREN QUE LA GRAFICA NO SEA RESPONSIVA
Chart.defaults.global.responsive = false;*/
let barChart = new Chart(CHART, {
	type: 'bar',
	//insercion de datos
	data: {
		/*labels nos remarca cuanto se vera de nuestra grafica, no importando cuantos
		datos contenga nuestro 'data' no los mostrara*/
		labels: ["PAC", "PLN", "FA", "ML", "PUSC", "PPN", "Otros"],
		//datasets nos da las propiedades que contendra la grafica//
		datasets: [
		{
			//nombre de la linea//
			label: '1era Vuelta',
			//espacio de los datos, si hay mas de lo que esta en nuestro labels no se mostraran//
			data: [30.64,29.71,17.25,11.34,6.02,1.50,3.55],
			backgroundColor:"rgba(153, 99, 132, 0.5)",
		},//finaliza la primera linea, sigue la siguiente linea agregada
			{
			label: '2da vuelta',
			data: [77,22.1],
			backgroundColor: "rgba(254, 98, 131, 0.5)"
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
					beginAtZero: true
				}
			}],
			xAxes: [{
				/*stacked se refiere a si quieres que las barras se vean en una sola o en diferentes,
					para activar una sola barra cambiar el false por el true*/
				stacked: false
			}]
		}
	}
});

//main.js se encuentra guardado en la carpeta js/main.js que es de donde el HTML lo manda llamar
//mandamos la informacion hacia nuestro HTML
const CHART1 = document.getElementById("lineChart");
/*Revisar documentacion de Chart.js para ver mas opciones globales,
DESCOMENTAR SI QUIEREN QUE LA GRAFICA NO SEA RESPONSIVA
Chart.defaults.global.responsive = false;*/
let lineChart = new Chart(CHART1, {
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

const CHART3 = document.getElementById("barChart1");
let barChart1 = new Chart(CHART3, {
	type: 'bar',
	data: {
		labels: ["Numero de votates"],
		datasets: [
		{
			label: 'habitantes inscritos',
			data: [3051386],
			backgroundColor:"rgba(0, 255, 0, 0.5)",
		},
			{
			label: 'Votantes',
			data: [2099219],
			backgroundColor: "rgba(0, 0, 255, 0.5)"
		}

		]
	},
	options: {
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true
				}
			}],
			xAxes: [{
				stacked: false
			}]
		}
	}
});


const CHART4 = document.getElementById("lineChart1");
let lineChart1 = new Chart(CHART4, {
	type: 'line',
	data: {
		labels: ["one", "two", "three"],
		datasets: [
		{
			label: "EL PRIMERO",
			fill: false,
			lineTension: 0.1,
			backgroundColor: "rgba(255,196,51,0.4)",
			borderColor: "rgba(255,196,51,1)",
			borderCapStyle: "butt",
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: "rgba(255,196,51,1)",
			pointBorderColor: "#fff",
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: "rgba(255,196,51,1)",
			pointHoverBorderColor: "rgba(220,220,220,1)",
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius:10,
			data: [65,59,80],

		},
			{
			label: "EL SEGUNDO",
			fill: true,
			lineTension: 0.1,
			backgroundColor: "rgba(244,79,12,0.4)",
			borderColor: "rgba(244,79,12,1)",
			borderCapStyle: "butt",
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: "rgba(244,79,12,1)",
			pointbackgroundColor: "#fff",
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: "rgba(244,79,12,1)",
			pointHoverBorderColor: "rgba(220,220,220,1)",
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius:10,
			data: [55,63,33],
		}

		]
	},
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

const CHART5 = document.getElementById("barChart2");
let barChart2 = new Chart(CHART5, {
	type: 'bar',
	data: {
		labels: ["Elecciones Legislativas"],
		datasets: [
		{
			label: 'PLN',
			data: [18],
			backgroundColor:"rgba(103,244,12,0.5)",
		},
			{
			label: 'PAC',
			data: [13],
			backgroundColor: "rgba(244,114,12,0.5)"
		},
			{
			label: 'PFA',
			data: [9],
			backgroundColor:"rgba(250,239,3,0.5)",
		},
			{
			label: 'PUSC',
			data: [8],
			backgroundColor: "rgba(3,221,250,0.5)"
		},
			{
			label: 'PML',
			data: [4],
			backgroundColor: "rgba(250,3,7,0.5)"
		},
			{
			label: 'PRC',
			data: [2],
			backgroundColor:"rgba(11,3,250,0.5)",
		},
			{
			label: 'Otros 3 partidos',
			data: [3],
			backgroundColor: "rgba(166,169,173,0.5)"
		},


		]
	},
	options: {
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true
				}
			}],
			xAxes: [{
				stacked: false
			}]
		}
	}
});

const CHART6 = document.getElementById("barChart3");
let barChart3 = new Chart(CHART6, {
	type: 'bar',
	data: {
		labels: ["Cantones","Dist. Adm.", "Dist. Elect"],
		datasets: [
		{
			label: 'Costa Rica',
			data: [81,478,2043],
			backgroundColor:"rgba(103,244,12,0.5)",
		},
			{
			label: 'San Jose',
			data: [20,121,439],
			backgroundColor: "rgba(244,114,12,0.5)"
		},
			{
			label: 'Alajuela',
			data: [15,113,438],
			backgroundColor:"rgba(250,239,3,0.5)",
		},
			{
			label: 'Cartago',
			data: [8,51,193],
			backgroundColor: "rgba(3,221,250,0.5)"
		},
			{
			label: 'Heredia',
			data: [10,47,114],
			backgroundColor: "rgba(250,3,7,0.5)"
		},
			{
			label: 'Guanacaste',
			data: [11,59,294],
			backgroundColor:"rgba(11,3,250,0.5)",
		},
			{
			label: 'Puntarenas',
			data: [11,58,374],
			backgroundColor: "rgba(166,169,173,0.5)"
		},
			{
			label: 'Limon',
			data: [6,29,191],
			backgroundColor: "rgba(166,169,173,0.5)"
		}

		]
	},
	options: {
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true
				}
			}],
			xAxes: [{
				stacked: false
			}]
		}
	}
});