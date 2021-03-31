const db = window.db;
const querystring = require('querystring');


$(function() {

  let queryParams = querystring.parse(global.location.search);
  let begin = $.isEmptyObject(queryParams)? 0 : queryParams['?begin'];
  let numberToShow = $.isEmptyObject(queryParams)? 10 : queryParams['numberToShow'];

  $("#number-to-show").val(numberToShow);

  $('#number-to-show').change(function(){
    let numberToShow = $('#number-to-show option:selected').val();
    window.location.href=`index.html?begin=0&numberToShow=${numberToShow}`
  })


  function createPersonItem(Person) {

    let $row = $(`<tr>
        <td><a href="profile.html?name=${Person.name}">${Person.name}</a></td>
        <td>${Person.subject}</td>
        <td>${Person.address}</td>
        <td>${Person.emitter}</td>
        <td>${Person.day}</td>
        <td>
          <a class="btn btn-primary btn-sm d-none d-sm-inline-block"
            role="button" href="receipts.html?name=${Person.name}">
            <i class="fas fa-download fa-sm text-white-50"></i>
            Gerar Recibos</a>
        </td>
      </tr>`);

    return $row;

}

function updateView() {


      people = db.get('people').value(); 

    
    let numberOfRecords = people.length;

    if(begin != 0){
      
      let $previous = $(`<li class="page-item ">
      <a class="page-link" href="index.html?begin=${begin-numberToShow}&numberToShow=${numberToShow}" 
      aria-label="Previous">
      <span aria-hidden="true">« Anterior </span></a>`);

      $('.pagination').append($previous);
 
    }

    if(numberOfRecords-begin > numberToShow){
      
      let $next = $(`<li class="page-item">
      <a class="page-link" href="index.html?begin=${begin + numberToShow}&numberToShow=${numberToShow}"  aria-label="Next">
      <span aria-hidden="true">Proxima »</span></a>
      </li>`);

      $('.pagination').append($next);
 
    }

    people = people.slice(begin, begin + numberToShow);

    people.forEach(person => {

        let $personItem = createPersonItem(person);
        $('#people-table').append($personItem);

    });
}


updateView();


})