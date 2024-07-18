function updateTitle(newTitle) {
    const currentTitleElement = document.getElementById('current-title');
    currentTitleElement.innerText = newTitle;
    document.querySelectorAll('.link__title--current').forEach(element => {
        element.classList.remove('link__title--current');
    });
    currentTitleElement.classList.add('link__title--current');
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('sidebar--active');
}
const hamburgerBtn = document.getElementById('hamburger-btn');
const sidebar = document.getElementById('sidebar');

hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar--active');
});

