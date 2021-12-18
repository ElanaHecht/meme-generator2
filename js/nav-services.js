'use strict'

function onNavClick(navTab) {
   ['first', 'second', 'third'].forEach(section => {
      document.querySelector(`.main-${section}`).style.display = (navTab === `${section}`) ? 'block' : 'none';
   })
   document.querySelector('.about-area').style.display = (navTab === 'first' || navTab === 'third') ? 'block' : 'none';  
   toggleMenu();
}
