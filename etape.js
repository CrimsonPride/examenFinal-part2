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

// Créer un serveur
http.createServer( function (request, response) {  
   // On extrait de la requête «request» le chemin  qui nous donnera le nom de fichier
   var pathname = url.parse(request.url).pathname;
   
 
   console.log("pathname= " + pathname)
  
  // affiche le nom du fichier pour laquelle la requête a été généré
   

   // Lire par le «fs» (file système) le fichier de la requête 
   fs.readFile(pathname.slice(1), function (err, data) {
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
      }
      // transmet la reponse  
      response.write(data.toString());
   });   
}).listen(8082);

// message console
console.log('Serveur se trouvant à http://127.0.0.1:8082/');


