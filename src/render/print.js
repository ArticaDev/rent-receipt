
$(function() {

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
            let month = currentDate.getMonth()+1;
            currentDate = `${year}-${month}`

            url = `&initialDate=${currentDate}&finalDate=${currentDate}`;

        }
        else{
            var chosenDate = initialDate ? initialDate : finalDate;
            url = `&initialDate=${chosenDate}&finalDate=${chosenDate}`;

        }


        let currentPage = location.pathname.split('/').slice(-1)[0];
        if(currentPage === "receasdasdasdiptspage.html"){
            url = `receipt.html?allReceipts=1${url}`;
        }else{
            url = `receipt.html${global.location.search}${url}`
        }

        window.location.href = url;

    });

});