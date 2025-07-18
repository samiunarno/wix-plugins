📘 Full Documentation: Wix Membership Plan-Based Redirect System
🔧 Purpose
This system is designed to dynamically redirect Wix users to the correct page based on their active membership plan (paid plan).

👇 Example:
User Plan Name	Redirect To
Tier 2	/tier-2-membership
Tier 3	/tier-3-membership
Any other plan	/membership-home
No plan	/choose-a-plan (fallback)

🧑‍💻 When to Use:
This is ideal for:

Membership websites

Course platforms

Subscription-based services

Tiered access to content

🛠️ Prerequisites:
✅ Make sure the following are already set up:
Dev Mode is ON (in Wix Editor → Turn on Dev Mode).

You are using the Wix Paid Plans App.

You have Published the following pages:

/tier-2-membership

/tier-3-membership

/membership-home

/choose-a-plan

📦 Step-by-Step Instructions:
🥇 Step 1: Add Required Pages
In the Wix Editor:

Go to Pages Panel → “+ Add Page”

Create and name the following pages:

Choose A Plan

Tier 2 Membership

Tier 3 Membership

Membership Home

Set their URLs like:

/choose-a-plan

/tier-2-membership

etc.

🥈 Step 2: Add a Redirect Button
Go to the page where you want the "Go to My Plan" button.

Drag and drop a Button onto the page.

Click the button, open Properties Panel, and set its ID to planButton.

🥉 Step 3: Paste the Code
🔹 Option A: Site-Wide Redirect
Go to Site Code → site.js and paste the full code (ideal if you want login redirection to work on all pages).

🔹 Option B: Page-Specific
Paste inside a specific page's code panel (bottom of the screen), within $w.onReady().

✅ Full Working Code:
js
Copy
Edit
import wixUsers from 'wix-users';
import wixLocation from 'wix-location';
import wixPaidPlans from 'wix-paid-plans';

let userPlanUrl = "/choose-a-plan"; // fallback URL

// Fetches current user's paid plan and returns the right page URL
async function getPlanPage() {
  const plans = await wixPaidPlans.getCurrentMemberOrders();

  if (plans.length > 0) {
    const planName = plans[0].planName;
    console.log("User Plan Name:", planName); // For debugging

    if (planName.includes("Tier 2")) return "/tier-2-membership";
    if (planName.includes("Tier 3")) return "/tier-3-membership";
    return "/membership-home"; // For other plans
  } 

  return "/choose-a-plan"; // If no plan found
}

// Automatic redirection after login
wixUsers.onLogin(async () => {
  userPlanUrl = await getPlanPage();
  wixLocation.to(userPlanUrl); // Redirect to proper page
});

// On page ready: show/hide button and add click logic
$w.onReady(async () => {
  if (wixUsers.currentUser.loggedIn) {
    userPlanUrl = await getPlanPage();
    $w("#planButton").show(); // Show redirect button
  } else {
    $w("#planButton").hide(); // Hide button for guests
  }

  // Redirect on button click
  $w("#planButton").onClick(() => {
    wixLocation.to(userPlanUrl);
  });
});
🔍 Code Explanation (Line-by-Line)
Code	Explanation
import wixUsers from 'wix-users';	Lets you check login status and listen to login events.
import wixLocation from 'wix-location';	Allows you to redirect the user.
import wixPaidPlans from 'wix-paid-plans';	Used to fetch the user’s current paid membership plans.
let userPlanUrl = "/choose-a-plan";	Default/fallback page if no plan is found.
getPlanPage()	Asynchronously fetches the user's active paid plan and decides the redirect URL.
if (planName.includes("Tier 2"))	If plan name contains "Tier 2", redirect to Tier 2 page.
wixUsers.onLogin()	This event runs as soon as a user logs in and redirects them to the right page.
$w.onReady()	Runs when the page is loaded. It hides or shows the button based on login status.
$w("#planButton").onClick()	Redirects user when the "Go to My Plan" button is clicked.

