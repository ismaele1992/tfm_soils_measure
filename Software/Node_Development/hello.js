// Load Charts and the corechart and barchart packages.
google.charts.load('current', {'packages':['corechart']});

// Draw the pie chart and bar chart when Charts is loaded.
google.charts.setOnLoadCallback(drawChart);
	  
function drawChart(){
	
	datos = {
		"datos_ambientales":[
			{"temperatura": 32.4, "humedad": 47.7, "fecha" : "15:00"},
			{"temperatura": 25.9, "humedad": 65.8, "fecha" : "15:30"},
			{"temperatura": 22.5, "humedad": 37.8, "fecha" : "16:00"},
			{"temperatura": 19.3, "humedad": 52.4, "fecha" : "16:30"},
			{"temperatura": 24.2, "humedad": 45.2, "fecha" : "17:00"}
		]
	};
	
	var registros_temperaturas = new google.visualization.DataTable();
	registros_temperaturas.addColumn('string', 'Fecha_Toma');
	registros_temperaturas.addColumn('number', 'Temperaturas');
	
	var registros_humedades = new google.visualization.DataTable();
	registros_humedades.addColumn('string', 'Fecha_Toma');
	registros_humedades.addColumn('number', 'Humedades');
	
	console.log(datos);
	for (i = 0; i < datos.datos_ambientales.length; i++){
		console.log(datos.datos_ambientales[i].temperatura);
		registros_temperaturas.addRows([
			[datos.datos_ambientales[i].fecha, datos.datos_ambientales[i].temperatura],
		]);
		registros_humedades.addRows([
			[datos.datos_ambientales[i].fecha, datos.datos_ambientales[i].humedad],
		]);
	}
	
	var linechart_options_temperaturas = {title:'LineChart: Registros_Temperaturas',
				   width:400,
				   height:300};
	var grafico_temperaturas = new google.visualization.LineChart(document.getElementById('grafico_temperaturas'));
	grafico_temperaturas.draw(registros_temperaturas, linechart_options_temperaturas);
	
	var linechart_options_temperaturas = {title:'LineChart: Registros_Humedades',
				   width:400,
				   height:300};
	var grafico_humedades = new google.visualization.LineChart(document.getElementById('grafico_humedades'));
	grafico_humedades.draw(registros_humedades, linechart_options_temperaturas);
	
	httpGet();
}

function httpGet()
{
    var a = $.getJSON('http://127.0.0.1:8000', 200);
	console.log(a);
}

drawChart();
//httpGet('127.0.0.1:8000');
