// original code from "Video Background Play Fix" a Firefox extension
// By JanH (https://addons.mozilla.org/en-US/firefox/user/11797710)
// Thanks for releasing it MIT

(function() {
  Object.defineProperties(document,
    {
      'hidden': {value: false},
      'webkitHidden': {value: false},
      'visibilityState': {value: 'visible'},
      'webkitVisibilityState': {value: 'visible'},
    }
  );

  window.addEventListener('visibilitychange', evt => {
    evt.stopImmediatePropagation();
    return false;
  }, true);

  window.addEventListener('webkitvisibilitychange', evt => {
    evt.stopImmediatePropagation();
    return false;
  }, true);

  // the following is from https://greasyfork.org/en/scripts/437123-youtube-background-playback-kiwi-browser
  const lactRefreshInterval = 5 * 60 * 1000; // 5 mins
  const initialLactDelay = 1000;

  // _lact stuff
  function waitForYoutubeLactInit(delay = initialLactDelay) {
    if (window.hasOwnProperty('_lact')) {
      window.setInterval(() => { window._lact = Date.now(); }, lactRefreshInterval);
    }
    else{
      window.setTimeout(() => waitForYoutubeLactInit(delay * 2), delay);
    }
  }
  waitForYoutubeLactInit();
})();
