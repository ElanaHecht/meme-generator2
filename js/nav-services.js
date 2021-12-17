'use strict'

function onNavClick(navTab) {
   ['first', 'second', 'third'].forEach(section => {
      document.querySelector(`.${section}-area`).style.display = (navTab === `${section}`) ? 'block' : 'none';
      if (navTab === 'first') document.querySelector('.about-area').style.display = 'block';
      if (navTab === 'third') document.querySelector('.about-area').style.display = 'block';
   })
   toggleMenu();
}
