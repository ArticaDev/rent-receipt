const db = window.db;
const querystring = require("querystring");

$(function () {
  let queryParams = querystring.parse(global.location.search);
  let name = queryParams["?name"];
  let Person = db.get("people").find({ name: name }).value();
  $("#title").text(Person.name);
  $("#name").val(Person.name);
  $("#cpf").val(Person.cpf);
  $("#value").val(Person.value);
  $("#address").val(Person.address);
  $("#emitter").val(Person.emitter);
  $("#day").val(Person.day);
  $("#subject").val(Person.subject);


  let sucess = $(`<div
      class="alert alert-success alert-dismissible fade show mt-5"
      role="alert">
      Alterações gravadas com sucesso.
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`)

  $("#update-person-info").click(function (e) {
    e.preventDefault();

    let value = $("#value").val();
    value = value.split("R$ ")[1];

    db.get("people")
      .find({ name: name })
      .assign({
        name: $("#name").val(),
        value: value,
        cpf: $("#cpf").val(),
        emitter: $("#emitter").val(),
        day: $("#day").val(),
      })
      .write();

    $("#person-form").append(sucess);
  });

  $("#update-subject-info").click(function (e) {
    e.preventDefault();

    db.get("people")
      .find({ name: name })
      .assign({ subject: $("#subject").val(), address: $("#address").val() })
      .write();
    
      $("#subject-form").append(sucess);

  });

  $("#remove-person").click(function (e) {
    e.preventDefault();

    db.get("people").remove({ name: name }).write();

    window.location.href = "index.html";
  });
});
