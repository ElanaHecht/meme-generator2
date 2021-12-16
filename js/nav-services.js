'use strict'

function onNavClick(navTab){
   ['first', 'second', 'third'].forEach(section => 
   document.querySelector(`.${section}-area`).style.display = (navTab === `${section}`) ? 'block' : 'none')
}
