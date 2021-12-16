'use strict'


var gCanvas;
var gCtx;

function onMemeInit() {
   gCanvas = document.querySelector('#meme-canvas');
   gCtx = gCanvas.getContext('2d');
   renderMeme();
}

function renderMeme() {
   var meme = getMeme();
   createMemeImage(meme, gCanvas.width, gCanvas.height, gCtx);
}

function onSelectFont(font) {
   setTextFont(font);
   renderMeme();
}

function onSelectFill(){
   const color = document.getElementById('fill-color').value
   setTextFill(color);
   renderMeme();
}
function onSelectStroke(){
   const color = document.getElementById('stroke-color').value
   setTextStroke(color);
   renderMeme();
}

function onIncreaseTextSize(){
   setTextIncrease();
   renderMeme();
}

function onDecreaseTextSize(){
   setTextDecrease();
   renderMeme();
}

function onTextAlign(btn){
   setTextAlign(btn.id.substring(6));
   renderMeme();
}

function onSelectLine(){
   selectLine();
   renderMeme();
}

function onRemoveText(){
   removeText();
   renderMeme();
}

function onAddText(){
   addText();
   renderMeme();
}

function onMoveLine(dy){
   moveLine(dy);
   renderMeme();
}

function onSaveMeme(){
   appendMeme(gMeme);
}

// function onDownloadMeme(elBtn) {
//    const data = gCanvas.toDataURL();
//    elBtn.href = data;
//    elBtn.download = 'my-canvas';
// }
