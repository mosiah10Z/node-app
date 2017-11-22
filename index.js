var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var url = require('url');
var calculateRate = require('./calculateRate.js');

//use for local
var pg = require("pg"); // This is the postgres database connection module.
const connectionString = "postgres://postgres:secret@localhost:5432/node";

//use for heroku
// const { Client } = require('pg');
//
// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
// });


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


//tennis node app
app.get('/tennisTodo', function(request, response) {
    getStroke(request, response);
});

app.get('/post/:id', (req, res) => {
    // find the post in the `posts` array
    const post = posts.filter((post) => {
        return post.id == req.params.id
    })[0]

    // render the `post.ejs` template with the post content
    res.render('post', {
        author: post.title,
        title: post.title,
        body: post.text
    })
})

function getStroke(request, response) {
    // First get the stroke's id


    //console.log("Query parameters: " + JSON.stringify(requestUrl.query));

    // TODO: Here we should check to make sure we have all the correct parameters

    // First get the person's id
    var id = 1


    // TODO: It would be nice to check here for a valid id before continuing on...

    // use a helper function to query the DB, and provide a callback for when it's done
    getStrokeFromDb(id, function(error, result) {
        // This is the callback function that will be called when the DB is done.
        // The job here is just to send it back.

        // Make sure we got a row with the person, then prepare JSON to send back
        if (error || result == null) {
            response.status(500).json({success: false, data: error});
        } else {
            var person = result[0];
            var params = result;
            response.render('home', {posts: result})
            // console.log("Found result: " + JSON.stringify(result.rows))
            //response.status(200).json(result[0]);
        }
    });
}

function getStrokeFromDb(id, callback) {
    console.log("Getting person from DB with id: " + id);

    //uncomment for local. comment out for heroku
     var client = new pg.Client(connectionString);


    client.connect(function(err) {
        if (err) {
            console.log("Error connecting to DB: ")
            console.log(err);
            callback(err, null);
        }

        var sql = "SELECT name from stroke";
        var params = [id];
        console.log(params.length);

        var query = client.query(sql, function(err, result) {
            // we are now done getting the data from the DB, disconnect the client
            client.end(function(err) {
                if (err) throw err;
            });

            if (err) {
                console.log("Error in query: ")
                console.log(err);
                callback(err, null);
            }

            console.log("Found result: " + JSON.stringify(result.rows));


            // call whatever function the person that called us wanted, giving it
            // the results that we have been compiling
            callback(null, result.rows);
        });
    });

} // end of getPersonFromDb


//tennis node app


app.get('/', function (request, response) {
    response.render('pages/index')
    console.log("hello");
});

app.get('/cool', function (request, response) {
    response.send(cool());
});

app.get('/getResult', function (request, response) {
    handleResult(request, response);
});

function handleResult(request, response) {
    var requestUrl = url.parse(request.url, true);

    console.log("Query parameters: " + JSON.stringify(requestUrl.query));

    // TODO: Here we should check to make sure we have all the correct parameters

    var mailType = requestUrl.query.typeofmail;
    var weight = Number(requestUrl.query.weight);


    var rate = calculateRate(mailType, weight).toFixed(2);
    var params = {
        mT: mailType,
        wT: weight,
        rT: rate
    };
    response.render('pages/result', params);
}





app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