Full Code with Line-by-Line Explanation
js
Copy
Edit
import wixUsers from 'wix-users';
✅ What it does:
This line imports Wix's user management API, allowing us to check if the user is logged in and listen for login events like onLogin.

js
Copy
Edit
import wixLocation from 'wix-location';
✅ What it does:
This gives access to Wix's redirection/navigation API — it lets us programmatically send the user to a different page using wixLocation.to().

js
Copy
Edit
import wixPaidPlans from 'wix-paid-plans';
✅ What it does:
This imports the Paid Plans API, so we can access which paid membership plan a user has purchased.

js
Copy
Edit
let userPlanUrl = "/choose-a-plan"; // fallback URL
✅ What it does:
We define a variable userPlanUrl to store the URL the user should be redirected to.

By default, it’s set to /choose-a-plan, which is used if the user has no plan.

js
Copy
Edit
async function getPlanPage() {
✅ What it does:
We define an asynchronous function that fetches the user's active plan and returns the correct URL for redirection.

js
Copy
Edit
  const plans = await wixPaidPlans.getCurrentMemberOrders();
✅ What it does:
This fetches the current user's active paid membership plans using getCurrentMemberOrders().

js
Copy
Edit
  if (plans.length > 0) {
✅ What it does:
This checks if the user has at least one active paid plan.

js
Copy
Edit
    const planName = plans[0].planName;
✅ What it does:
We get the name of the first active plan.

Example: "Tier 2 Monthly"

💡 You can change this if users can have multiple plans and you want to loop through them.

js
Copy
Edit
    console.log("User Plan Name:", planName); // For debugging
✅ What it does:
This line is just for debugging. It will print the user's plan name in the browser's developer console.
Useful during development to make sure your logic is working.

js
Copy
Edit
    if (planName.includes("Tier 2")) return "/tier-2-membership";
✅ What it does:
If the plan name contains "Tier 2", we return the URL /tier-2-membership.

js
Copy
Edit
    if (planName.includes("Tier 3")) return "/tier-3-membership";
✅ What it does:
If the plan name contains "Tier 3", return the URL /tier-3-membership.

js
Copy
Edit
    return "/membership-home"; // For other plans
✅ What it does:
If the plan is not Tier 2 or 3, this acts as a default page for other kinds of plans.

js
Copy
Edit
  } 
  return "/choose-a-plan"; // If no plan found
}
✅ What it does:
If the user has no active paid plan, return the fallback page /choose-a-plan.

js
Copy
Edit
wixUsers.onLogin(async () => {
✅ What it does:
This event runs immediately after a user logs in (on any page).
It helps redirect users right after login.

js
Copy
Edit
  userPlanUrl = await getPlanPage();
✅ What it does:
We call our earlier function getPlanPage() and store the URL in userPlanUrl.

js
Copy
Edit
  wixLocation.to(userPlanUrl); // Redirect to proper page
});
✅ What it does:
Redirect the user to the correct page right after login.

js
Copy
Edit
$w.onReady(async () => {
✅ What it does:
This runs when the page is fully loaded. We use this to:

Check login status

Show/hide the button

Set button behavior

js
Copy
Edit
  if (wixUsers.currentUser.loggedIn) {
✅ What it does:
Checks if the current user is already logged in when the page loads.

js
Copy
Edit
    userPlanUrl = await getPlanPage();
✅ What it does:
Get the correct redirect page based on their plan and save it in userPlanUrl.

js
Copy
Edit
    $w("#planButton").show(); // Show redirect button
✅ What it does:
If the user is logged in, show the button with ID planButton.

js
Copy
Edit
  } else {
    $w("#planButton").hide(); // Hide button for guests
  }
✅ What it does:
If the user is not logged in, hide the button.

js
Copy
Edit
  $w("#planButton").onClick(() => {
    wixLocation.to(userPlanUrl);
  });
});
✅ What it does:
When the button is clicked, it redirects the user to their appropriate membership page.


✅ 1. Import Necessary Wix Modules
js
Copy
Edit
import wixUsers from 'wix-users';
🔹 What it does:
Imports the wix-users module — lets you check login status and respond to login events like onLogin().

