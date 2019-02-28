var mysql = require('mysql');
var express = require('express'); 
var app = express();

var port = process.env.PORT || 3001;  
var con = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "",
  port: 3306,
  database: "beer_database",
});

con.connect(function(err) {
  if (err){ 
    console.log("NO CONNECTION");
    throw err;
  }
  
  else 
    console.log("Connected!");
});


app.get('/beerTable', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  con.query("SELECT beers.beer_name, beers.abv, beers.style_name, beers.descript, breweries.brewery_name FROM beers INNER JOIN breweries ON beers.brewery_id = breweries.id",
  function(err, results){
    if (err)
      throw err;

    else{
        res.send(results)    
    }
  });
});

app.listen(port);
console.log("Listening on port " + port);