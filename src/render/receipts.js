const db = window.db;
const querystring = require('querystring');

$(function() {

    let queryParams = querystring.parse(global.location.search);
    let name = queryParams['?name'];
    let Person = db.get('people').find({ name: name }).value();
    
    $(".display-name").append(name);

    for(month in Person.payments){
        $("#"+month).prop('checked', Person.payments[month]);
    }

    $(".payment-status").click(function() {

        let month = $(this).attr('id');
        Person.payments[month] = $(this).is(':checked');

        db.get('people')
        .find({ name: name })
        .assign({payments:Person.payments })
        .write()
        
    });

});