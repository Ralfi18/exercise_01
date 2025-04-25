window.initially_shown = ['name', 'email'];
window.selected_user = null;
document.addEventListener("DOMContentLoaded", function() {
    var toggle_btn = document.querySelectorAll(".toggle-btn"),
        main = document.getElementById("main"),
        filter_users = document.getElementById("filter-users"),
        pathname = window.location.pathname;
    if (toggle_btn.length) {
        toggle_btn.forEach((btn, key) => {
            btn.addEventListener('click', (e) => {
                if(main) {
                    main.classList.toggle('collapsed');
                }
            });
        });
    }
    load_data('https://jsonplaceholder.typicode.com/users', buildTable);
    filter_users.addEventListener('keyup', (e) => {
        load_data('https://jsonplaceholder.typicode.com/users', buildTable);  
    });
    filter_users.addEventListener('paste', (e) => {
        load_data('https://jsonplaceholder.typicode.com/users', buildTable);  
    });
});

