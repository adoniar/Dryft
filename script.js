// Static list of items
const redemptionTokens = [
  {
    code: "DRYFT1",
    name: "National Park Token",
    redeemImage: "images/NATPARK.gif",
  },
  {
    code: "DRYFT2",
    name: "Sushi Haven Token",
    redeemImage: "images/SUSHITOKENGIF.gif",
  },
  {
    code: "DRYFT3",
    name: "Pizza Planet Token",
    redeemImage: "images/token3.png",
  },
];

// Elements for redemption
const redeemButton = document.getElementById("redeem-button");
const codeInput = document.getElementById("redemption-code");
const errorMessage = document.getElementById("redemption-message");
const tokenDetails = document.getElementById("token-info");
const tokenName = document.getElementById("token-name");
const tokenDescription = document.getElementById("token-description");
const tokenImage = document.getElementById("token-image");
const addToCollectionButton = document.getElementById("addToCollectionButton");

// Handle redemption button click
redeemButton.addEventListener("click", function () {
  const code = codeInput.value.trim().toUpperCase();
  const redemptionItem = redemptionTokens.find((item) => item.code === code);

  if (redemptionItem) {
    // Show token details
    tokenName.textContent = redemptionItem.name;
    tokenDescription.textContent = redemptionItem.description;
    tokenImage.src = redemptionItem.redeemImage;
    tokenDetails.style.display = "block";
    errorMessage.textContent = ""; // Clear error message

    // Hide the redemption form
    document.querySelector(".redemption-form").style.display = "none";
  } else {
    // Show error message if code is not found
    tokenDetails.style.display = "none";
    errorMessage.textContent = "Code not found!";
  }
});

// Add to collection button click handler
addToCollectionButton.addEventListener("click", function () {
  alert(`You have added ${tokenName.textContent} to your collection!`);
});

// Show a given page by ID, hide others
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active-page");
  });
  // Show the requested page
  document.getElementById(pageId).classList.add("active-page");

  // Hide or show the nav bar based on page
  const navBar = document.getElementById("globalNavBar");
  if (pageId === "landing" || pageId === "login" || pageId === "signup") {
    navBar.style.display = "none";
  } else {
    navBar.style.display = "flex";
  }
  if (pageId === "redemption") {
    tokenDetails.style.display = "none";
    errorMessage.textContent = "";
    codeInput.value = "";
    document.querySelector(".redemption-form").style.display = "block";
  }
}

// Initialize with landing page
document.addEventListener("DOMContentLoaded", () => {
  showPage("landing");
});

// Function to go back to the previous page
function goBack() {
  // Hide token info details when going back
  tokenDetails.style.display = "none";
  const pages = [
    "landing",
    "login",
    "signup",
    "home",
    "feed",
    "map",
    "profile",
    "tokens",
  ];
  const currentPage = document.querySelector(".active-page").id;

  // Determine the previous page based on the current page
  let previousPage = "landing"; // Default fallback
  switch (currentPage) {
    case "login":
    case "signup":
      previousPage = "landing";
      break;
    case "home":
      previousPage = "landing";
      break;
    case "feed":
    case "map":
    case "profile":
    case "tokens":
    case "starOfTheWeek":
      previousPage = "home";
      break;
    case "settings":
      previousPage = "profile";
      break;
    case "editProfile":
    case "favorites":
    case "friends":
    case "contactUs":
      previousPage = "settings";
      break;
    case "scanToken":
      previousPage = "tokens";
      break;
    case "redemption":
      previousPage = "scanToken";
      break;
  }

  showPage(previousPage);
}

document.querySelectorAll(".account-button").forEach((button) => {
  button.addEventListener("click", function () {
    document
      .querySelectorAll(".account-button")
      .forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
  });
});

// script.js like button
function toggleLike(button) {
  const heartIcon = button.querySelector("i");
  const likeCount = button.querySelector(".like-count");

  if (heartIcon.classList.contains("far")) {
    heartIcon.classList.remove("far");
    heartIcon.classList.add("fas");
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
    button.classList.add("liked");
  } else {
    heartIcon.classList.remove("fas");
    heartIcon.classList.add("far");
    likeCount.textContent = parseInt(likeCount.textContent) - 1;
    button.classList.remove("liked");
  }
}

