function load_data(url, callback) {
    fetch(url)  // URL of the API or resource
        .then(response => response.json())  // Convert the response to JSON
        .then(data => callback(data))    // Handle the data from the response
        .catch(error => console.error('Error:', error));  // Handle any errors
}

function showPosts(data) {

    show_modal();
    update_modal_data(data);
    
}

function getUserPosts(user) {
    let url = `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`;
    window.selected_user = user;
    load_data(url, showPosts)
}

function buildTable(data) {
    let filter_users = document.getElementById("filter-users"),
        searchTerm = filter_users ? filter_users.value:'';
    if (searchTerm.length) {
        data = data.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.email.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    let table       = document.getElementById("tbl"),
        caption     = table.querySelector('caption'),
        thead       = table.querySelector('thead'),
        tbody       = table.querySelector('tbody'),
        tfoot       = table.querySelector('tfoot'),
        thead_tr    = document.createElement('tr'),
        tfoot_tr    = document.createElement('tr'),
        tfoot_td    = document.createElement('td'),
        fields      = Object.keys(data[0]).map(key => key);
        // clear
        thead.innerHTML  = ''; 
        tbody.innerHTML  = ''; 
        tfoot.innerHTML  = '';
        // Build header and footer
        fields.forEach((field, index) => {
            // HEADER
            if (window.initially_shown.includes(field)) {
                let th =  document.createElement('th');
                th.textContent = field;
                thead_tr.appendChild(th);
            }
            // tfoot
            let label = document.createElement('label'),
                input = document.createElement('input'),
                span = document.createElement('span');
            label.setAttribute('for', field);
            input.setAttribute('type', 'checkbox');
            input.setAttribute('id', field);
            input.setAttribute('name', field);
            input.setAttribute('value', field);
            input.addEventListener('click', (event) => {
                let checked = Object.values(document.querySelectorAll('input[type="checkbox"]')).filter(checkbox => checkbox.checked),
                    checked_values = checked.map(value => value.value);
                window.initially_shown = checked_values;
                load_data('https://jsonplaceholder.typicode.com/users', buildTable);
            });
            tfoot_td.setAttribute("colspan", window.initially_shown.length);
            if(window.initially_shown.includes(field)) {
                input.setAttribute('checked', true);
            }
            span.textContent = 'Show '+field;
            label.appendChild(input)
            label.appendChild(span)
            tfoot_td.appendChild(label)
        });
        thead.appendChild(thead_tr);
        tfoot_tr.appendChild(tfoot_td);
        tfoot.appendChild(tfoot_tr);
        if (data) {
            // Build table body
            data.forEach(obj => {
                let tr_body = document.createElement('tr');
                Object.entries(obj).forEach(([key, value])=> {


                    if (window.initially_shown.includes(key)) {
                        let td = document.createElement('td');
                        if (typeof value == 'object') {
                            if ('name' in value) {
                                td.textContent = value.name;
                            } else if ('street' in value) {
                                td.textContent = value.street + ', ' + value.city;
                            }
                        } else {
                            td.textContent = value;
                        }
                        tr_body.appendChild(td);
                    }
                });
                tr_body.addEventListener("click", () => getUserPosts(obj))
                tbody.appendChild(tr_body);
            });
        }
    
}

function show_modal(user) {
    modal.style.display = "block";
    loading_container.classList.remove('d-none');

    safeClear(h2);
    safeClear(posts_container);
    if (window.selected_user) {
        h2.textContent = 'Posts of ' + window.selected_user.name;
        window.selected_user = null;
    } else {
        h2.textContent = 'Posts';
    }
}
function update_modal_data(data) {

    setTimeout(() => {
        safeClear(posts_container);
        if (data.length) {
            let ul = document.createElement('ul');
            data.forEach((post) => {
                let li = document.createElement('li');
                li.textContent = post.title;
                ul.appendChild(li);
            });
            loading_container.classList.add('d-none');
            posts_container.appendChild(ul);
        }
    }, 450);
}

function safeClear(el) {
    if (el) {
        el.innerHTML = '';
    } else {
      // Try again in a short delay
        setTimeout(() => safeClear(el), 100);
    }
  }
  