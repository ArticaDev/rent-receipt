const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const querystring = require('querystring');

$(function() {

    let queryParams = querystring.parse(global.location.search);
    let initialDate = queryParams['initialDate'];
    let finalDate = queryParams['finalDate'];

    let name = queryParams['?name'];
    let Person = db.get('people').find({ name: name }).value();

    let months = ["Janeiro","Fevereiro","Março","Abril","Maio",
    "Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

    let month;
    let year;

    $( ".receipt" ).clone().appendTo( ".a4" );

    let pageCount = 0;
    let dateText;

    for (var d = new Date(initialDate); d <= new Date(finalDate); d.setMonth(d.getMonth() + 1)) {

        month = months[d.getMonth()];
        year = d.getFullYear();

        dateText = `Brasília, dia ${Person.day} de ${month} de ${year}`;

        if(pageCount==0){
            $('.date').text(dateText);
        }else{
            $( ".a4" ).first().clone().appendTo( "body" );
            $('.a4').eq(pageCount).find(".date").text(dateText);
        }

        pageCount++;

    }


    $('.name').text(Person.name);
    $('.cpf').text(Person.cpf);
    $('.value').text("R$ " + Person.value);
    $('.written-value').text(`${Person.value} reais`);
    $('.subject-address').text(`${Person.address} no endereço ${Person.subject}`);
    $('.emitter').text(Person.emitter);

});