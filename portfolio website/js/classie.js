/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */
function changeColor(element) {
  var navItems = document.querySelectorAll(".nav.navbar-nav.navbar-right li a");

  for (var i = 0; i < navItems.length; i++) {
    navItems[i].classList.remove("selected");
  }
  element.classList.add("selected");
}

function remove(element) {
  var navItems = document.querySelectorAll(".nav.navbar-nav.navbar-right li a");
  // console.log(navItems);
  for (var i = 0; i < navItems.length; i++) {
    navItems[i].classList.remove("selected");
  }
}

document.addEventListener("DOMContentLoaded", setActiveNavItem);

function setActiveNavItem() {
  const navItems = document.querySelectorAll(".nav.navbar-nav.navbar-right li a");
  const currentHash = window.location.hash;
  const currentPage = window.location.pathname.split('/').pop();

  navItems.forEach((navItem) => {
    // reset the "selected" class on all nav items
    navItem.classList.remove("selected");
  });

  if (currentPage === "pet.html") {
    // highlight the "pet" nav item specifically
    document.getElementById("nav-pet").classList.add("selected")
  } else {
    // if we're on "index.html", check the hash and highlight the corresponding nav item
    navItems.forEach((navItem) => {
      if (navItem.getAttribute("href").includes(currentHash)) {
      navItem.classList.add("selected");
      }
    });
  }
}

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );
