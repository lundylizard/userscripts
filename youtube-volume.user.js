// ==UserScript==
// @name         YouTube 1% Volume
// @namespace    https://youtube.com/
// @version      2
// @description  Adjust YouTube volume by 1% using arrow keys with a custom overlay over the video
// @author       lundylizard
// @match        *://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let popup = null;
    let hideTimeout = null;

    function createPopup() {
        popup = document.createElement('div');
        popup.id = 'custom-volume-popup';
        popup.style.position = 'absolute';
        popup.style.zIndex = '9999';
        popup.style.padding = '2px 2px';
        popup.style.borderRadius = '4px';
        popup.style.background = 'rgba(28, 28, 28, 0.4)';
        popup.style.color = '#fff';
        popup.style.fontSize = '16px';
        popup.style.fontWeight = 'bold';
        popup.style.fontFamily = 'Roboto, sans-serif';
        popup.style.transition = 'opacity 0.2s ease';
        popup.style.opacity = '0';
        popup.style.pointerEvents = 'none';
        document.body.appendChild(popup);
    }

    function showPopup(volume) {
        if (!popup) createPopup();

        const video = document.querySelector('video');
        const container = video?.parentElement;

        if (!video || !container) return;

        const rect = video.getBoundingClientRect();

        popup.textContent = `${volume}%`;

        const popupWidth = 50;
        popup.style.left = `${rect.left + rect.width / 2 - popupWidth / 2}px`;
        popup.style.top = `${rect.top + rect.height * 0.2}px`;
        popup.style.width = `${popupWidth}px`;
        popup.style.textAlign = 'center';
        popup.style.opacity = '1';

        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            popup.style.opacity = '0';
        }, 400);
    }

    document.addEventListener('keydown', function (e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.ctrlKey || e.altKey || e.metaKey) return;
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;

        const video = document.querySelector('video');
        if (!video) return;

        e.preventDefault();

        let newVolume = video.volume + (e.key === 'ArrowUp' ? 0.01 : -0.01);
        newVolume = Math.max(0, Math.min(1, newVolume));
        video.volume = newVolume;

        showPopup(Math.round(newVolume * 100));
    }, true);
})();
