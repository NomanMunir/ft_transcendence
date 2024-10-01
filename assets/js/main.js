document.addEventListener('DOMContentLoaded', function () {
    const mainContent = document.querySelector('#content');
    mainContent.innerHTML = genNavBar();
    mainContent.innerHTML += genHomePage();

});