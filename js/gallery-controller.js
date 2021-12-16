'use strict'

var gKeywordSearchCountMap = {};

var gImgs = [
   {
      id: 1,
      url: 'sqr-images/1.jpg',
      keywords: ['cat', 'dog']
   },
   {
      id: 2,
      url: 'sqr-images/2.jpg',
      keywords: ['funny', 'cat']
   },
   {
      id: 3,
      url: 'sqr-images/3.jpg',
      keywords: ['cat']
   },
   {
      id: 4,
      url: 'sqr-images/4.jpg',
      keywords: ['funny', 'cat']
   },
   {
      id: 5,
      url: 'sqr-images/5.jpg',
      keywords: ['cat']
   },
   {
      id: 6,
      url: 'sqr-images/6.jpg',
      keywords: ['funny']
   },
   {
      id: 7,
      url: 'sqr-images/7.jpg',
      keywords: ['funny', 'cat']
   },
]

function onGalleryInit() {
   renderGallery();
   setKeywordCount();
   for (var keyword in gKeywordSearchCountMap) {
      var option = document.createElement('option');
      option.value = keyword;
      document.getElementById('search').appendChild(option)
   }
}

function renderGallery(keyword) {
   if (keyword === '') keyword = undefined;
   var strHTML = '';
   var filteredImgs = gImgs.filter(img => img.keywords.includes(keyword) || keyword === undefined);
   filteredImgs.forEach(img => strHTML += `<img src="${img.url}" alt="image${img.id}" id="${img.id}" onclick="onImgSelect(this)"/>`)
   const elGrid = document.querySelector('.gallery-grid')
   elGrid.innerHTML = strHTML;
}

function setKeywordCount() {
   gImgs.forEach(img => img.keywords.forEach(keyword => {
      if (keyword in gKeywordSearchCountMap) {
         gKeywordSearchCountMap[keyword]++;
      } else {
         gKeywordSearchCountMap[keyword] = 1;
      }
   }))
}

function onImgSelect(elImg) {
   setImg(elImg.id);
   onNavClick('second');
}

function onFilterGallery() {
   var keyword = document.getElementById('search-input').value;
   renderGallery(keyword);
}