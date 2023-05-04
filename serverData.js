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

    // if (nav.children[1].id) {
    //   nav.children[1].classList.add("focused");
    //   categoryId = nav.children[1].id;
    //   menu = true;
    // }

    // if (nav.firstElementChild.id) {
    //   nav.firstElementChild.classList.add("focused");
    //   categoryId = nav.firstElementChild.id;
    //   console.log("in function cat id" + categoryId);
    // }
  }

  function closeNav() {
    document.getElementById("sidenav").style.width = "0";
    document.querySelector(".main").style.marginLeft = "0px";
    menu = false;
  }

  function registerKeyHandler() {
    //document.addEventListener("keydown", function (e) {
    document.body.addEventListener("keydown", function (e) {
      tizen.tvinputdevice.registerKey("Menu");
      switch (e.keyCode) {
        case 10133: // Menu 18
          //case 18: // Menu 18
          console.log(">>> Menu pressed!");
          if (menu) {
            closeNav();
          } else {
            openNav();
          }
          break;

        case 37: //left arrow
          keys.parent = document.getElementById("pagelist");
          keys.key = keys.parent.firstElementChild;

          let leftkeyName = keys.key.className;

          let left_Key = document.querySelector("." + leftkeyName + "");
          let leftcount = left_Key.children;
          let leftcounter = 0;
          for (let i = 0; i < leftcount.length; i++) {
            if (left_Key.children[i].className === "item focused") {
              leftcounter = i;
              break;
            }
          }

          for (let i = 0; i < leftcount.length; i++) {
            if (i === leftcounter) {
              if (leftcounter <= 0) break;
              left_Key.children[i].classList.remove("focused");
              leftcounter--;

              left_Key.children[leftcounter].classList.add("focused");
              left_Key.children[leftcounter].scrollIntoView(true);

              break;
            }
          }

          break;
        case 38: //up key
          const upNav = document.getElementById("sidenav");
          const childCcount = upNav.children;
          let counter = 0;

          for (let i = 0; i < childCcount.length; i++) {
            if (upNav.children[i].className === "menu-focused") {
              counter = i;

              break;
            }
          }

          for (let i = 0; i < childCcount.length; i++) {
            if (i === counter) {
              if (counter <= 0) break;
              upNav.children[i].classList.remove("menu-focused");
              counter--;

              upNav.children[counter].classList.add("menu-focused");
              categoryId = upNav.children[counter].id;

              videoList(categoryId);
              upNav.children[counter].scrollIntoView(true);

              break;
            }
          }

          break;

        case 39: //right arrow
          if (menu) {
            closeNav();
          }

          keys.parent = document.getElementById("pagelist");
          keys.key = keys.parent.firstElementChild;

          let arrowkeyName = keys.key.className;

          catid = keys.key.id;

          let arrowKey = document.querySelector("." + arrowkeyName + "");

          let count = arrowKey.children;
          let right_counter = 0;
          for (let i = 0; i < count.length; i++) {
            if (arrowKey.children[i].className === "item focused") {
              right_counter = i;
              break;
            }
          }

          for (let i = 0; i < count.length - 1; i++) {
            if (i === right_counter) {
              arrowKey.children[i].classList.remove("focused");
              right_counter++;
              arrowKey.children[right_counter].classList.add("focused");
              arrowKey.children[right_counter].scrollIntoView(true);

              break;
            }
          }

          //////

          break;
        case 40: //down key
          console.log("####>> down Arrow");

          let leftKey = document.getElementById("sidenav");
          let lcount = leftKey.children;
          let lcounter = 0;

          for (let i = 0; i < lcount.length; i++) {
            if (leftKey.children[i].className === "menu-focused") {
              lcounter = i;

              break;
            }
          }

          for (let i = 0; i < lcount.length; i++) {
            if (i === lcounter) {
              if (lcounter === lcount.length - 1) break;
              leftKey.children[i].classList.remove("menu-focused");
              lcounter++;

              leftKey.children[lcounter].classList.add("menu-focused");
              categoryId = leftKey.children[lcounter].id;

              videoList(categoryId);
              leftKey.children[lcounter].scrollIntoView(true);

              break;
            }
          }

          break;
        case 13: //OK button
          console.log("enter / ok button");
          const videoUrl = document
            .getElementsByClassName("item focused")
            .item("id").id;

          const caption = document
            .getElementsByClassName("item focused")
            .item("caption")
            .getAttribute("caption");
          // const caption =
          //   "https://vod.chdrstatic.com/transcode/7d325650-d5d2-4fcb-9638-4a963a58e09e/7d325650-d5d2-4fcb-9638-4a963a58e09e.transcribe.vtt";

          console.log(document.getElementsByClassName("item focused"));
          console.log(">>>" + videoUrl);
          let ext = videoUrl.split(".").pop();
          if (ext !== ".m3u8") window.location.href = "file:///index.html";
          window.location.href =
            "file:///video.html?videoUrl=" + videoUrl + "&caption=" + caption;
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

  var keys = {
    parent: null,
    key: null,
    registeredKeys: [],
    focus: function () {
      this.key.classList.add("focused");
    },
    blur: function () {
      this.key.classList.remove("focused");
    },
  };

  ////////////////////////////////////////////////////////////
  async function getData(url = "") {
    // Default options are marked with *
    const spinner = document.getElementById("spinner");
    spinner.removeAttribute("hidden");
    var response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    spinner.setAttribute("hidden", "");
    return response.json(); // parses JSON response into native JavaScript objects
  }

  // getting weather
  function weather(url) {
    return new Promise(function (resolve, reject) {
      getData(url)
        .then((data) => {
          let response = {
            location: data.rss.channel.item.location,
            temperatuer: data.rss.channel.item.temperature,
            conditiontext: data.rss.channel.item.conditiontext,
            icon: data.rss.channel.item.conditioniconlarge,
          };
          resolve(response);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function category_id() {
    return new Promise((resolve, reject) => {
      var catId = [];
      getData("https://prodman.whizti.com/api/publication/326?limit=0")
        .then((data) => {
          let weather = {
            weather_url_whiz:
              data.response.config.weather_url +
              "?zip_code=" +
              data.response.config.zipcode,
          };

          for (let i = 0; i < data.response.categories.length; i++) {
            if (
              data.response.categories[i].uri !== undefined &&
              data.response.categories[i].uri !== ""
            ) {
              //filter parent categories
              const cats = {
                id: data.response.categories[i].id,
                name: data.response.categories[i].label,
                icon_uri: data.response.categories[i].icon_uri,
              };
              catId.push(cats);
            }
          }
          catId.push(weather);
          resolve(catId);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  async function videoList(categoryId = "") {
    const categoryid = await category_id()
      .then((category) => category)
      .catch((err) => {
        console.log(err);
      });
    if (!categoryId) {
      categoryId = categoryid[0].id;
    }

    const image = await categoryid.find((category) => {
      const uri = category.id === categoryId;
      return uri;
    });
    let bgImage;
    if (image) {
      document.body.style.backgroundImage = " ";
      bgImage = image.icon_uri.replace(" ", "%20");
    }

    console.log(bgImage);
    const weather_url = categoryid[categoryid.length - 1].weather_url_whiz;
    const weatherData = await weather(weather_url);
    const weatherElement = document.getElementById("weather");
    weatherElement.innerHTML = `<div width="100px;">${weatherData.location} </div>
    <div style="float:right;"> ${weatherData.temperatuer} \u00B0
    <span style="width:80px;"><img src="${weatherData.icon}"/></span></div>`;

    if (bgImage) {
      //const bgdiv = document.getElementById("bg");
      //document.body.style.opacity = "0.2";
      document.body.style.backgroundImage = "url(" + bgImage + ")";
      //bgdiv.style.backgroundImage = "url(" + bgImage + ")";
    } else {
      document.body.style.backgroundColor = "#11111180";
    }

    var elemContent = document.getElementById("pagelist");
    elemContent.innerHTML = "";

    if (categoryId !== undefined) {
      let div = document.createElement("div");
      div.className = "flex_container";
      div.setAttribute("id", categoryId);

      getData("https://prodman.whizti.com/api/category/" + categoryId)
        .then(function (data) {
          for (let i = 0; i <= data.response.content.length; i++) {
            if (data.response.content[i].icon_uri) {
              div.innerHTML += `
                <div class="item" caption="${
                  data.response.content[i].caption
                }" id="${data.response.content[i].uri}" >
                <a href="video.html?videoUrl=${
                  data.response.content[i].uri
                }&caption=${data.response.content[i].caption}">
                
                  <img src="${
                    data.response.content[i].icon_uri
                  }" width="300"  />
                  
                  
                
                <a>
                <div class="title"> ${truncateString(
                  data.response.content[i].title,
                  40
                )}</div>
                </div>`;
              //<span class="title"> ${data.response.content[i].title}</span>
            } else {
              div.innerHTML += `<div class="item" > ${data.response.content[i].title}</div>`;
            }
          }
        })
        .catch((error) => {
          //console.log(error);
        });
      //elemContent.appendChild(catName);
      elemContent.appendChild(div);
    }
  }

  function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

  window.onload = function () {
    registerKeyHandler();

    let firstCategory;
    category_id()
      .then((data) => {
        const sidebar = document.getElementById("sidenav");
        firstCategory = data[0].id;
        data.forEach((cid) => {
          let categoryList = document.createElement("div");
          if (cid.id !== undefined) {
            categoryList.setAttribute("id", cid.id);

            categoryList.innerHTML += ` ${cid.name} `;
          }
          sidebar.appendChild(categoryList);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    videoList();
    openNav();
    closeNav();
  };
})();
