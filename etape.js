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
MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8082, () => {
    console.log('connexion à la BD et on écoute sur le port 8082')
  })
})


app.get('/', function (req, res) {
   console.log('la route route get / = ' + req.url)
    fs.readFile('views/index.ejs', function (err, data) {
   if (err) return console.error(err);
   res.send(data.toString());
    });

    console.log("Program Ended");
    
})

app.get('/fichier', function (req, res) {
    console.log("je suis fichier");
   fs.readFile("public/text/collection_provinces.json", 'utf8', function (err, data) {
       res.send(data);
       //console.log(data);
    
   });

})

app.get('/provinces', function (req, res) {
    console.log("je suis provinces");
    var objProvinces;
    fs.readFile('public/text/collection_provinces.json', 'utf8', function (err, data){
        if(err){
            console.log("erreur de lecture");
            return 
        }
        
        res.render("index.ejs",{provinces: JSON.parse(data)})
    }); 
    
    
    
})

app.get('/collection',  (req, res) => {
   console.log('la route route get / = ' + req.url)
 
    var cursor = db.collection('provinces').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la BD
    res.render('index.ejs', {provinces: resultat})

    }) 
    

})

app.get('/ajouter', function (req, res) {
    console.log("je suis ajouter");
    var nb = (Math.random() *100 );
    db.collection('provinces').insert(
        {"code": "QC",
         "nom": "Québec",
         "capital": nb}
    )
    res.redirect('/collection')
})

app.get('/detruire', function (req, res) {
    console.log("je suis plusieurs");
    db.dropDatabase()
    res.redirect('/collection')
})

app.get('/plusieurs', function (req, res) {
    console.log("je suis plusieurs");
    db.collection("provinces").insertMany( [	
			{
			 "code": "NF" ,
			 "nom" : "Terre-Neuve",
			 "capital" : "St-john"
			},
			{
			  "code": "IPE",
			  "nom" : "Ile du Prince-Édouard ",
			  "capital" : "Charlottetown"
			},
			{
			  "code": "NS",
			  "nom" : "Nouvelle Écosse",
			  "capital" : "Halifax"
			},			
			{
			  "code": "NB",
			  "nom" : "Nouveau-Brunswick",
			  "capital" : "Fredericton"
			},
			{
			"code": "QC",  
			"nom" : "Québec",
			"capital" : "Québec"
			},
	 		{
			"code": "ON", 
			"nom" : "Ontario",
			"capital" : "Toronto"
			},
	 		{
			"code": "MA", 
			"nom" : "Manitoba",
			"capital" : "Winipeg"
			},
	 		{
			"code": "SK", 
			"nom" : "Saskatshewan",
			"capital" : "Regina"
			},
	 		{
			"code": "AL", 
			"nom" : "Alberta",
			"capital" : "Edmonton"
			},
			{
			  "code": "BC",
			  "nom" : "Colombie Britannique",
			  "capital" : "Victoria"
			},
			{
			  "code": "NU",
			  "nom" : "Nunavut",
			  "capital" : "Igaluit"
			},
			{
			  "code": "YT",
			  "nom" : "Yukon",
			  "capital" : "Whitehorse"
			},
			{
			  "code": "NT",
			  "nom" : "Territoire du Nord-Ouest",
			  "capital" : "Yellowknife"
			}

		]	
                                          )
    res.redirect('/collection')
})