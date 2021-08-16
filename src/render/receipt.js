const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const querystring = require("querystring");
const extenso = require('extenso');
var slugify = require('slugify');

function insertReceiptInfo(person) {
  let personPage = $(`[class="${slugify(person.name)}"]`);

  if("cpf" in person && person.cpf != ""){
    personPage.find(".name").text(`${person.name} - CPF/CNPJ nº ${person.cpf}`);
  }else{
    personPage.find(".name").text(person.name);
  }
  
  personPage.find(".value").text("R$ " + person.value);
  personPage.find(".written-value").text(extenso(`${person.value}`, { mode: 'currency' }));
  personPage
    .find(".subject-address")
    .text(`${person.subject} no endereço ${person.address}`);
  personPage.find(".emitter").text(person.emitter);
  personPage.find(".day").text(`${person.day}`);
}

$(function () {
  let queryParams = querystring.parse(global.location.search);

  let initialDate = queryParams["initialDate"].split("-");
  let finalDate = queryParams["finalDate"].split("-");
  
  //setting month to 0-11 format, instead of 1-12
  initialDate[1] -= 1;
  finalDate[1] -= 1;

  let name = queryParams["?name"];

  if("?name" in queryParams){
    Person = db.get("people").find({ id: name }).value();
    console.log(Person.emitter);

  }else{
    Person = db.get("people").take(1).value()[0];
  }

  let months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  let month;
  let year;

  $(".receipt").clone().appendTo(".a4");

  let pageCount = 0;

  for (
    var d = new Date(... initialDate);
    d <= new Date(... finalDate);
  ) {
    month = months[d.getMonth()];
    year = d.getFullYear();

    d.setMonth(d.getMonth()+1);

    mextMonth = months[d.getMonth()];
    nextYear = d.getUTCFullYear();

    if (pageCount > 0) {
      $(".a4").first().clone().appendTo("body");
    } 
    
    $(".a4").eq(pageCount).find(".month-year").text(`de ${month} de ${year}`);
    $(".a4").eq(pageCount).find(".currentMonth").text(` de ${month}`);
    $(".a4").eq(pageCount).find(".YearAndNextMonth").text(` de ${mextMonth} de ${nextYear}`);

    pageCount++;
  }

  $(".a4").wrapAll(`<div class = '${slugify(Person.name)}'></div>`);

  insertReceiptInfo(Person);

  if (!("?name" in queryParams)) {
    let all_people = db.get("people").value().slice(1);
    all_people.forEach(function (person) {
      $(`.${slugify(Person.name)}`).clone().prop("class", slugify(person.name)).appendTo("body");
      
      insertReceiptInfo(person);
    });
  }
});
