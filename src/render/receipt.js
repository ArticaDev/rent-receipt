const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const querystring = require("querystring");

function insertReceiptInfo(person) {
  let personPage = $(`.${person.name}`);
  personPage.find(".name").text(person.name);
  personPage.find(".cpf").text(person.cpf);
  personPage.find(".value").text("R$ " + person.value);
  personPage.find(".written-value").text(`${person.value} reais`);
  personPage
    .find(".subject-address")
    .text(`${person.subject} no endereço ${person.address}`);
  personPage.find(".emitter").text(person.emitter);
  personPage.find(".day").text(`Brasília, dia ${person.day} `);
}

$(function () {
  let queryParams = querystring.parse(global.location.search);
  let initialDate = queryParams["initialDate"]+"-01";
  let finalDate = queryParams["finalDate"]+"-28";

  let name = queryParams["?name"];
  
  if("?name" in queryParams){
    Person = db.get("people").find({ name: name }).value();
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
  let dateText;

  for (
    var d = new Date(initialDate);
    d <= new Date(finalDate);
    d.setMonth(d.getMonth() + 1)
  ) {
    month = months[d.getMonth() + 1];
    year = d.getFullYear();

    dateText = `de ${month} de ${year}`;

    if (pageCount == 0) {
      $(".month-year").text(dateText);
    } else {
      $(".a4").first().clone().appendTo("body");
      $(".a4").eq(pageCount).find(".month-year").text(dateText);
    }

    pageCount++;
  }

  $(".a4").wrapAll(`<div class = '${Person.name}'></div>`);

  insertReceiptInfo(Person);

  if (!("?name" in queryParams)) {
    let all_people = db.get("people").value().slice(1);
    all_people.forEach(function (person) {
      $(`.${Person.name}`).clone().prop("class", person.name).appendTo("body");

      insertReceiptInfo(person);
    });
  }
});
