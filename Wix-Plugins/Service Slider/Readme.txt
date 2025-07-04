📜 True Infinite Scroll Slider – Documentation
This True Infinite Scroll Slider is a responsive and fully animated carousel component with hover interaction, autoplay, and infinite scroll capabilities.

📦 Features
Infinite loop scroll

Hover reveal content

Responsive design (mobile, tablet, desktop)

Auto slide with pause/resume

Smooth transitions

Navigation arrows (Next/Prev)

🔧 Technologies Used
HTML5

CSS3

JavaScript (Vanilla)

Google Fonts (Oswald, Work Sans)

Responsive with flexbox and media queries

🧩 Folder/File Structure
plaintext
Copy
Edit
index.html   # Main file containing the slider
🚀 Usage Guide
✅ 1. HTML Structure
Make sure your HTML includes:

html
Copy
Edit
<div class="slider-container">
    <div class="nav-buttons">
        <button class="nav-button nav-prev" id="prevBtn">←</button>
        <button class="nav-button nav-next" id="nextBtn">→</button>
    </div>
    <div class="slider-track" id="sliderTrack"></div>
</div>
✅ 2. CSS Styling
The CSS is embedded inside <style> in the <head>. It handles:

Responsive flex layout

Hover effects

Image overlays

Navigation button positioning

Slide transition and width per breakpoint

Make sure the CSS is included in your <head> tag, or moved to a separate style.css file if modular.

✅ 3. JavaScript Logic
The JavaScript handles:

Generating slides dynamically from a data array

Managing the infinite loop by duplicating start/end slides

Handling responsive breakpoints dynamically

Auto-sliding using setInterval

Pause on Prev, Resume on Next

Add the <script> section before the closing </body> tag or in a separate .js file and import it.

js
Copy
Edit
const data = [
  {
    img: "...",
    iconWhite: "...",
    iconBlack: "...",
    title: "...",
    desc: "..."
  },
  ...
];
🛠 Customisation
🖼 Add New Slide
Simply add new items in the data array:

js
Copy
Edit
{
  img: "your-image.jpg",
  iconWhite: "white-icon.png",
  iconBlack: "black-icon.png",
  title: "Your Title",
  desc: "Your description here."
}
⏱ Change Slide Duration
To change the autoplay interval:

js
Copy
Edit
setInterval(() => {
  if (autoEnabled) nextSlide();
}, 7000); // change 7000 to your desired time in milliseconds
📱 Adjust Slide Width per Breakpoint
Update the getVisibleSlides() function:

js
Copy
Edit
function getVisibleSlides() {
    const width = window.innerWidth;
    if (width >= 1400) return 4; // Desktop large
    if (width >= 1024) return 3; // Desktop
    if (width >= 768) return 2;  // Tablet
    return 1;                    // Mobile
}
📐 Responsive Design
Breakpoints:

>= 1400px: 4 slides

>= 1024px: 3 slides

>= 768px: 2 slides

< 768px: 1 slide

Mobile-friendly adjustments have been added via media queries.

🧪 Example Use Case
Online betting/casino platform promotion

Product feature carousel

Portfolio showcase

Testimonial slides

Service highlights with details on hover

🧠 Developer Tips
Duplicate first and last n slides to simulate infinite scroll.

Always calculate visibleSlides dynamically on resize for true responsiveness.

Add or modify hover interactions inside .hover-content block.

📎 Browser Compatibility
✅ Chrome
✅ Firefox
✅ Safari
✅ Edge
✅ Mobile Browsers

📌 Dependencies
No external JS frameworks

Google Fonts:

html
Copy
Edit
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500&family=Work+Sans:wght@400&display=swap" rel="stylesheet">
✅ Final Notes
Fully modular and can be embedded anywhere.

Easily extendable with thumbnail navigation, autoplay pause on hover, etc.

Animations and style are lightweight and do not require third-party libraries
