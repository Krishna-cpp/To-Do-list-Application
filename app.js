$(document).ready(function() {
    let tasks = [];
    let filter = 'all';

    function renderTasks() {
        $('#task-list').empty();
        let filteredTasks = tasks.filter(task => {
            if (filter === 'all') return true;
            if (filter === 'completed') return task.completed;
            if (filter === 'active') return !task.completed;
        });
        filteredTasks.forEach((task, index) => {
            let checked = task.completed ? 'checked' : '';
            let completedClass = task.completed ? 'completed' : '';
            $('#task-list').append(`
                <li class="list-group-item ${completedClass}">
                    <input type="checkbox" class="toggle-completed mr-2" data-index="${index}" ${checked}>
                    <span class="task-text">${task.text}</span>
                    <input type="text" class="edit-input form-control form-control-sm d-none" value="${task.text}"/>
                    <button class="btn btn-sm btn-secondary edit-btn mr-2">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn">Delete</button>
                    <button class="btn btn-sm btn-success save-btn d-none mr-2">Save</button>
                    <button class="btn btn-sm btn-warning cancel-btn d-none">Cancel</button>
                </li>
            `);
        });
    }

    function addTask(text) {
        tasks.push({text: text, completed: false});
        renderTasks();
    }

    $('#task-form').submit(function(e) {
        e.preventDefault();
        let taskText = $('#task-input').val().trim();
        if (taskText !== '') {
            addTask(taskText);
            $('#task-input').val('');
        }
    });

    $('#task-list').on('click', '.toggle-completed', function() {
        let index = $(this).data('index');
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    });

    $('#task-list').on('click', '.delete-btn', function() {
        let index = $(this).closest('li').find('.toggle-completed').data('index');
        tasks.splice(index, 1);
        renderTasks();
    });

    $('#task-list').on('click', '.edit-btn', function() {
        let li = $(this).closest('li');
        li.find('.task-text, .edit-btn, .delete-btn').addClass('d-none');
        li.find('.edit-input, .save-btn, .cancel-btn').removeClass('d-none');
        li.find('.edit-input').focus();
    });

    $('#task-list').on('click', '.cancel-btn', function() {
        let li = $(this).closest('li');
        li.find('.edit-input, .save-btn, .cancel-btn').addClass('d-none');
        li.find('.task-text, .edit-btn, .delete-btn').removeClass('d-none');
    });

    $('#task-list').on('click', '.save-btn', function() {
        let li = $(this).closest('li');
        let index = li.find('.toggle-completed').data('index');
        let newText = li.find('.edit-input').val().trim();
        if (newText !== '') {
            tasks[index].text = newText;
            renderTasks();
        }
    });

    $('#filter-all').click(function() {
        filter = 'all';
        renderTasks();
    });
    $('#filter-completed').click(function() {
        filter = 'completed';
        renderTasks();
    });
    $('#filter-active').click(function() {
        filter = 'active';
        renderTasks();
    });

    renderTasks(); // Initial render
});
