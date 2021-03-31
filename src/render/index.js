const db = window.db;

function createPersonItem(Person) {
  let $row = $(`<tr>
        <td><a href="profile.html?name=${Person.name}">${Person.name}</a></td>
        <td>${Person.subject}</td>
        <td>${Person.address}</td>
        <td>${Person.emitter}</td>
        <td>${Person.day}</td>
        <td>
          <a class="btn btn-primary btn-sm d-none d-sm-inline-block"
            role="button" href="receipts.html?name=${Person.name}">
            <i class="fas fa-download fa-sm text-white-50"></i>
            Gerar Recibos</a>
        </td>
      </tr>`);

  return $row;
}

function updateView(begin = 0, numberToShow = 10, query = "") {
  $("#people-table").empty();
  $(".pagination").empty();
  $("#number-to-show").val(numberToShow);

  people = db.get("people").value();

  if (query) {
    query = query.toLowerCase();
    people = people.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.address.toLowerCase().includes(query) ||
        p.subject.toLowerCase().includes(query) ||
        p.emitter.toLowerCase().includes(query)
    );
  }

  let numberOfRecords = people.length;
  if (begin != 0) {
    let $previous = $(`<li class="page-item ">
      <a class="page-link" onclick="updateView(${
        begin - numberToShow
      }, ${numberToShow});return false;"
      aria-label="Previous">
      <span aria-hidden="true">« Anterior </span></a>`);

    $(".pagination").append($previous);
  }

  if (numberOfRecords - begin > numberToShow) {
    let $next = $(`<li class="page-item">
      <a class="page-link" onclick="updateView(${
        begin + numberToShow
      }, ${numberToShow});return false;"  aria-label="Next">
      <span aria-hidden="true">Proxima »</span></a>
      </li>`);

    $(".pagination").append($next);
  }

  people = people.slice(begin, begin + numberToShow);

  people.forEach((person) => {
    let $personItem = createPersonItem(person);
    $("#people-table").append($personItem);
  });
}

$("#search").on("input", function () {
  updateView(0, 100, $("#search").val());
});

$("#number-to-show").change(function () {
  let numberToShow = $("#number-to-show option:selected").val();
  updateView(0, numberToShow);
});

$(function () {
  updateView();
});
