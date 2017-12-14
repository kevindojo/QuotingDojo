// ============== Always have, associated with packages installed ===========//
var express = require('express');
var app = express();

// ============== MONGOOSE ===========//
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotes'); // name of DataBase!!!!
        //show collections
mongoose.Promise = global.Promise;




var path = require('path');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));





// ============== use STYLE.CSS ===========//
app.use(express.static(path.join(__dirname, 'static')));

// ============== use static files?? ===========//
app.use(express.static(__dirname + "/static"));


// ============== Setting up ejs and our views folder ===========//
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');



// ============== Setting up MONGOOSE ===========//

var QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String,
    created_at: Date,
   },{
       timestamps: true
   });

mongoose.model("myQuote",QuoteSchema) // Setting this Schema in our Models as myQuote
var Quote = mongoose.model("myQuote") // We are retrieving this Schema from our Models, myQuote
   // "myQuote" is the collection within the database "quotes" BUT it looks like this "myquotes"





// ============== ROUTES here!!! ===========//

app.get('/', function(request, response){
    console.log('index page has loaded!!    22')
    response.render('index')

});

app.post('/quotes', function(request, response){
    console.log("POST DATA = ", request.body);
    var newQuote = new Quote({name: request.body.name, quote: request.body.quote, createdAt: request.body.createdAt});

    newQuote.save(function(err, result){
        if(err){
            console.log("something went wrong", err);
            response.send("something went wrong!")

        } else {
            console.log('success!', result);
            response.redirect('/quotes');
        }

    })

});

app.get('/quotes', function(request, response){
    Quote.find({}, function(err, quote){
        if(err){
            console.log(err);
        } else {
            response.render('quotes', {quotes_results: quote});
        }

    })
})



// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})