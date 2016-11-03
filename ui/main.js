//counter code
var button = document.getElementById('counter');
button.onclick = function() {
    //make a request to the counter endpoint
    //capture the response and store it in the variable
    //render the variable in the correct span
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHtml = counter.toString();
};  