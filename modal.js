let modal = document.getElementById("modal"),
    close_modal = document.getElementById("close_modal"),
    modal_body = document.querySelector(".modal-body"),
    h2 = modal_body.querySelector("h2"),
    loading_container = document.querySelector(".loading-container"),
    posts_container = document.getElementById("posts");

close_modal.addEventListener('click', () => {
    modal.style.display = "none";
    // posts_container.innerHtml = "";
    safeClear(posts_container);
});
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
