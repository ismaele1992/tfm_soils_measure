
var MongoClient = require('mongodb').MongoClient;

var express = require('express'),
app = express();

app.engine('html', require('ejs').renderFile);
app.set('/js', express.static(__dirname + "/js"));

var objeto = {};

function conectarBD(res, callback){

	MongoClient.connect("mongodb://192.168.1.64:27017/materiales", function(err, db){

		if(!err){
			console.log("We are connected");
			var variables = db.collection('VariablesAmbientales');
			variables.find({'fecha' : {$gt : "17/04/2017 09:46:00"} } ).toArray(function (errs, everything){
			
				everything.forEach(function(ething){
					console.log(ething.fecha + " " + ething.temp + " " + ething.hum);
				});
				
				objeto = everything;
				//Callback utilizado para realizar la consulta.
				callback(res);				
			});
			db.close();
		}
	});
}

function callback(res){
	res.json(objeto);
	console.log("Consulta realizada.");
}

var obj = { "foo" : "bar" };

//conectarBD();

app.get('/', function(req, res) {

	console.log("Recibido");
	res.contentType('application/json');
	res.setHeader("Access-Control-Allow-Origin", "*");
	
	conectarBD(res, callback);
	
	
}); 
app.listen(8000);

