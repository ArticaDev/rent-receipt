const db = window.db;


$(function() {
    $("#person-info-form").click(function(e) {
        e.preventDefault();
        
        let value = $('#value').val()
        value = value.split("R$ ")[1]

        db.get('people')
            .push({ name:$('#name').val(), value:value, 
                    cpf:$('#cpf').val(), address:$('#address').val(), 
                    subject:$('#subject').val(), day:$('#day').val(), 
                    emitter:$('#emitter').val(), 
                    payments: {jan:false, feb:false, mar:false, apr:false, 
                    may:false, jun:false, jul:false, aug:false, sep:false, 
                    oct:false, nov:false, dec:false}
                })
            .write()
        
    });

});