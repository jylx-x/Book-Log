let myLibrary = [];

function book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary () {
    if (getBook() == false) {
        warningPrompt();
    } else {
        addBookToTable();
        clearFields();
    }
}

function getBook() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let status = document.getElementById("status").value;

    if (title && author && pages) {
        myLibrary.push(new book(title, author, pages, status));
    } else {
        return false;
    }
}

function clearFields() {
    document.getElementById("form").reset();
}

function warningPrompt() {
    window.alert("Not all fields have been filled.");
}

//Table

function addBookToTable () {
    let table = document.querySelector("table");
    let tr = document.createElement("tr");
    let newBook = myLibrary.length - 1;

    tr.id = "book" + newBook;
    tr.className = "book";
    table.append(tr);

    addBookInfo(newBook);
    addOptions(tr.id)
}

function addOptions (bookID) {
    let bookNumber = "#" + bookID;
    let book = document.querySelector(bookNumber);
    let td = document.createElement("td");

    td.id = "options-container-" + bookID
    book.appendChild(td);

    addDeleteButton(bookID);
    addChangeStatus(bookID);
}

function addDeleteButton(bookID) {
    let container= "#options-container-" + bookID;
    let optionContainer = document.querySelector(container);
    let deleteButton = document.createElement("button");

    deleteButton.className = "delete";
    deleteButton.id = "delete-" + bookID;
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
        deleteBook(bookID);
    }

    optionContainer.appendChild(deleteButton);
}

function addBookInfo(newBook) {
    let bookNumber = "#book" + newBook;
    let book = document.querySelector(bookNumber);

    for (const property in myLibrary[newBook]) {
        if (property === "read") {
            let td = document.createElement("td");
            td.id = "status-book" + newBook;
            td.textContent = myLibrary[newBook][property];
            book.append(td);
        }else {
            let td = document.createElement("td");
            td.textContent = myLibrary[newBook][property];
            book.append(td);
        }}
}

function deleteBook(bookID) {
    let book = document.getElementById(bookID);
    book.remove();
}

function deleteAll() {
    let confirmation = deleteConfirmationPrompt();

    if (confirmation) {  
        let allBooks = document.getElementsByClassName("book");
        
        while (allBooks.length > 0) {
            allBooks[0].remove();
        }
    }
}

function deleteConfirmationPrompt () {
    return window.confirm("Are you sure want to erase your library?")
}

//Change Status

function addChangeStatus(bookID) {
    let optionsContainer = "#options-container-" + bookID;
    let book = document.querySelector(optionsContainer);
    let statusButton = document.createElement("Select");
    statusButton.className = "change"
    statusButton.id = "options-" + bookID

    book.appendChild(statusButton);

    let x = "#" + statusButton.id
    let status = document.querySelector(x);

    status.options[0] = new Option ("Plan to ead", "Plan to Read");
    status.options[1] = new Option ("Currently Reading", "Currently Reading");
    status.options[2] = new Option ("Finished", "Finished");

    status.addEventListener("change", () => {
        let currentStatus = getStatusChange(event);
        changeStatus(book, bookID, currentStatus);
    })
}

function getStatusChange (event) {
    return event.target.value;
}

function changeStatus (book, bookID, currentStatus) {
    removeStatus(bookID);

    let td = document.createElement("td");
    td.textContent = currentStatus;
    td.id = "status-" + bookID;


    let optionsContainer = "options-container-" + bookID;
    let parent = document.getElementById(bookID);
    let elementBefore = document.getElementById(optionsContainer);

    parent.insertBefore(td, elementBefore);
}

function removeStatus (bookID) {
    let bookStatus = "status-" + bookID;
    let targetStatus = document.getElementById(bookStatus);
    targetStatus.remove();
}

