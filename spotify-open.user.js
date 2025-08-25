// ==UserScript==
// @name         Spotify open in app
// @author       lundylizard
// @description  Redirects open.spotify.com links to the desktop app and closes the tab
// @version      1
// @license      MIT License
// @match        http://open.spotify.com/*
// @match        https://open.spotify.com/*
// @run-at       document-start
// @noframes
// ==/UserScript==

(function() {
    'use strict';
    var data = document.URL.match(/[\/\&](track|playlist|album|artist|show|episode)\/([^\&\#\/\?]+)/i);
    if (data) {
        window.location.href = 'spotify:' + data[1] + ':' + data[2];
        window.close();
    }
})();
