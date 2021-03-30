const db = window.db;
const electron = require('electron');
const fs = require('fs');

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

    $(".date").change(function(){
        if($(this).val()){
            $( "#print" ).text("Baixar todos entre as datas");
        }
    })

    const BrowserWindow = electron.remote.BrowserWindow;
    var options = {
        marginsType: 1,
        pageSize: 'A4',
        printBackground: true,
        printSelectionOnly: false,
        landscape: false
    }

    $( "#print" ).click(function(e) {

        e.preventDefault();

        let initialDate = $("#initial-date").val();
        let finalDate = $("#final-date").val();
        let url;

        if(initialDate && finalDate){
            
            url= `&initialDate=${initialDate}&finalDate=${finalDate}`;
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
        

        let all_names = db.get("people").map("name").value();
        all_names.forEach(function(name){
            let win = new BrowserWindow({
                show: false,
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false,
                    enableRemoteModule: true                        
                     }
                   });
            
             
            win.loadURL(`file://${__dirname}/../template/receipt.html?name=${name + url}$`);
    
            win.webContents.on('did-finish-load', () => {
                win.webContents.printToPDF(options).then(data => {
                    fs.writeFile(`recibos/${name}.pdf`, data, function (err) {
                        if (err) console.log(err);
                        win.close();
                    });
                }).catch(error => {
                    console.log(error);
                    win.close();
                });
            });
        });


    });



});