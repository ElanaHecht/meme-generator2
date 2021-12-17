'use strict'
const STORAGE_KEY = 'memesDB';

var gMeme = {
   selectedImgId: -1,
   selectedLineIdx: 0,
   lines: [
      _createLine(50),
      _createLine(400)
   ]
}

function createMemeImage(meme, width, height, ctx) {
   var img = new Image();
   img.src = getImgById(meme.selectedImgId).url;
   img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      meme.lines.forEach(line => drawText(line, width, ctx))
   };

}

function drawText(line, width, ctx) {
   var x;
   switch (line.align) {
      case 'left':
         x = 10
         break;
      case 'center':
         x = width / 2
         break;
      case 'right':
         x = width - 10
         break;
   }
   var txt = line.txt.length ? line.txt : 'Your text goes here';
   ctx.textAlign = line.align;
   ctx.strokeStyle = line.stroke;
   ctx.font = `${line.size}px ${line.font}`;
   ctx.fillStyle = line.fill;
   ctx.fillText(txt, x, line.y);
   ctx.strokeText(txt, x, line.y);
}

function getMeme() {
   return gMeme;
}

function getImgById(imgId) {
   var img = gImgs.find(function (img) {
      return imgId === img.id
   })
   return img;
}

function setLineTxt() {
   const text = document.getElementById('input-text').value;
   gMeme.lines[gMeme.selectedLineIdx].txt = text;
   renderMeme();
}

function setImg(imgId) {
gMeme.selectedImgId = parseInt(imgId);
onMemeInit();
}

function setTextFont(font) {
   gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function setTextFill(color) {
   gMeme.lines[gMeme.selectedLineIdx].fill = color;
}

function setTextStroke(color) {
   gMeme.lines[gMeme.selectedLineIdx].stroke = color;
}

function setTextIncrease(){
   gMeme.lines[gMeme.selectedLineIdx].size++;
}

function setTextDecrease(){
   gMeme.lines[gMeme.selectedLineIdx].size--;
}

function setTextAlign(align) {
   gMeme.lines[gMeme.selectedLineIdx].align = align;
}

function selectLine(){
   gMeme.selectedLineIdx++;
   if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0;
   document.getElementById('input-text').value = gMeme.lines[gMeme.selectedLineIdx].txt;
   document.getElementById('fill-color').value = gMeme.lines[gMeme.selectedLineIdx].fill;
   document.getElementById('stroke-color').value = gMeme.lines[gMeme.selectedLineIdx].stroke;
}

function removeText(){
   gMeme.lines.splice(gMeme.selectedLineIdx, 1);
   if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx--;
}

function addText(){
   gMeme.lines.push(_createLine(gCanvas.height / 2));
}

function moveLine(dy){
   gMeme.lines[gMeme.selectedLineIdx].y += dy;
}

function _createLine(y){
   var line = {
      txt: '',
      font: document.getElementById('selected').value,
      size: 30,
      align: 'center',
      fill: document.getElementById('fill-color').value,
      stroke: document.getElementById('stroke-color').value,
      y: y,
   }
   return line;
}

function _saveMemesToStorage() {
   saveToStorage(STORAGE_KEY, gCompletedMemes)
}


