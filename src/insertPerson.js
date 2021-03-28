const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

$(function() {
    $("#person-info-form").click(function(e) {
        e.preventDefault();
        
        let value = $('#value').val()
        value = value.split("R$ ")[1]

        db.get('people')
            .push({ name:$('#name').val(), value:value, 
                    cpf:$('#cpf').val(), address:$('#address').val(), 
                    subject:$('#subject').val(), day:$('#day').val(), 
                    emitter:$('#emitter').val() 
                })
            .write()
        
    });

});