Scroll-Based Header Animation – Wix Velo Documentation
📌 Overview
This Velo code adds a dynamic header animation effect to a Wix site. When the user scrolls down the page, the header’s background becomes solid, and the logo smoothly shrinks. When the user scrolls back to the top, the logo expands, and the background becomes transparent again.

It enhances user experience and interface aesthetics by making the header more compact during scroll, ideal for modern, interactive designs.

⚙️ Functional Highlights
Shrinks and expands the logo smoothly using wix-animations.

Dynamically changes the header background based on scroll position.

Ensures the hamburger button stays visible and accessible at all times.

📂 Modules Used
javascript
Copy
Edit
import wixWindow from 'wix-window';       // For getting scroll data
import { timeline } from 'wix-animations'; // For animating logo transitions
🧠 Logic Explanation
1. Element References
javascript
Copy
Edit
const header = $w('#header1');
const logo = $w('#image14');
const hamburger = $w('#hamburgerOpenButton2');
These connect to the header, logo, and hamburger icon components on your Wix page.

2. Initial UI Setup
javascript
Copy
Edit
logo.height = 100;
hamburger.show();
hamburger.style.zIndex = "1000";
hamburger.style.backgroundColor = "rgba(255,255,255,0.001)";
header.style.backgroundColor = "rgba(255, 255, 255, 0)";
Logo starts fully expanded.

Hamburger is shown with transparent background and high z-index to ensure it's always clickable.

Header starts as transparent.

3. Animation Definitions
javascript
Copy
Edit
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
These define smooth transition animations for shrinking and expanding the logo when scrolling.

4. Scroll Monitoring Logic
javascript
Copy
Edit
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
Every 100ms, the scroll position is checked.

If scroll exceeds 50px, the header becomes solid and logo shrinks.

If the user scrolls back to the top, everything reverts smoothly.

✅ Customisation Options
You can easily adapt this for your design:

Feature	How to Change
Logo size	Change the height values in shrinkLogo and expandLogo.
Scroll trigger point	Modify scrollY > 50 to a different pixel value.
Animation duration	Adjust duration: 300 to speed up/slow down animation.
Header color	Modify "#ffffff" or add RGBA for transparent colors.
Hamburger style	Update hamburger.style with desired CSS properties.

🧪 Testing Checklist
✅ Header remains transparent on page load

✅ Header turns white when scrolling down

✅ Logo smoothly shrinks and expands

✅ Hamburger button remains clickable and visible at all times

✅ Smooth transition without flicker or delay

🛠️ Troubleshooting Tips
Issue	Possible Fix
Logo doesn’t animate	Ensure #image14 is a resizable image element
Header not reacting	Confirm #header1 matches your site element ID
Hamburger hidden	Double-check the z-index and visibility settings
Lag or choppy scroll	Reduce setInterval frequency to 200ms

💡 Future Enhancements
Add fade-in/fade-out to header text elements.

Optimize with onScroll event listener if Wix adds support in future.

Dynamically adjust navbar item spacing on scroll for tighter layout.

