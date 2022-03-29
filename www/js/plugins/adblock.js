(function() {
  if (window.adblock === "loaded") return;

  window.adblock = "loaded";
  console.log("loading adblock");

  function interceptXHR(state, url, data) {
    if (url.includes('youtube.com/watch?v=') && state === 'response') try {
      const resp = data.replace(/adPlacements/, 'odPlaements');
      return resp;
    } catch (ex) {
      return data;
    }

    if (state === 'open' && data) {
      if (
        url.includes('youtubei/v1/log_event') ||
        url.includes('play.google.com') ||
        url.includes('api/stats/atr') ||
        url.includes('doubleclick.net')
      ) {
        return false;
      }
    }

    return data;
  }

  if (XMLHttpRequest.addXHRInterceptor) {
    XMLHttpRequest.addXHRInterceptor(interceptXHR);
  }
})();
