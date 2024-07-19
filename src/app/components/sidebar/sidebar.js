document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".sidebar__item");

    items.forEach(item => {
        item.addEventListener("click", function() {
            items.forEach(t => {
                t.setAttribute("aria-selected", "false");
            });
            this.setAttribute("aria-selected", "true");
        });
    });
});
