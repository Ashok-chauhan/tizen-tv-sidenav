(function () {
  console.log("Executing main / loaded");
  /**
   * Handle input from remote
   */
  var categoryId;
  function openNav() {
    //document.getElementById("sidenav").style.width = "250px";
    const nav = document.getElementById("sidenav");
    nav.style.width = "250px";
    nav.firstElementChild.classList.add("focused");
    categoryId = nav.firstElementChild.id;
    console.log("in function cat id" + categoryId);
  }

  function closeNav() {
    document.getElementById("sidenav").style.width = "0";
  }

  function registerKeyHandler() {
    document.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case 37: //left arrow
          console.log("#### >> left Arrow");

          openNav();
          console.log("left arrwo cat id" + categoryId);
          break;
        case 38: //up key
          console.log("#### >> up Arrow");

          const upNav = document.getElementById("sidenav");
          const childCcount = upNav.children;
          let counter = 0;

          console.log("#### out of for " + counter);
          for (let i = 0; i < childCcount.length; i++) {
            if (upNav.children[i].className === "focused") {
              counter = i;
              console.log("#### inside loop " + counter);
              break;
            }
          }

          for (let i = 0; i < childCcount.length; i++) {
            if (i === counter) {
              console.log("lcounter " + counter + " --" + childCcount.length);
              if (counter <= 0) break;
              upNav.children[i].classList.remove("focused");
              counter--;

              upNav.children[counter].classList.add("focused");
              categoryId = upNav.children[counter].id;
              console.log("category id " + categoryId);
              ////////////////////////////////////////////////////////////////

              // leftKey.children[lcounter].scrollIntoView(true);
              ////////////////////////////////////////////////////////////////
              break;
            }
          }

          break;

        case 39: //right arrow
          const Nav = document.getElementById("sidenav");
          let chldCcount = Nav.children;
          console.log("####>> right arrow");
          for (let i = 0; i < chldCcount.length; i++) {
            if (Nav.children[i].className === "focused") {
              Nav.children[i].classList.remove("focused");
            }
          }
          closeNav();
          break;
        case 40: //down key
          console.log("####>> down Arrow");

          let leftKey = document.getElementById("sidenav");
          let lcount = leftKey.children;
          let lcounter = 0;

          console.log("#### out of for " + lcounter);
          for (let i = 0; i < lcount.length; i++) {
            if (leftKey.children[i].className === "focused") {
              lcounter = i;
              console.log("#### inside loop " + lcounter);
              break;
            }
          }

          for (let i = 0; i < lcount.length; i++) {
            if (i === lcounter) {
              console.log("lcounter " + lcounter + " --" + lcount.length);
              if (lcounter === lcount.length - 1) break;
              leftKey.children[i].classList.remove("focused");
              lcounter++;

              leftKey.children[lcounter].classList.add("focused");
              categoryId = leftKey.children[lcounter].id;
              console.log("category id " + categoryId);
              ////////////////////////////////////////////////////////////////

              // leftKey.children[lcounter].scrollIntoView(true);
              ////////////////////////////////////////////////////////////////
              break;
            }
          }
          break;
        case 13: //OK button
          // var keyName = keys.key.id + keys.key.innerHTML,
          //   index;
          // if ((index = keys.registeredKeys.indexOf(keyName)) !== -1) {
          //   console.log("OK - unregister key: " + keyName);
          //   keys.registeredKeys.splice(index, 1);
          //   tizen.tvinputdevice.unregisterKey(keyName);
          // } else {
          //   console.log("OK - register key: " + keyName);
          //   keys.registeredKeys.push(keyName);
          //   tizen.tvinputdevice.registerKey(keyName);
          // }
          break;
        case 10009: //RETURN button
          tizen.application.getCurrentApplication().hide();
          break;
        default:
          console.log("Key code : " + e.keyCode);
          break;
      }
    });
  }

  /**
   *
   */
  // var keys = {
  //   parent: null,
  //   key: null,
  //   registeredKeys: [],
  //   focus: function () {
  // 	this.key.classList.add("focused");
  //   },
  //   blur: function () {
  // 	this.key.classList.remove("focused");
  //   },
  // };

  /**
   * Start the application once loading is finished
   */
  window.onload = function () {
    registerKeyHandler();
    console.log("kye registering");
  };
})();
