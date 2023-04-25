!(function () {
  var e,
    t = !1;
  function n() {
    (document.getElementById("sidenav").style.width = "0"),
      (document.querySelector(".main").style.marginLeft = "0px"),
      (t = !1);
  }
  var i = {
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
  async function r(e = "") {
    let t = document.getElementById("spinner");
    t.removeAttribute("hidden");
    var n = await fetch(e, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    return t.setAttribute("hidden", ""), n.json();
  }
  function l() {
    return new Promise((e, t) => {
      var n = [];
      r("https://prodman.whizti.com/api/publication/116?limit=0")
        .then((t) => {
          let i = {
            weather_url_whiz:
              t.response.config.weather_url +
              "?zip_code=" +
              t.response.config.zipcode,
          };
          for (let r = 0; r < t.response.categories.length; r++)
            if (
              void 0 !== t.response.categories[r].uri &&
              "" !== t.response.categories[r].uri
            ) {
              let l = {
                id: t.response.categories[r].id,
                name: t.response.categories[r].label,
                icon_uri: t.response.categories[r].icon_uri,
              };
              n.push(l);
            }
          n.push(i), e(n);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }
  async function s(e = "") {
    let t = await l()
      .then((e) => e)
      .catch((e) => {
        console.log(e);
      });
    e || (e = t[0].id);
    let n = await t.find((t) => {
        let n = t.id === e;
        return n;
      }),
      i;
    n &&
      ((document.body.style.backgroundImage = " "),
      (i = n.icon_uri.replace(" ", "%20"))),
      console.log(i);
    let s = t[t.length - 1].weather_url_whiz,
      c = await ((a = s),
      new Promise(function (e, t) {
        r(a)
          .then((t) => {
            e({
              location: t.rss.channel.item.location,
              temperatuer: t.rss.channel.item.temperature,
              conditiontext: t.rss.channel.item.conditiontext,
              icon: t.rss.channel.item.conditioniconlarge,
            });
          })
          .catch((e) => {
            console.log(e);
          });
      })),
      o = document.getElementById("weather");
    (o.innerHTML = `<div width="100px;">${c.location} </div>
    <div style="float:right;"> ${c.temperatuer} \u00B0
    <span style="width:80px;"><img src="${c.icon}"/></span></div>`),
      i
        ? (document.body.style.backgroundImage = "url(" + i + ")")
        : (document.body.style.backgroundColor = "#111");
    var a,
      d = document.getElementById("pagelist");
    if (((d.innerHTML = ""), void 0 !== e)) {
      let h = document.createElement("div");
      (h.className = "flex_container"),
        h.setAttribute("id", e),
        r("https://prodman.whizti.com/api/category/" + e)
          .then(function (t) {
            for (let n = 0; n <= t.response.content.length; n++)
              t.response.content[n].icon_uri
                ? (h.innerHTML += `
                <div class="item" name="${e}" id="${t.response.content[n].uri}" >
                <a href="video.html?videoUrl=${t.response.content[n].uri}">
                
                  <img src="${t.response.content[n].icon_uri}" width="300"  />
                  
                  
                
                <a>
                <div class="title"> ${t.response.content[n].title}</div>
                </div>`)
                : (h.innerHTML += `<div class="item" > ${t.response.content[n].title}</div>`);
          })
          .catch((e) => {}),
        d.appendChild(h);
    }
  }
  window.onload = function () {
    document.addEventListener("keydown", function (r) {
      switch ((tizen.tvinputdevice.registerKey("Menu"), r.keyCode)) {
        case 10133:
          t
            ? n()
            : (function n() {
                let i = document.getElementById("sidenav");
                (document.querySelector(".main").style.marginLeft = "340px"),
                  (i.style.width = "340px");
                for (let r = 0; r < i.children.length; r++)
                  if (i.children[r].classList.contains("menu-focused")) {
                    (e = i.children[r].id), (t = !0);
                    break;
                  }
              })();
          break;
        case 37:
          (i.parent = document.getElementById("pagelist")),
            (i.key = i.parent.firstElementChild);
          let l = i.key.className,
            c = document.querySelector("." + l),
            o = c.children,
            a = 0;
          for (let d = 0; d < o.length; d++)
            if ("item focused" === c.children[d].className) {
              a = d;
              break;
            }
          for (let h = 0; h < o.length; h++)
            if (h === a) {
              if (a <= 0) break;
              c.children[h].classList.remove("focused"),
                a--,
                c.children[a].classList.add("focused"),
                c.children[a].scrollIntoView(!0);
              break;
            }
          break;
        case 38:
          let u = document.getElementById("sidenav"),
            f = u.children,
            m = 0;
          for (let p = 0; p < f.length; p++)
            if ("menu-focused" === u.children[p].className) {
              m = p;
              break;
            }
          for (let g = 0; g < f.length; g++)
            if (g === m) {
              if (m <= 0) break;
              u.children[g].classList.remove("menu-focused"),
                m--,
                u.children[m].classList.add("menu-focused"),
                s((e = u.children[m].id)),
                u.children[m].scrollIntoView(!0);
              break;
            }
          break;
        case 39:
          t && n(),
            (i.parent = document.getElementById("pagelist")),
            (i.key = i.parent.firstElementChild);
          let $ = i.key.className;
          catid = i.key.id;
          let y = document.querySelector("." + $),
            v = y.children,
            k = 0;
          for (let b = 0; b < v.length; b++)
            if ("item focused" === y.children[b].className) {
              k = b;
              break;
            }
          for (let w = 0; w < v.length - 1; w++)
            if (w === k) {
              y.children[w].classList.remove("focused"),
                k++,
                y.children[k].classList.add("focused"),
                y.children[k].scrollIntoView(!0);
              break;
            }
          break;
        case 40:
          console.log("####>> down Arrow");
          let L = document.getElementById("sidenav"),
            E = L.children,
            I = 0;
          for (let _ = 0; _ < E.length; _++)
            if ("menu-focused" === L.children[_].className) {
              I = _;
              break;
            }
          for (let B = 0; B < E.length; B++)
            if (B === I) {
              if (I === E.length - 1) break;
              L.children[B].classList.remove("menu-focused"),
                I++,
                L.children[I].classList.add("menu-focused"),
                s((e = L.children[I].id)),
                L.children[I].scrollIntoView(!0);
              break;
            }
          break;
        case 13:
          break;
        case 10009:
          tizen.application.getCurrentApplication().hide();
          break;
        default:
          console.log("Key code : " + r.keyCode);
      }
    });
    let r;
    l()
      .then((e) => {
        let t = document.getElementById("sidenav");
        (r = e[0].id),
          e.forEach((e) => {
            let n = document.createElement("div");
            void 0 !== e.id &&
              (n.setAttribute("id", e.id), (n.innerHTML += ` ${e.name} `)),
              t.appendChild(n);
          });
      })
      .catch((e) => {
        console.log(e);
      }),
      s();
  };
})();
