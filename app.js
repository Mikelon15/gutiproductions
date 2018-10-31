import Player from '@vimeo/player';
import { MDCRipple } from '@material/ripple/index';
import { MDCTopAppBar } from '@material/top-app-bar/index';
import { MDCLinearProgress, MDCLinearProgressFoundation } from '@material/linear-progress/index';

// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);
import * as videosToImport from './videos.json';

var videos = videosToImport.list;

function newElem(type) {
    return document.createElement(type)
}

function getNewItem(url, media) {
    let itemElem = newElem('li');
    let contElem = newElem('div');
    let imageElem = newElem('img');
    let suportElem = newElem('div');
    let iconElem = newElem('i');

    itemElem.className = "mdc-image-list__item";
    contElem.className = "mdc-image-list__image-aspect-container";
    imageElem.className = "mdc-image-list__image";
    suportElem.className = 'mdc-image-list__supporting';
    iconElem.className = "material-icons";
    iconElem.id = "play-icon";
    imageElem.src = media;
    iconElem.innerText = "play_circle_outline";

    itemElem.appendChild(contElem);
    contElem.appendChild(imageElem);
    contElem.appendChild(suportElem);
    suportElem.appendChild(iconElem);

    return itemElem;
}

var player;
var selectedVideo;
var body = document.getElementsByTagName('body')[0];
var bodyClassString = body.className;
var head = document.getElementsByTagName('header')[0];
var modal = document.getElementById('videoModal');
var modalContainer = document.getElementById('videoContainer');
var span = document.getElementsByClassName("close")[0];
var isLoading = document.getElementById('isLoading');

/*
/ EVENT LISTENERS
/ 
*/
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    closeModal();
    pausePlayer();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
        pausePlayer();
    }
}

/*
/
/   PLAYER ACTIONS
/
*/
function destroyPlayer() {
    player.destroy().then(function () {
        // the player was destroyed
        document.getElementById('videoContainer').innerHTML = '';
        isLoading.style = 'display: block;'
    }).catch(function (error) {
        // an error occurred
    });
}

function pausePlayer() {
    player.pause();
}

function startNewVideo(vid) {
    setLoading(true);
    if(selectedVideo){
        selectedVideo = null;
        destroyPlayer();
    }
    openModal();
    player = new Player('videoContainer', {
        id: vid.url,
        responsive: true
    });
    player.ready().then(() => {
        selectedVideo = vid.url;
        setLoading(false);
        openModalContainer();
    });
}
/*
/
/   MODAL ACTIONS
/
*/
function openModal() {
    body.className += " modal-open";
    head.style = "top: -128px;";
    modal.style.display = "block";
}

function closeModal() {
    body.className = bodyClassString;
    modal.style.display = "none";
}
function openModalContainer() {
    modalContainer.style.display = "block";
}

function closeModalContainer() {
    modalContainer.style.display = "none";
}
function setLoading(val) {
    if (val)
        isLoading.style = 'display: block;';
    else
        isLoading.style = 'display: none;';
}
/*
/
/   MAIN FUNCTION TO START SCRIPT
/
*/
function main() {
    let videoList = document.getElementById('video-list');
    let itemElem;
    closeModalContainer();
    videos.forEach(vid => {
        // make item <li>. add event callback, and append to list
        itemElem = getNewItem(vid.url, vid.image);
        itemElem.onclick = () => {
            openModal();
            if (!selectedVideo || selectedVideo != vid.url)
                startNewVideo(vid);
        }
        videoList.append(itemElem);
    })
}
main();