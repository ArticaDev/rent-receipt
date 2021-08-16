const db = window.db;
const querystring = require("querystring");

$(function() {

    let queryParams = querystring.parse(global.location.search);
    let name = queryParams["?name"];
    let Person = db.get("people").find({ id: name }).value();
  
    $(".display-name").append(name);
  
    for (month in Person.payments) {
      $("#" + month).prop("checked", Person.payments[month]);
    }
  
    $(".payment-status").click(function () {
      let month = $(this).attr("id");
      Person.payments[month] = $(this).is(":checked");
  
      db.get("people")
        .find({ id: name })
        .assign({ payments: Person.payments })
        .write();
    });

    $(".date").change(function(){
        if($(this).val()){
            $( "#print" ).text("Baixar todos entre as datas");
        }
    })

    $( "#print" ).click(function(e) {
        
        e.preventDefault();

        let initialDate = $("#initial-date").val();
        let finalDate = $("#final-date").val();
        let url;


        if(initialDate && finalDate){
            
            url=  `&initialDate=${initialDate}&finalDate=${finalDate}`;
        }
        else if(!(initialDate || finalDate)){

            let currentDate = new Date();
            let year = currentDate.getFullYear();
            let month = currentDate.getMonth();
            currentDate = `${year}-${month+1}`

            url = `&initialDate=${currentDate}&finalDate=${currentDate}`;

        }
        else{
            var chosenDate = initialDate ? initialDate : finalDate;
            url = `&initialDate=${chosenDate}&finalDate=${chosenDate}`;

        }

        window.location.href = `receipt.html${global.location.search}${url}`;

    });

});