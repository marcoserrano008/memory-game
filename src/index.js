function updateTitle(newTitle) {
  const currentTitleElement = document.getElementById("current-title");
  currentTitleElement.innerText = newTitle;
  document.querySelectorAll(".link__title--current").forEach((element) => {
    element.classList.remove("link__title--current");
  });
  currentTitleElement.classList.add("link__title--current");
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");

  const container = document.getElementById("container");
  container.classList.toggle("sidebar-visible");
  container.classList.toggle("sidebar-hidden");
}
