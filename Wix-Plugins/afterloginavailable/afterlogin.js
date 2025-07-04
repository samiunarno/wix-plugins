import wixUsers from 'wix-users';
import wixLocation from 'wix-location';
import wixPaidPlans from 'wix-paid-plans';

let userPlanUrl = "/choose-a-plan"; // fallback

async function getPlanPage() {
  const plans = await wixPaidPlans.getCurrentMemberOrders();

  if (plans.length > 0) {
    const planName = plans[0].planName;
    if (planName.includes("Tier 2")) return "/tier-2-membership";
    if (planName.includes("Tier 3")) return "/tier-3-membership";
    return "/membership-home"; // default for other plans
  } 
  return "/choose-a-plan"; // no plan
}

// On login: redirect immediately
wixUsers.onLogin(async () => {
  userPlanUrl = await getPlanPage();
  wixLocation.to(userPlanUrl);
});

$w.onReady(async () => {
  if (wixUsers.currentUser.loggedIn) {
    // User logged in
    userPlanUrl = await getPlanPage();

    // Show the button only for logged in users
    $w("#planButton").show();
  } else {
    // Not logged in, hide the button
    $w("#planButton").hide();
  }

  // Button click redirects to user's plan page
  $w("#planButton").onClick(() => {
    wixLocation.to(userPlanUrl);
  });
});
