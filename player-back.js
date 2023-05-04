var objElem = document.createElement("object"); //document.createElement("object");
objElem.type = "application/avplayer";

const queryString = location.search;
const params = new URLSearchParams(queryString);
const videoUrl = params.get("videoUrl");
const subtitle_url = params.get("caption");
// const subtitle_url =
//   "https://vod.chdrstatic.com/transcode/7d325650-d5d2-4fcb-9638-4a963a58e09e/7d325650-d5d2-4fcb-9638-4a963a58e09e.transcribe.vtt"; //params.get("caption");
console.log(videoUrl);

//Adjust the size and position of the media display area
//by changing the CSS style attribute
// objElem.style.left = 10 + "px";
// objElem.style.top = 20 + "px";
objElem.style.width = 1920 + "px";
objElem.style.height = 1080 + "px";
// objElem.style.width = 1080 + "px";
// objElem.style.height = 720 + "px";
objElem.controls = true;
var subtitlesEl = document.querySelector("#subtitles");
//Append the object element to your document
document.body.appendChild(objElem);

//https://d1akq03u1jevln.cloudfront.net/wp-gmg/20230328/64225b47e690725a5afab81e/t_f402fad17cdd41739a1867769b85121c_name_video/hlsv4_master.m3u8
//https://vod.field59.com/vod/_definst_/mp4:bimvid-storage/WDRB/1679932204-82df9de20ed72c412c1fad2eae45c3731f5577b3_fl9-720p.mp4/playlist.m3u8
try {
  webapis.avplay.open(videoUrl);
} catch (e) {
  console.log(">>> " + e);
}

var listener = {
  onbufferingstart: function () {
    console.log("Buffering start.");
  },

  onbufferingprogress: function (percent) {
    console.log("Buffering progress data : " + percent);

    ////////////////////////
    //objElem.setPercent(percent);

    /* Move 5 seconds back */
    // var back_button = document.getElementById("v-back"); /* Back button */
    // back_button.addEventListener(
    //   "click",
    //   function () {
    //     webapis.avplay.currentTime -= 5;
    //     console.log("backworkd 5 ");
    //   },
    //   false
    // );
    /////////////////////////
  },

  onbufferingcomplete: function () {
    console.log("Buffering complete.");
  },
  onstreamcompleted: function () {
    console.log("Stream Completed");
    webapis.avplay.stop();
    document.getElementById("progress-amount").style.width = "100%";
    window.history.back();
    console.log("### back to history");
  },

  oncurrentplaytime: function (currentTime) {
    console.log("Current playtime: " + currentTime);

    document.getElementById("total-time").innerHTML = webapis.avplay.formatTime(
      webapis.avplay.getDuration() / 1000
    );

    var duration = webapis.avplay.getDuration();
    if (duration > 0) {
      var percent = (currentTime / duration) * 100;
      document.getElementById("progress-amount").style.width = percent + "%";
      document.getElementById("current-time").innerHTML =
        webapis.avplay.formatTime(currentTime / 1000);
    }
  },

  onerror: function (eventType) {
    console.log("event type error : " + eventType);
  },

  onevent: function (eventType, eventData) {
    console.log("event type: " + eventType + ", data: " + eventData);
  },

  onsubtitlechange: function (duration, text, data3, data4) {
    // console.log("subtitleText: " + text);
    // console.log("subtitleText duration : " + duration);
    // console.log("subtitleText: data3 " + data3);
    // console.log("subtitleText: data4 " + data4);
    subtitlesEl.innerText = text;
  },
  ondrmevent: function (drmEvent, drmData) {
    console.log("DRM callback: " + drmEvent + ", data: " + drmData);
  },
};

webapis.avplay.setListener(listener);

// Base resolution of avplay
var avplayBaseWidth = 1920;

// Calculate ratio to base resolution
var ratio = avplayBaseWidth / window.document.documentElement.clientWidth;

// Convert rectangle to base resolution
var newLeft = 0 * ratio;
var newTop = 0 * ratio;
var newWidth = 1920 * ratio;
var newHeight = 1080 * ratio;

webapis.avplay.setDisplayRect(newLeft, newTop, newWidth, newHeight);

// format time in seconds to hh:mm:ss
webapis.avplay.formatTime = function (seconds) {
  var hh = Math.floor(seconds / 3600),
    mm = Math.floor(seconds / 60) % 60,
    ss = Math.floor(seconds) % 60;

  return (
    (hh ? (hh < 10 ? "0" : "") + hh + ":" : "") +
    (mm < 10 ? "0" : "") +
    mm +
    ":" +
    (ss < 10 ? "0" : "") +
    ss
  );
};

var bitRateString =
  "BITRATES=1000~20000|STARTBITRATE=HIGHEST|SKIPBITRATE=LOWEST";
webapis.avplay.setStreamingProperty("ADAPTIVE_INFO", bitRateString);
//webapis.avplay.setStreamingProperty("ADAPTIVE_INFO", "FIXED_MAX_RESOLUTION=1920x1080");

//webapis.avplay.prepare();

