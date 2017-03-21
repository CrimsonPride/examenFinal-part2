const fs = require("fs");
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const app = express();
app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public
app.use(bodyParser.json())  // pour traiter les données JSON

/******REQUIRE*********/
var http = require('http');
var url = require('url');


/*******VARIABLES******/

/**************FONCTIONS**********/
/*****************ÉTAPE1*********************/
/*// Créer un serveur
http.createServer( function (request, response) {  
   // On extrait de la requête «request» le chemin  qui nous donnera le nom de fichier
   var pathname = url.parse(request.url).pathname;
   
 
   console.log("pathname= " + pathname)
  
  // affiche le nom du fichier pour laquelle la requête a été généré
   

   // Lire par le «fs» (file système) le fichier de la requête 
   fs.readFile("public/text/collection_provinces.json", function (err, data) {
      if (err) {
         console.log(err);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html ; charset=utf-8'});
      }else { 
         //Page found   
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});  
         
         // affiche le contenu du fichier dans la page HTML
         response.write(data.toString());
         console.log(data.toString());
      }
      // transmet la reponse  
      response.end();
   });   
}).listen(8082);

// message console
console.log('Serveur se trouvant à http://127.0.0.1:8082/');
*/

/***********ÉTAPE 2***************/

app.get('/', function (req, res) {
   console.log('la route route get / = ' + req.url)
    fs.readFile('views/index.ejs', function (err, data) {
   if (err) return console.error(err);
   res.write(data.toString());
    });

    console.log("Program Ended");
    
})

var server = app.listen(8082, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})