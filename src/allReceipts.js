const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

$(function() {

    let all_payments = db.get("people").map("payments").value()

    $('.payment-status').each(function() {
        
        let month = $(this).attr('id');
        let allPaid = true;
        all_payments.forEach(function(receipt){
            if(!receipt[month])allPaid=false;
        });
        $("#"+month).prop('checked', allPaid);

    });

    $(".payment-status").click(function(e) {
        e.preventDefault();
    });

});