function logOut() {
  showPage("landing"); // Redirect to the landing page
}

// Submit Contact Form
function submitContactForm() {
  const fullName = document.querySelector(
    '#contactUs input[placeholder="Full Name"]'
  ).value;
  const email = document.querySelector(
    '#contactUs input[placeholder="Email Address"]'
  ).value;
  const subject = document.querySelector(
    '#contactUs input[placeholder="Subject"]'
  ).value;
  const message = document.querySelector("#contactUs .message-input").value;

  if (!fullName || !email || !subject || !message) {
    alert("Please fill out all fields.");
    return;
  }

  console.log("Form Submitted:", { fullName, email, subject, message });
  alert("Thank you for contacting us! We will get back to you soon.");

  // Clear the form
  document.querySelector('#contactUs input[placeholder="Full Name"]').value =
    "";
  document.querySelector(
    '#contactUs input[placeholder="Email Address"]'
  ).value = "";
  document.querySelector('#contactUs input[placeholder="Subject"]').value = "";
  document.querySelector("#contactUs .message-input").value = "";

  showPage("home");
}

// Toggle Follow button text
function toggleFollow() {
  const btn = document.getElementById("follow-button");
  if (btn.innerText === "Follow") {
    btn.innerText = "Unfollow";
  } else {
    btn.innerText = "Follow";
  }
}

// Save Edit Profile changes
async function saveProfileChanges() {
  const fullNameInput = document.getElementById("full-name");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const bioInput = document.getElementById("bio");

  if (!fullNameInput || !usernameInput || !emailInput || !bioInput) {
    alert("Edit Profile page is not fully loaded. Please try again.");
    return;
  }

  // Log values to verify that they are read correctly
  const name = fullNameInput.value.trim();
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const bio = bioInput.value; // For a textarea, .value should work fine

  console.log("Saving profile changes:", { name, username, email, bio });

  // Use the currently displayed profile picture (all elements with class 'profile-pic')
  const profilePic = document.querySelector(".profile-pic").src;

  const profileData = {
    name: name,
    username: username,
    bio: bio,
    profilePic: profilePic,
  };

  try {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(profileData),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Profile updated successfully!");
      showPage("profile");
    } else {
      alert("Error updating profile: " + (data.error || "Unknown error"));
    }
  } catch (error) {
    console.error("Error in saveProfileChanges:", error);
    alert("Error saving changes");
  }
}

// Authentication Functions
// - When all inputs are empty, an alert informs the user that the fields have been bypassed, and the function exits early without performing its main logic.
// - When some but not all inputs are filled, the user is prompted to complete all fields before proceeding.

// This approach keeps the groups demo live

// Login User: Collects credentials, sends them to the server, and handles response.
async function loginUser(event) {
  event?.preventDefault();
  const inputs = document.querySelectorAll("#login .auth-input");
  const username = inputs[0]?.value.trim();
  const password = inputs[1]?.value.trim();

  // Demo bypass: if both fields are empty
  if (!username && !password) {
    alert("All fields have been bypassed for a demo.");
    showPage("home");
    return;
  }

  // Require both fields
  if (!username || !password) {
    alert("Please complete all required fields.");
    return;
  }

  // Simulated login success (demo mode)
  alert("Welcome back!");
  localStorage.setItem("token", "demo-token"); // optional fake token
  showPage("home");
}

//Registers users
function registerUser() {
  const inputs = document.querySelectorAll("#signup .auth-input");
  const fullName = inputs[0]?.value.trim();
  const email = inputs[1]?.value.trim();
  const username = inputs[2]?.value.trim();
  const password = inputs[3]?.value.trim();

  // Bypass demo logic
  if (!fullName && !email && !username && !password) {
    alert("All fields have been bypassed for a demo.");
    showPage("home");
    return;
  }

  // Required fields check
  if (!fullName || !email || !username || !password) {
    alert("Please complete all required fields.");
    return;
  }

  // Email must contain '@'
  if (!email.includes("@")) {
    alert("Please enter a valid email address.");
    return;
  }

  // Simulated registration success
  alert("Registration successful! You can now log in.");
  showPage("login");
}

