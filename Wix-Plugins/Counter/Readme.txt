📌 Overview
This code creates a smooth and visually engaging counter animation effect, which increases a number from a starting value to a target value over a specified duration.

It is typically used on websites to dynamically display metrics such as “Years of Experience,” “Accuracy Rate,” “Positive Reviews,” or “Trusted Partners.”

⚙️ Function: animateCounter
✅ Syntax:
js
Copy
Edit
animateCounter(element, start, end, duration)
🔧 Parameters:
Parameter	Type	Description
element	Object	The target Wix text element (e.g., $w("#text53"))
start	Number	The starting value of the counter (e.g., 0)
end	Number	The ending value where the counter should stop (e.g., 500)
duration	Number	Total time in milliseconds for the animation (e.g., 3000 = 3 seconds)

🔁 Behavior:
The value updates smoothly on every frame using requestAnimationFrame.

The counter stops once the target value (end) is reached.

If end > 100, it appends "+"; otherwise, it appends "%".

📤 Output:
Dynamically updates the text element with a growing number, e.g.:

500+

99%

📍 Usage Example (Inside $w.onReady()):
js
Copy
Edit
$w.onReady(function () {
  animateCounter($w("#text53"), 0, 10, 3000);    // 10+ Years of Experience
  animateCounter($w("#text54"), 0, 99, 2000);    // 99% Accuracy Rate
  animateCounter($w("#text55"), 0, 500, 3000);   // 500+ Positive Reviews
  animateCounter($w("#text56"), 0, 600, 1500);   // 600+ Trusted Partners
});
📝 Notes:
This code is meant for Wix Velo and uses $w to access page elements.

Make sure the text elements with the corresponding IDs (#text53, #text54, etc.) exist on your page.

The property element.text is used (instead of textContent) because this is how Wix Velo updates text elements.

✅ Best Practices:
Use requestAnimationFrame() for smooth and efficient animations.

Always place the animation calls inside $w.onReady() to ensure the page is fully loaded.

Adjust the duration to make the animation visually appropriate (not too fast or too slow).

🔚 Conclusion:
The animateCounter function allows you to easily implement animated number counters on your Wix website. It enhances user engagement and makes your site's statistics look more dynamic and professional.
