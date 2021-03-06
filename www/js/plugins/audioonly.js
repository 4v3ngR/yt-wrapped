(function() {
  if (window.audioonly === "loaded") return;
  window.audioonly = "loaded";
  console.log("loading audioonly");

  function getBestThumbnail(thumbnails) {
    let res = { width: 0 };
    for (let i = 0; i < thumbnails.length; i++) {
      if (thumbnails[i].width > res.width) {
        res = thumbnails[i];
      }
    }
    return res;
  }

  function forceAudioOnly(state, url, data) {
    if (url.includes('youtubei/v1/player') && state === 'response') try {
      var obj = JSON.parse(data);
      if (obj.videoDetails) {
        const player = document.querySelector("ytmusic-player");
        if (player) {
          let cover = player.querySelector("img#cover-image");
          if (!cover) {
            const img = player.querySelector("img#img");
            if (img) {
              cover = document.createElement("img");
              cover.setAttribute("id", "cover-image");
              cover.setAttribute("class", "style-scope yt-img-shadow");
              cover.setAttribute("style", "object-fit: scale-down;");
              img.parentNode.replaceChild(cover, img);
            }
          }

          const songimg = player.querySelector("div#song-image");
          if (songimg) songimg.setAttribute("style", "background: black;");

          const thumbnail = getBestThumbnail(obj.videoDetails.thumbnail.thumbnails).url;
          if (cover) cover.setAttribute("src", thumbnail);
          player.removeAttribute("video-mode_");
        }
        obj.videoDetails.musicVideoType = "MUSIC_VIDEO_TYPE_ATV";
        data = JSON.stringify(obj);
      }
      return data;
    } catch (ex) {}
    return data;
  }

  if (XMLHttpRequest.addXHRInterceptor) {
    XMLHttpRequest.addXHRInterceptor(forceAudioOnly);
  }
})();
