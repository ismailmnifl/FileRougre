let menu = document.querySelector("#menu-icon");
let sidenavbar = document.querySelector(".MYside-navbar");
let content = document.querySelector(".content");

menu.onclick = () => {
	sidenavbar.classList.toggle("active");
	content.classList.toggle("active");
};
