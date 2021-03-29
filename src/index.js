const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

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

function updateView() {

    people = db.get('people');
    people.value().forEach(person => {

        let $personItem = createPersonItem(person);
        $('#people-table').append($personItem);

    });
}


updateView();