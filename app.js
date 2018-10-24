import {
    MDCRipple
} from '@material/ripple/index';

import {
    MDCTopAppBar
} from '@material/top-app-bar/index';

// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

// import {
//     MDCTabBar
// } from '@material/tab-bar';

// const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
export function sendToVideo(url) {
    console.log("redericting")
    window.location = url
}

module.exports = {
    sendToVideo: sendToVideo
}