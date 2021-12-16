'use strict'

const gCompletedMemes = [];

function appendMeme(meme) {
   var memeCanvas = document.createElement('canvas');
   memeCanvas.width = 500;
   memeCanvas.height = 500;
   document.querySelector('.completed-memes').appendChild(memeCanvas);
   var ctx = memeCanvas.getContext('2d');
   createMemeImage(meme, memeCanvas.width, memeCanvas.height, ctx);
   gCompletedMemes.push(meme);
   _saveMemesToStorage();
}