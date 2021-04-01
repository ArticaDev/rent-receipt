const db = window.db;

$(function () {
  $(".payment-status").each(function () {
    let month = $(this).attr("id");
    let allPaid = true;
    let all_payments = db.get("people").map("payments").value();
    all_payments.forEach(function (receipt) {
      if (!receipt[month]) allPaid = false;
    });
    $("#" + month).prop("checked", allPaid);
  });

  $(".payment-status").click(function (e) {
    e.preventDefault();
  });

  $(".date").change(function () {
    if ($(this).val()) {
      $("#print").text("Baixar todos entre as datas");
    }
  });

  $("#print").click(function (e) {
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
        currentDate = `${year}-${month}`

        url = `&initialDate=${currentDate}&finalDate=${currentDate}`;

    }
    else{
        var chosenDate = initialDate ? initialDate : finalDate;
        url = `&initialDate=${chosenDate}&finalDate=${chosenDate}`;

    }

    window.location.href = `receipt.html?all=True${url}`;
  });
});