// Profile Functions

// Load user profile data from localStorage and update the Profile and Edit Profile pages.
async function loadUserProfile() {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/profile", {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
    if (res.ok) {
      const userProfile = await res.json();
      // Update the profile picture in all elements with class "profile-pic"
      const profilePicSrc =
        userProfile.profilePic || "images/placeholder-profile.png";
      document.querySelectorAll(".profile-pic").forEach((img) => {
        img.src = profilePicSrc;
      });
      // Update the Profile page fields
      const profilePage = document.querySelector("#profile");
      if (profilePage) {
        // Display the username. If no username exists, fall back to name.
        profilePage.querySelector(".username").innerText =
          userProfile.username || userProfile.name || "";
        profilePage.querySelector(".tokens-count").innerText =
          userProfile.followers;
        profilePage.querySelector(".ranking-number").innerText =
          userProfile.following;
        profilePage.querySelector(".profile-bio").innerText =
          userProfile.bio || "";
      }
      // Update the Edit Profile form fields
      if (document.getElementById("full-name"))
        document.getElementById("full-name").value = userProfile.name || "";
      if (document.getElementById("username"))
        document.getElementById("username").value = userProfile.username || "";
      if (document.getElementById("email"))
        document.getElementById("email").value = userProfile.email || "";
      if (document.getElementById("bio"))
        document.getElementById("bio").innerText = userProfile.bio || "";
    } else {
      console.error("Profile not found or error retrieving profile.");
    }
  } catch (err) {
    console.error("Error loading profile:", err);
  }
}

function handleProfilePicUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const currentUserEmail = localStorage.getItem("currentUserEmail");
      if (!currentUserEmail) return; // Make sure a user is logged in.

      const profileKey = "userProfile_" + currentUserEmail;
      let userProfile = localStorage.getItem(profileKey);
      if (userProfile) {
        userProfile = JSON.parse(userProfile);
      } else {
        // Create default profile if it somehow doesn't exist.
        userProfile = {
          name: "",
          email: currentUserEmail,
          bio: "",
          profilePic: "",
          followers: 0,
          following: 0,
        };
      }
      // Update the profile picture in this user's data.
      userProfile.profilePic = e.target.result;
      localStorage.setItem(profileKey, JSON.stringify(userProfile));

      // Update the displayed profile picture on the page.
      document.querySelectorAll(".profile-pic").forEach((img) => {
        img.src = e.target.result;
      });

      alert("Profile picture updated!");
    };
    reader.readAsDataURL(file);
  }
}

// Save updated profile data from the Edit Profile page into localStorage.
function saveUserProfile() {
  const currentUserEmail = localStorage.getItem("currentUserEmail");
  if (!currentUserEmail) {
    alert("No user is logged in!");
    return;
  }

  const name = document.getElementById("full-name").value;
  const email = document.getElementById("email").value;
  const bio = document.getElementById("bio").value;
  const profileKey = "userProfile_" + currentUserEmail;

  // Retrieve existing profile to preserve profilePic, followers, and following.
  let existingProfile = localStorage.getItem(profileKey);
  let profilePic = "";
  let followers = 0,
    following = 0;
  if (existingProfile) {
    const parsedProfile = JSON.parse(existingProfile);
    profilePic = parsedProfile.profilePic || "";
    followers = parsedProfile.followers || 0;
    following = parsedProfile.following || 0;
  }

  const userProfile = {
    name: name,
    email: email,
    bio: bio,
    profilePic: profilePic,
    followers: followers,
    following: following,
  };

  localStorage.setItem(profileKey, JSON.stringify(userProfile));
  alert("Profile saved!");
  showPage("profile");
  loadUserProfile();
}
