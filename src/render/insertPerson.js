const db = window.db;
const nanoid = window.nanoid;

$(function() {


    $("#person-info-form").click(function(e) {
        e.preventDefault();
    
        if (!$(".user").valid())return;

        $(".alert").show("fast");
        setTimeout(function () {
            $('.alert').hide("fast");
        }, 1500);

        let value = $('#value').val()
        // value = value.split("")[1]

        db.get('people')
            .push({ 
                    id: nanoid(10),
                    name:$('#name').val(), value:value, 
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