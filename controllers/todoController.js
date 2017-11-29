module.exports = function(app) {

    var bodyParser = require('body-parser');
    var mongoose = require('mongoose');
    //connect to db
    mongoose.connect('mongodb://test:test@ds125016.mlab.com:25016/todo');

    //create a schema - a blueprint
    var todoSchema = new mongoose.Schema({
        item: String
    });

    var Todo = mongoose.model('Todo', todoSchema);
    // var itemOne = Todo({item: 'get some stuff'}).save(function(err){
    //     if (err) throw err;
    //     console.log('item saved');
    // });


    var data = [{item: 'get milk'}, {item: 'get bent'},{item: 'get what'}];

    var urlencodedParser = bodyParser.urlencoded({extended: false});


    app.get('/todo', function(req,res) {
        //get data from mongo and pass it to the view
        Todo.find({},function (err,data){
            if (err) throw err;
            res.render('todo', {todos: data});
        })

    });

    app.post('/todo', urlencodedParser, function(req,res) {
        //get date from view and add it to mongo
        var newTodo = Todo(req.body).save(function (err,data) {
            res.json(data);
        })


    });

    app.delete('/todo/:item', function(req, res) {
        //delete items from mongo
        Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.json(data);
        });

        });





};