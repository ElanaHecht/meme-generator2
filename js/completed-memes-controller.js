'use strict'

const gCompletedMemes = [];
var gSelectedCanvas;

function appendMeme(meme) {
   var memeCanvas = document.createElement('canvas');
   memeCanvas.addEventListener("click", onOpenModal);
   memeCanvas.setAttribute('data-index', gCompletedMemes.length)
   memeCanvas.width = 500;
   memeCanvas.height = 500;
   document.querySelector('.completed-memes').appendChild(memeCanvas);
   var ctx = memeCanvas.getContext('2d');
   createMemeImage(meme, memeCanvas.width, memeCanvas.height, ctx, false);
   gCompletedMemes.push(meme);
   document.querySelector('canvas').setAttribute("onclick", "onOpenModal()");
   _saveMemesToStorage();
}

function onOpenModal(ev){
   gSelectedCanvas = ev.target;
   var modal = document.getElementById('saved-modal');
   modal.style.display = 'block';
   modal.style.left = `${ev.x}px`;
   modal.style.top = `${ev.y}px`;
}

function onCloseModal() {
   document.getElementById('saved-modal').style.display = 'none';
}

function onCompletedMemeDownload() {
   var elDownloadBtn = document.querySelector('.modal-download')
 downloadMeme(gSelectedCanvas, elDownloadBtn)
document.getElementById('saved-modal').style.display = 'none';
}

function onRemoveCompletedMeme() {
var index = parseInt(gSelectedCanvas.getAttribute('data-index'));
gCompletedMemes.splice(index, 1);
gSelectedCanvas.remove();
document.getElementById('saved-modal').style.display = 'none';
}

function onShareCompletedMeme() {
   shareMeme(gSelectedCanvas);
}