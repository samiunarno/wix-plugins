import wixWindow from 'wix-window';
import { timeline } from 'wix-animations';

$w.onReady(function () {
    const header = $w('#header1');
    const logo = $w('#image14');
    const hamburger = $w('#hamburgerOpenButton2');  

    let isScrolled = false;

    const shrinkLogo = timeline().add(logo, {
        height: 50,
        duration: 300,
        easing: 'easeInOutQuad'
    });

    const expandLogo = timeline().add(logo, {
        height: 100,
        duration: 300,
        easing: 'easeInOutQuad'
    });

    // Initial state
    logo.height = 100;
    hamburger.show();
    hamburger.style.zIndex = "1000"; // always on top
    hamburger.style.backgroundColor = "rgba(255,255,255,0.001)"; // keep it very light
    header.style.backgroundColor = "rgba(255, 255, 255, 0)";

    setInterval(() => {
        wixWindow.getBoundingRect()
            .then(rect => {
                const scrollY = rect.scroll.y;

                if (scrollY > 50 && !isScrolled) {
                    header.style.backgroundColor = "#ffffff";
                    shrinkLogo.play();
                    isScrolled = true;
                } else if (scrollY <= 50 && isScrolled) {
                    header.style.backgroundColor = "rgba(255, 255, 255, 0)";
                    expandLogo.play();
                    isScrolled = false;
                }
            });
    }, 100);
});
