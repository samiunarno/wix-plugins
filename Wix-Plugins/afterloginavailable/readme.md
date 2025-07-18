<div class="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl border border-gray-200 dark:bg-gray-900 dark:text-white">
  <h2 class="text-3xl font-bold text-blue-600 mb-6">📘 Full Documentation: Wix Membership Plan-Based Redirect System</h2>

  <h3 class="text-2xl font-semibold mb-2">🔧 Purpose</h3>
  <p class="mb-4">This system dynamically redirects Wix users to the correct page based on their active paid membership plan.</p>

  <h4 class="text-xl font-medium mt-6 mb-2">👇 Example:</h4>
  <div class="overflow-x-auto">
    <table class="table-auto w-full text-left border-collapse border border-gray-300 dark:border-gray-700 mb-6">
      <thead>
        <tr class="bg-gray-100 dark:bg-gray-800">
          <th class="border border-gray-300 px-4 py-2">User Plan Name</th>
          <th class="border border-gray-300 px-4 py-2">Redirect To</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border px-4 py-2">Tier 2</td>
          <td class="border px-4 py-2">/tier-2-membership</td>
        </tr>
        <tr class="bg-gray-50 dark:bg-gray-800">
          <td class="border px-4 py-2">Tier 3</td>
          <td class="border px-4 py-2">/tier-3-membership</td>
        </tr>
        <tr>
          <td class="border px-4 py-2">Any other plan</td>
          <td class="border px-4 py-2">/membership-home</td>
        </tr>
        <tr class="bg-gray-50 dark:bg-gray-800">
          <td class="border px-4 py-2">No plan</td>
          <td class="border px-4 py-2">/choose-a-plan (fallback)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4 class="text-xl font-medium mt-4 mb-1">🧑‍💻 When to Use:</h4>
  <ul class="list-disc pl-6 mb-4">
    <li>Membership websites</li>
    <li>Course platforms</li>
    <li>Subscription-based services</li>
    <li>Tiered access to content</li>
  </ul>

  <h4 class="text-xl font-medium mt-6 mb-1">🛠️ Prerequisites:</h4>
  <ul class="list-disc pl-6 mb-4">
    <li>✅ Dev Mode ON (Wix Editor → Enable Dev Mode)</li>
    <li>✅ Wix Paid Plans App installed</li>
    <li>✅ Pages published:
      <ul class="list-disc pl-6">
        <li>/tier-2-membership</li>
        <li>/tier-3-membership</li>
        <li>/membership-home</li>
        <li>/choose-a-plan</li>
      </ul>
    </li>
  </ul>

  <h3 class="text-2xl font-semibold mt-8 mb-3">📦 Step-by-Step Instructions</h3>

  <h4 class="text-xl font-medium mb-2">🥇 Step 1: Add Required Pages</h4>
  <ol class="list-decimal pl-6 mb-4">
    <li>In Wix Editor, go to the Pages Panel → “+ Add Page”</li>
    <li>Create and name these pages:
      <ul class="list-disc pl-6">
        <li>Choose A Plan → /choose-a-plan</li>
        <li>Tier 2 Membership → /tier-2-membership</li>
        <li>Tier 3 Membership → /tier-3-membership</li>
        <li>Membership Home → /membership-home</li>
      </ul>
    </li>
  </ol>

  <h4 class="text-xl font-medium mb-2">🥈 Step 2: Add a Redirect Button</h4>
  <ol class="list-decimal pl-6 mb-4">
    <li>Add a button to any page</li>
    <li>Set its ID to <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">planButton</code> via the Properties Panel</li>
  </ol>

  <h4 class="text-xl font-medium mb-2">🥉 Step 3: Add Code</h4>
  <p class="mb-4">Paste this code in either <b>Site Code (site.js)</b> for global redirection or in a specific page’s code panel.</p>

  <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6 overflow-auto text-sm">
    <pre><code>
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
    </code></pre>
  </div>

  <h3 class="text-2xl font-semibold mt-8 mb-2">🔍 Code Explanation (Line-by-Line)</h3>
  <ul class="list-disc pl-6 mb-6">
    <li><b>import wixUsers</b> → Handles login/logout events</li>
    <li><b>import wixLocation</b> → Allows redirection to another page</li>
    <li><b>import wixPaidPlans</b> → Retrieves the user's subscription plan</li>
    <li><b>getPlanPage()</b> → Core logic to determine the correct page to send the user to</li>
    <li><b>console.log()</b> → Debugging help, logs the user’s plan name in the console</li>
    <li><b>wixUsers.onLogin</b> → Runs when a user logs in and immediately redirects</li>
    <li><b>$w.onReady</b> → Used to handle visibility and behavior of the redirect button</li>
  </ul>

  <h3 class="text-2xl font-semibold mb-2">🧪 Testing Checklist</h3>
  <ul class="list-disc pl-6 mb-4">
    <li>✅ Login with Tier 2 → redirected to /tier-2-membership</li>
    <li>✅ Login with Tier 3 → redirected to /tier-3-membership</li>
    <li>✅ Login with other plan → redirected to /membership-home</li>
    <li>✅ No plan → redirected to /choose-a-plan</li>
    <li>✅ Button only shows when logged in</li>
    <li>✅ Clicking button works as expected</li>
  </ul>
</div>
