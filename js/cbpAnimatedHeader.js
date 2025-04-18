/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
const cbpAnimatedHeader = (function () {

	let docElem = document.documentElement,
		header = document.querySelector('.navbar-default'),
		didScroll = false,
		changeHeaderOn = 300;

	function init() {
        window.addEventListener('scroll', function (event) {
            if (!didScroll) {
                didScroll = true;
                setTimeout(scrollPage, 250);
            }
        }, false);
    }

    function scrollPage() {
		const sy = scrollY();
		if (sy >= changeHeaderOn) {
            classie.add(header, 'navbar-shrink');
        } else {
            classie.remove(header, 'navbar-shrink');
        }
        highlightNavItem();
        didScroll = false;
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    function highlightNavItem() {
		const navItems = document.querySelectorAll(".nav.navbar-nav.navbar-right li a");
		const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		const viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

		for (let i = 0; i < navItems.length; i++) {
			const currLink = navItems[i];
			const val = currLink.getAttribute("href");

			if (val.charAt(0) == '#') {
				const refElement = document.querySelector(val);

				if (!refElement) {
                   return null;
                }

                // determine the bottom position of the section
                const refElementBottom = refElement.offsetTop + refElement.offsetHeight;
                // check if the section is at the top of the viewport or if the bottom of the section is anywhere within the viewport
                const isAtTop = refElement.offsetTop <= scrollPos + 2;
                const isAtBottom = refElementBottom >= scrollPos && refElementBottom <= (scrollPos + viewportHeight);
                // special case for the last section to ensure it gets highlighted when the footer comes into view
                const isLastSection = i === navItems.length - 1 && refElementBottom < (scrollPos + viewportHeight);

            console.log({isAtTop,currLink})

            if ((isAtTop && refElementBottom > scrollPos) || isAtBottom || isLastSection) {
                changeColor(currLink);
            } else {
                currLink.classList.remove("selected"); // remove "selected" class if it's not the right section
            }
        }
    }
}

    init();

    return {
        scrollPage: scrollPage
    };

})();