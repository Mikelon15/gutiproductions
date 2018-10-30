import {
    MDCRipple
} from '@material/ripple/index';

import {
    MDCTopAppBar
} from '@material/top-app-bar/index';
import Player from '@vimeo/player';

// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);


const videos = [
    {
        url: '297595106',
        image: ''
    },
    {
        url: '297594495',
        image: ''
    },
    {
        url: '297595167',
        image: ''
    },
    {
        url: '290168576',
        image: './media/725974190_1560x878.webp'
    },
    {
        url: '219431388',
        image: './media/731332128_1560x878.webp'
    },
    {
        url: '212320366',
        image: './media/731332938_1560x878.webp'
    },
    {
        url: '205997233',
        image: './media/620904605_1560x878.webp'
    },
    {
        url: '192168791',
        image: './media/731333844_1560x878.webp'
    },
    {
        url: '187236243',
        image: './media/596918379_1560x878.webp'
    }
]


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

var bodyClassString = ""
var body = document.getElementsByTagName('body')[0];
var head = document.getElementsByTagName('header')[0];
var modal = document.getElementById('videoModal');
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    closeModal();
    
    player.destroy().then(function() {
        // the player was destroyed
        document.getElementById('videoContainer').innerHTML = '';
    }).catch(function(error) {
        // an error occurred
    });
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
        player.pause();
    }
}

function openModal(){
    bodyClassString = body.className;
    body.className += " modal-open";
    head.style = "top: -128px;";
    modal.style.display = "block";
}

function closeModal(){
    body.className = bodyClassString;
    modal.style.display = "none";
}
    var player;
function loadVideos() {
    let videoList = document.getElementById('video-list');
    let itemElem;
    videos.forEach(vid => {
        // make item <li>. add event callback, and append to list
        itemElem = getNewItem(vid.url, vid.image);
        // window.span
        itemElem.onclick = () => {
            sendToVideo(vid.url);
            player = new Player('videoContainer', {
                id: vid.url,
                responsive: true
            });
        };
        videoList.append(itemElem);
    })
}

var videoFrame = document.getElementById('video-frame');

function sendToVideo(videoUrl) {
    openModal();
}

loadVideos();
