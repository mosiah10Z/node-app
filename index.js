var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var url = require('url');

// var pg = require("pg"); // This is the postgres database connection module.
// const connectionString = "postgres://postgres:secret@localhost:5432/node";

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


//tennis node app
app.get('/tennisTodo', function(request, response) {
    getStroke(request, response);
});

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
        if (error || result == null || result.length != 1) {
            response.status(500).json({success: false, data: error});
        } else {
            var person = result[0];
            response.status(200).json(result[0]);
        }
    });
}

function getStrokeFromDb(id, callback) {
    console.log("Getting person from DB with id: " + id);

    var client = new pg.Client(connectionString);

    client.connect(function(err) {
        if (err) {
            console.log("Error connecting to DB: ")
            console.log(err);
            callback(err, null);
        }

        var sql = "SELECT id, improvTitle, improvText FROM forehand WHERE id = $1::int";
        var params = [id];

        var query = client.query(sql, params, function(err, result) {
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



function calculateRate(mailType, weight) {
    if (mailType == "Letters (Stamped)") {
        console.log("LS");
        if (weight <= 1) {
            return 0.49;
        }
        if (weight <= 2) {
            return 0.70;
        }
        if (weight <= 3) {
            return 0.91;
        }
        if (weight <= 3.5) {
            return 1.12;
        }

    }

    if (mailType == "Letters (Metered)") {
        console.log("LM");
        if (weight <= 1) {
            return 0.46;
        }
        if (weight <= 2) {
            return 0.67;
        }
        if (weight <= 3) {
            return 0.88;
        }
        if (weight <= 3.5) {
            return 1.09;
        }
    }

    if (mailType == "Large Envelopes (Flats)") {
        console.log("LE");
        if (weight <= 1) {
            return 0.98;
        }
        if (weight <= 2) {
            return 1.19;
        }
        if (weight <= 3) {
            return 1.40;
        }
        if (weight <= 4) {
            return 1.61;
        }
        if (weight <= 5) {
            return 1.82;
        }
        if (weight <= 6) {
            return 2.03;
        }
        if (weight <= 7) {
            return 2.24;
        }
        if (weight <= 8) {
            return 2.45;
        }
        if (weight <= 9) {
            return 2.66;
        }
        if (weight <= 10) {
            return 2.87;
        }
        if (weight <= 11) {
            return 3.08;
        }
        if (weight <= 12) {
            return 3.29;
        }
        if (weight <= 13) {
            return 3.50;
        }



    }

    if (mailType == "Parcels") {
        console.log("P");
        if (weight <= 1) {
            return 3.00;
        }
        if (weight <= 2) {
            return 3.00;
        }
        if (weight <= 3) {
            return 3.00;
        }
        if (weight <= 4) {
            return 3.00;
        }
        if (weight <= 5) {
            return 3.16;
        }
        if (weight <= 6) {
            return 3.32;
        }
        if (weight <= 7) {
            return 3.48;
        }
        if (weight <= 8) {
            return 3.64;
        }
        if (weight <= 9) {
            return 3.80;
        }
        if (weight <= 10) {
            return 3.96;
        }
        if (weight <= 11) {
            return 4.19;
        }
        if (weight <= 12) {
            return 4.36;
        }
        if (weight <= 13) {
            return 4.53;
        }
    }



}

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
