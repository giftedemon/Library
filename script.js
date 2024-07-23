const books = document.querySelector('.books');
const showDialogButton = document.querySelector('.add');
const dialog = document.querySelector('dialog');
const cancelDialog = document.querySelector('.cancel-button');
const addBookButton = document.querySelector('.book-form-button');
const addBookForm = document.querySelector('#book-form');

const myLibrary = [
    new Book('Jujutsu Kaisen', 'Akutami Gege', 'My favourite manga', '1111', true, 'yes'),
    new Book('One Piece', 'Oda', 'Great Manga', '5000', true, 'yes'),
    new Book('Isekai', 'Many Unfortunately', 'Repetitive', '0', false, 'no'),
];

// ---------------------- DOM --------------------------------------------

// Dialog showing and canceling
showDialogButton.addEventListener('click', () => dialog.showModal());

cancelDialog.addEventListener('click', () => closeDialog());

// Handle adding book
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newBookImported = importNewBook();

    addBookToLibrary(
        newBookImported.title,
        newBookImported.author,
        newBookImported.description,
        newBookImported.pages,
        newBookImported.read,
        newBookImported.peak
    );

    showBooks();

    closeDialog();
});

// Handle completing/not completing the book
books.addEventListener('click', (e) => {
    if (e.target.classList.contains('complete-button')) {
        e.target.classList.toggle('completed');

        e.target.textContent = e.target.classList.contains('completed') ? 'Completed' : 'Not completed';

        e.target.parentNode.parentNode.querySelector('.read').textContent = e.target.classList.contains('completed')
            ? 'Read'
            : 'Not read';
    } else if (e.target.classList.contains('delete')) {
        myLibrary.splice(Number(e.target.parentNode.parentNode.getAttribute('data-index')), 1);
        showBooks();
    }
});

// ----------------------- FUNCTIONS -------------------------------------

// functions
function Book(title, author, description, pages, read, peak) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.pages = pages;
    this.read = read;
    this.peak = peak;
}

function addBookToLibrary(title, author, description, pages, read, peak) {
    const newBook = new Book(title, author, description, pages, read, peak);

    myLibrary.push(newBook);
}

const importNewBook = () => {
    const allInputs = addBookForm.querySelectorAll('input');
    const textArea = addBookForm.querySelector('textarea');
    const newBook = {};

    allInputs.forEach((element) => {
        if (element.getAttribute('type') === 'checkbox') {
            newBook[element.getAttribute('name')] = element.checked;
        } else {
            newBook[element.getAttribute('name')] = element.value;
        }
    });

    newBook.description = textArea.value ? textArea.value : '';

    return newBook;
};

const closeDialog = () => {
    dialog.close();
    addBookForm.reset();
};

const showBooks = () => {
    books.innerHTML = ``;

    myLibrary.forEach((book, index) => {
        books.innerHTML += `
        <div class="book" data-index="${index}">
                <div class="book__title-author">
                    <h3>${book.title}</h3>
                    <h4>${book.author}</h4>
                </div>
                <div class="book__description">
                    ${book.description}
                </div>
                <div class="book__details">
                    <span>${book.pages} pages</span>
                    <span class='read'>${book.read ? 'Read' : 'Not read'}</span>
                    <span>${book.peak === 'yes' ? 'Peak' : 'Not Peak'}</span>
                </div>

                <div class="book__buttons"> 
                <button class="book__button complete-button ${book.read ? 'completed' : ''}">${
            book.read ? 'Completed' : 'Not completed'
        }</button>

                <button class="book__button delete">Delete</button>
                </div>
            </div>
        `;
    });
};

// main code
showBooks();
