'use strict'
const STORAGE_KEY = 'memesDB';

var gMeme = {
   selectedImgId: -1,
   selectedLineIdx: 0,
   lines: [
      _createLine(50),
      _createLine(420)
   ]
}

function createMemeImage(meme, width, height, ctx, isPreviewImg) {
   var img = new Image();
   img.src = getImgById(meme.selectedImgId).url;
   img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      meme.lines.forEach((line, index) =>
         drawText(line, width, ctx, isPreviewImg && index === gMeme.selectedLineIdx));

   }
}

function drawText(line, width, ctx, isEditedTxt) {
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
   if (isEditedTxt) drawTextBox(line, txt, width, ctx);
}

function drawTextBox(line, txt, width, ctx) {
   var textWidth = ctx.measureText(txt).width;
   var x;
   switch (line.align) {
      case 'left':
         x = 5
         break;
      case 'center':
         x = ((width - textWidth) / 2) - 5
         break;
      case 'right':
         x = width - 15 - textWidth
         break;
   }
   ctx.beginPath();
   ctx.rect(x, line.y - line.size, textWidth + 10, line.size + 10);
   ctx.strokeStyle = '#1b1b1b';
   ctx.stroke();
   ctx.closePath();
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

function setTextIncrease() {
   gMeme.lines[gMeme.selectedLineIdx].size++;
}

function setTextDecrease() {
   gMeme.lines[gMeme.selectedLineIdx].size--;
}

function setTextAlign(align) {
   gMeme.lines[gMeme.selectedLineIdx].align = align;
}

function selectLine() {
   gMeme.selectedLineIdx++;
   if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0;
   document.getElementById('input-text').value = gMeme.lines[gMeme.selectedLineIdx].txt;
   document.getElementById('fill-color').value = gMeme.lines[gMeme.selectedLineIdx].fill;
   document.getElementById('stroke-color').value = gMeme.lines[gMeme.selectedLineIdx].stroke;
}

function removeText() {
   gMeme.lines.splice(gMeme.selectedLineIdx, 1);
   if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx--;
}

function addText() {
   gMeme.lines.push(_createLine(gCanvas.height / 2));
}

function moveLine(dy) {
   gMeme.lines[gMeme.selectedLineIdx].y += dy;
}

function downloadMeme(canvas, elBtn) {
   const data = canvas.toDataURL();
   elBtn.href = data;
   elBtn.download = 'my-meme';
}

function shareMeme(canvas) {
   const imgDataUrl = canvas.toDataURL("image/jpeg");

   function onSuccess(uploadedImgUrl) {
      console.log(uploadedImgUrl);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`)

   }
   doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

   const formData = new FormData();
   formData.append('img', imgDataUrl)

   fetch('//ca-upload.com/here/upload.php', {
      method: 'POST',
      body: formData
   })
      .then(res => res.text())
      .then((url) => {
         console.log('Got back live url:', url);
         onSuccess(url)
      })
      .catch((err) => {
         console.error(err)
      })
}

function _createLine(y) {
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


