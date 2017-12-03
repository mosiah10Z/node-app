console.log("sanity check, JS script is loaded in client browser");

// function for building an HTML string to append later
function buildTodo(todo) {
    var todoHtml = '<div class="todo" id="'
        + todo._id + '"><h2>' + todo.title
        + '</h2><p>' + todo.description
        + '</p><button class="btn btn-danger delete-todo">Delete</button></div>';

    return todoHtml;
}

$(document).ready(function(){

    $('form').on('submit', function(event){
        event.preventDefault();
        event.stopPropagation();
        console.log(event.target);
        var formData = $(event.target).serialize();


        // var item = $('form input');
        // var todo = {item: item.val()};

        $.ajax({
            type: 'POST',
            url: '/todo',
            data: formData,

        }).done (function (data) {

            console.log(data);
            var todo = buildTodo(data);
            $('.todo-container').append(todo);
        })
            .fail(function(data) {
                console.log("post route failed:", data);
            })



    });

    $('li').on('click', function(){
        var item = $(this).text().replace(/ /g, "-");
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + item,
            success: function(data){
                //do something with the data via front-end framework
                location.reload();
            }
        });
    });

});

var updateList = function (result) {
    var li = document.getElementById("fh");
    li.innerHtml = result.item;
}