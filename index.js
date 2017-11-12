var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
    response.render('pages/index')
    console.log("hello");
});

app.get('/cool', function (request, response) {
    response.send(cool());
});

app.get('/getResult', function (request, response) {
    response.render('pages/result');
    calculateRate('Letters(Stamped)', 3);
});


function calculateRate(mailType, weight) {
    if (mailType == "Letters(Stamped)") {
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
