// Select elements
const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const notesContainer = document.querySelector('.notes-container');
const addNoteButton = document.querySelector('.add-container button');

// Search notes
searchButton.addEventListener('click', function () {
    const searchText = searchInput.value.toLowerCase();

    const notes = document.querySelectorAll('.note-card');

    notes.forEach(function (note) {
        const title = note.querySelector('h2').textContent.toLowerCase();
        const content = note.querySelector('p').textContent.toLowerCase();

        if (title.includes(searchText) || content.includes(searchText)) {
            note.style.display = 'block';
        } else {
            note.style.display = 'none';
        }
    });
});

// Add a new note
addNoteButton.addEventListener('click', function () {
    const title = prompt('Enter your note title:');
    const content = prompt('Enter your note:');

    if (title && content) {
        const noteCard = document.createElement('div');
        noteCard.classList.add('note-card');

        noteCard.innerHTML = `
            <h2>${title}</h2>
            <p>${content}</p>
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
        `;

        notesContainer.appendChild(noteCard);

        addDeleteButton(noteCard);
        addEditButton(noteCard);
    }
});

// Delete note
function addDeleteButton(note) {
    const deleteButton = note.querySelector('.delete-btn');

    deleteButton.addEventListener('click', function () {
        note.remove();
    });
}

// Edit note
function addEditButton(note) {
    const editButton = note.querySelector('.edit-btn');

    editButton.addEventListener('click', function () {
        const title = prompt('Edit your title:', note.querySelector('h2').textContent);
        const content = prompt('Edit your note:', note.querySelector('p').textContent);

        if (title && content) {
            note.querySelector('h2').textContent = title;
            note.querySelector('p').textContent = content;
        }
    });
}

// Make existing notes work
document.querySelectorAll('.note-card').forEach(function (note) {
    addDeleteButton(note);
    addEditButton(note);
});