'use strict'

function onNavClick(navTab) {
   ['first', 'second', 'third'].forEach(section => {
      document.querySelector(`.main-${section}`).style.display = (navTab === section) ? 'block' : 'none';
      var elLink = document.getElementById(section);
      if (elLink) {
      if (navTab === section) {
         if (!elLink.classList.contains('active')) elLink.classList.add('active');
      } else {
         if (elLink.classList.contains('active')) elLink.classList.remove('active');
      }
   }
   })
   document.querySelector('.about-area').style.display = (navTab === 'first' || navTab === 'third') ? 'block' : 'none';
   toggleMenu();
}
