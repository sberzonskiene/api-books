const kingBooksEl = document.getElementById("king-books");
const loaderEl = document.getElementById("loader");
const tableEl = document.getElementById("table");

tableEl.classList.add('hide');
loaderEl.classList.add('show');

fetch('https://stephen-king-api.onrender.com/api/books')
.then((resp) => resp.json())
.then((data) => {

    tableEl.classList.remove('hide')
    loaderEl.classList.remove('show')

    data.data.forEach((book) => {
        kingBooksEl.insertAdjacentHTML('beforeend', 
            `<tr data=bookid="${book.id}">
                <td>${book.Title}</td>
                <td>${book.Year}</td>
                <td>${book.Publisher}</td>
                <td>${book.ISBN}</td>
                <td>${book.Pages}</td>
                <td>${book.Notes[0] ? book.Notes.join("; ") : 'No aditional notes'}</td>
            </tr>`
        );
    });
})
.catch((error) => console.log(error));

kingBooksEl.addEventListener('click', (e) => {
    const tr = e.target.parentElement;
    const villainsRowEl = document.getElementById("villains-row");
    
    if(villainsRowEl && villainsRowEl !== tr) {
        kingBooksEl.removeChild(villainsRowEl);
    }

    if (villainsRowEl !== tr) {
    const bid = tr.dataset.bookid;
    fetch('https://stephen-king-api.onrender.com/api/book/' + bid)
    .then(res => res.json())
    .then((data) => {
        tr.insertAdjacentHTML(
            'afterend',
            `<tr id="villains-row">
                <td colspan="2">${data.data.Title}</td>
                <td colspan="4">${data.data.villains.map((villain) => villain.name).join("<br/>")}</td>
            </tr>`
        );
    }) 
    .catch((err) => console.log(err));
    }
});