function downloadAndSetSubtitles() {
  var subtitleFileName = "subtitle" + new Date().getTime();
  var download = new tizen.DownloadRequest(
    subtitle_url,
    "wgt-private-tmp",
    subtitleFileName
  );

  // Subtitles needs to be on device to get loaded
  tizen.download.start(download, {
    oncompleted: function (id, fullPath) {
      tizen.filesystem.resolve(
        "wgt-private-tmp",
        function onResolveSuccess(dir) {
          var packageURI;
          try {
            packageURI = dir.toURI().substring(7);
            // Setting subtitles for the stream
            webapis.avplay.setExternalSubtitlePath(
              packageURI + "/" + subtitleFileName + ".vtt" //.smi
            );
          } catch (e) {
            // On 2015 different format of the URI is needed
            packageURI =
              dir.toURI().replace("file://", "") + "/" + fullPath.split("/")[1];
            webapis.avplay.setExternalSubtitlePath(packageURI);
          }
          if (!subtitlesOn) {
            webapis.avplay.setSilentSubtitle(true);
          }
        },
        function (e) {
          logger.error(e.message);
        },
        "r"
      );
    },
  });
}

var successCallback = function () {
  console.log("The media has finished preparing");
  webapis.avplay.play();
  downloadAndSetSubtitles();
};

var errorCallback = function () {
  console.log("The media has failed to prepare");
};

webapis.avplay.prepareAsync(successCallback, errorCallback);

//webapis.avplay.play();
//webapis.avplay.stop();

var value = tizen.tvinputdevice.getSupportedKeys();
var x = document.getElementById("pauseOverlay");
const pauseOverlay = function () {
  x.style.display = "block";
};
const pausePlayOverlay = function () {
  x.style.display = "none";
};

var init = function () {
  console.log("init() called");
  pausePlayOverlay(); // on video loading remove pause
  const stop = document.querySelector("#stop");
  // tizen.tvinputdevice.registerKeyBatch(['VolumeUp', 'VolumeDown','MediaPlay','MediaPlayPause','ArrowLeft','ArrowRight']);
  document.body.addEventListener("keydown", function (event) {
    tizen.tvinputdevice.registerKey("MediaPlayPause");
    tizen.tvinputdevice.registerKey("MediaPlay");
    tizen.tvinputdevice.registerKey("MediaStop");
    tizen.tvinputdevice.registerKey("MediaPause");
    tizen.tvinputdevice.registerKey("MediaRewind");
    tizen.tvinputdevice.registerKey("MediaFastForward");

    console.log("##################" + event.keyCode);
    switch (event.keyCode) {
      case 10252: //MediaPlayPause
        console.log("Play/ Paused");
        if (webapis.avplay.getState() === "PLAYING") {
          webapis.avplay.pause();
        } else if (webapis.avplay.getState() === "PAUSED") {
          webapis.avplay.play();
        }
        break;

      case 10009: //back
        console.log("Stoped");
        webapis.avplay.stop();
        //tizen.application.getCurrentApplication().hide();
        window.history.back();
        break;

      case 415: //MediaPlay
        console.log("plyed!");

        if (webapis.avplay.getState() === "IDLE") {
          webapis.avplay.prepare();
          webapis.avplay.play();
        } else if (webapis.avplay.getState() === "PAUSED") {
          webapis.avplay.play();
        }
        pausePlayOverlay();
        break;
      case 13: //Enter
        console.log("played!");
        webapis.avplay.play();
        break;

      case 19: //MediaPause
        console.log("paused!!!");
        pauseOverlay();
        webapis.avplay.pause();
        break;
      case 413: // MediaStop
        console.log("stopped!");

        webapis.avplay.stop();
        break;
      case 417: // MediaFastForward
        console.log("fast forward!");
        //webapis.avplay.jumpForward("3000");
        let ff = webapis.avplay.getCurrentTime() + 10000;
        let endTime = webapis.avplay.getDuration();
        try {
          if (ff < endTime) {
            webapis.avplay.seekTo(ff);
          }
        } catch (e) {
          console.log(e);
        }

        break;
      case 412: // MediaRewind
        console.log("rewind!");
        let rv = webapis.avplay.getCurrentTime() - 10000;
        try {
          if (webapis.avplay.getCurrentTime() > 10000) {
            webapis.avplay.seekTo(rv);
          }
        } catch (e) {
          console.log(e);
        }

        break;
      case 10133: // Menu 18
        if (menu) {
          closeNav();
        } else {
          openNav();
        }
        break;

      case 403: //ColorF0Red
        console.log("red color");
        break;
      case 37: //left arrow
        console.log("Left arrow pressed");
        break;
      case 38: //up arrow
        console.log("Up arrow pressed!");
        break;
      case 39: //right arrow
        console.log("right arrow pressed!");
        break;
      case 40: //down arrow
        console.log("Down arrow pressed!");
        break;
      case 447: //volum up
        console.log("Volum up");
        break;
      case 448: //Volum down
        console.log("Volume down");
        break;
      case 449: //volum mute
        console.log("volume muted!");
        break;
      default:
        console.log("Key code : " + e.keyCode);
        break;
    }
  });
};

window.onload = init;