js
Copy
Edit
import wixLocation from 'wix-location';
🔹 What it does:
Imports the wix-location module — lets you redirect users to different pages using wixLocation.to().

js
Copy
Edit
import wixPaidPlans from 'wix-paid-plans';
🔹 What it does:
Imports the wix-paid-plans module — allows you to access the logged-in user’s current active paid plan.

✅ 2. Set Default (Fallback) URL
js
Copy
Edit
let userPlanUrl = "/choose-a-plan"; // fallback
🔹 What it does:
Declares a global variable userPlanUrl and sets the default page for users who have no active plan.

✅ 3. Create an Async Function to Get Redirect Page Based on Plan
js
Copy
Edit
async function getPlanPage() {
🔹 What it does:
Defines an asynchronous function that will determine which page the user should go to based on their plan.

js
Copy
Edit
  const plans = await wixPaidPlans.getCurrentMemberOrders();
🔹 What it does:
Fetches the current member's active paid plans using the Paid Plans API. Returns an array of plan orders.

js
Copy
Edit
  if (plans.length > 0) {
🔹 What it does:
Checks if the user has at least one active paid plan.

js
Copy
Edit
    const planName = plans[0].planName;
🔹 What it does:
Gets the name of the first paid plan (e.g. "Tier 2 Monthly").

💡 You can modify this if you want to support multiple active plans.

js
Copy
Edit
    if (planName.includes("Tier 2")) return "/tier-2-membership";
🔹 What it does:
If the plan name includes "Tier 2", the function returns the URL to the Tier 2 Membership page.

js
Copy
Edit
    if (planName.includes("Tier 3")) return "/tier-3-membership";
🔹 What it does:
If the plan name includes "Tier 3", return the URL for the Tier 3 Membership page.

js
Copy
Edit
    return "/membership-home"; // default for other plans
🔹 What it does:
If the plan doesn’t match Tier 2 or Tier 3, return a default membership area page.

js
Copy
Edit
  } 
  return "/choose-a-plan"; // no plan
}
🔹 What it does:
If the user has no active plans, return the fallback URL /choose-a-plan.

✅ 4. Redirect on Login
js
Copy
Edit
wixUsers.onLogin(async () => {
🔹 What it does:
This event runs immediately when a user logs in. It’s perfect for redirecting users after login.

js
Copy
Edit
  userPlanUrl = await getPlanPage();
🔹 What it does:
Calls the getPlanPage() function and updates userPlanUrl with the appropriate redirect URL.

js
Copy
Edit
  wixLocation.to(userPlanUrl);
🔹 What it does:
Redirects the user immediately after login to the right membership page.

✅ 5. Run When Page is Ready
js
Copy
Edit
$w.onReady(async () => {
🔹 What it does:
This runs when the page has finished loading.
Here, we’ll control the visibility and functionality of the plan button.

js
Copy
Edit
  if (wixUsers.currentUser.loggedIn) {
🔹 What it does:
Checks if a user is already logged in.

js
Copy
Edit
    userPlanUrl = await getPlanPage();
🔹 What it does:
If the user is logged in, fetch their correct redirect URL again.

js
Copy
Edit
    $w("#planButton").show();
🔹 What it does:
Shows the button with ID planButton (used to go to the user’s plan page).
Only shown for logged-in users.

js
Copy
Edit
  } else {
    $w("#planButton").hide();
  }
🔹 What it does:
If the user is not logged in, hide the button so guests can’t click it.

✅ 6. Button Click Redirects to Plan Page
js
Copy
Edit
  $w("#planButton").onClick(() => {
    wixLocation.to(userPlanUrl);
  });
🔹 What it does:
When the button is clicked, it redirects the user to their membership page based on the plan logic.

🧪 Testing Checklist
✅ Test 1: Create dummy user with Tier 2 plan → log in → auto-redirects to /tier-2-membership
✅ Test 2: User with no plan → lands on /choose-a-plan
✅ Test 3: Button appears only when logged in
✅ Test 4: Clicking the button correctly redirects to their plan page

