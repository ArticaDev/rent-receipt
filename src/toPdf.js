
$(function() {

    $(".date").change(function(){
        if($(this).val()){
            $( "#topdf" ).text("Baixar todos entre as datas");
        }
    })

    $( "#topdf" ).click(function(e) {
        
        e.preventDefault();

        let initialDate = $("#initial-date").val();
        let finalDate = $("#final-date").val();

        if(initialDate && finalDate){

            window.location.href = `receipt.html${global.location.search}&initialDate=${initialDate}&finalDate=${finalDate}`;

        }
        else if(!(initialDate || finalDate)){

            let currentDate = new Date();
            let year = currentDate.getFullYear();
            let month = currentDate.getMonth()+1;
            currentDate = `${year}-${month}`

            window.location.href = `receipt.html${global.location.search}&initialDate=${currentDate}&finalDate=${currentDate}`;

        }
        else{
            var chosenDate = initialDate ? initialDate : finalDate;
            window.location.href = `receipt.html${global.location.search}&initialDate=${chosenDate}&finalDate=${chosenDate}`;

        }

    });

});