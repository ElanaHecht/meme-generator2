'use strict'

var gKeywordSearchCountMap = {};

var gImgs = [
   {
      id: 1,
      url: 'sqr-images/1.jpg',
      keywords: ['funny', 'dog', 'politics', 'scary']
   },
   {
      id: 2,
      url: 'sqr-images/2.jpg',
      keywords: ['cute', 'dog', 'happy']
   },
   {
      id: 3,
      url: 'sqr-images/3.jpg',
      keywords: ['cute', 'dog', 'happy', 'baby']
   },
   {
      id: 4,
      url: 'sqr-images/4.jpg',
      keywords: ['cute', 'cat', 'happy']
   },
   {
      id: 5,
      url: 'sqr-images/5.jpg',
      keywords: ['funny', 'baby', 'cute']
   },
   {
      id: 6,
      url: 'sqr-images/6.jpg',
      keywords: ['funny', 'scary']
   },
   {
      id: 7,
      url: 'sqr-images/7.jpg',
      keywords: ['funny', 'baby']
   },
   {
      id: 8,
      url: 'sqr-images/8.jpg',
      keywords: ['funny', 'movie']
   },
   {
      id: 9,
      url: 'sqr-images/9.jpg',
      keywords: ['funny', 'baby']
   },
   {
      id: 10,
      url: 'sqr-images/10.jpg',
      keywords: ['funny', 'politics']
   },
   {
      id: 11,
      url: 'sqr-images/11.jpg',
      keywords: ['funny', 'sports']
   },
   {
      id: 12,
      url: 'sqr-images/12.jpg',
      keywords: ['funny']
   },
   {
      id: 13,
      url: 'sqr-images/13.jpg',
      keywords: ['funny', 'movie']
   },
   {
      id: 14,
      url: 'sqr-images/14.jpg',
      keywords: ['movie', 'scary']
   },
   {
      id: 15,
      url: 'sqr-images/15.jpg',
      keywords: ['movie', 'funny']
   },
   {
      id: 16,
      url: 'sqr-images/16.jpg',
      keywords: ['funny', 'movie', 'cute']
   },
   {
      id: 17,
      url: 'sqr-images/17.jpg',
      keywords: ['politics', 'scary']
   },
   {
      id: 18,
      url: 'sqr-images/18.jpg',
      keywords: ['movie', 'cute']
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
   document.querySelector('.about-area').style.display = 'block';
   onNavClick('first');
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
   toggleMenu();
}

function onFilterGallery() {
   var keyword = document.getElementById('search-input').value;
   renderGallery(keyword);
}

function toggleMenu() {
   document.body.classList.toggle('menu-open');
}

// function uploadImg(canvas) {
//    const imgDataUrl = canvas.toDataURL("image/jpeg");

//    function onSuccess(uploadedImgUrl) {
//       const encodedUploadedImgUrl = encodeURIComponent;
//       document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`

//       document.querySelector('.share-container').innerHTML = `
//         <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
//            Share   
//         </a>`
//    }
//    doUploadImg(imgDataUrl, onSuccess);
// }

// function doUploadImg(imgDataUrl, onSuccess) {

//    const formData = new FormData();
//    formData.append('img', imgDataUrl)

//    fetch('//ca-upload.com/here/upload.php', {
//       method: 'POST',
//       body: formData
//    })
//       .then(res => res.text())
//       .then((url) => {
//          console.log('Got back live url:', url);
//          onSuccess(url)
//       })
//       .catch((err) => {
//          console.error(err)
//       })
// }