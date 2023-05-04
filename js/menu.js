(function () {
  var categoryId;
  var menu = false;
  function openNav() {
    //document.getElementById("sidenav").style.width = "250px";
    const nav = document.getElementById("sidenav");
    document.querySelector(".main").style.marginLeft = "400px";

    nav.style.width = "400px";
    for (let i = 0; i < nav.children.length; i++) {
      if (nav.children[i].classList.contains("menu-focused")) {
        categoryId = nav.children[i].id;
        menu = true;
        break;
      }
    }
  }

  function closeNav() {
    document.getElementById("sidenav").style.width = "0";
    document.querySelector(".main").style.marginLeft = "0px";
    menu = false;
  }
})();
