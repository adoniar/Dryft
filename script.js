// Static list of items
const redemptionTokens = [
  {
    code: "DRYFT1",
    name: "Blossom Park Token",
    redeemImage: "images/FIXEDParkgif.gif",
  },
  {
    code: "DRYFT2",
    name: "Sushi Haven Token",
    redeemImage: "images/FIXEDSushigif.gif",
  },
  {
    code: "DRYFT3",
    name: "Morning Roast Token",
    redeemImage: "images/FIXEDCoffeegif.gif",
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
  alert(`You have added the ${tokenName.textContent} to your collection!`);
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
}

// Initialize with landing page
document.addEventListener("DOMContentLoaded", () => {
  showPage("landing");
});

// Go Back function to handle "back-button" logic
function goBack() {
  const currentPage = document.querySelector(".active-page").id;
  let previousPage = "landing";

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

// Toggle "active" class on account type buttons
document.querySelectorAll(".account-button").forEach((button) => {
  button.addEventListener("click", function () {
    document
      .querySelectorAll(".account-button")
      .forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
  });
});

// Like button toggle
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

// Log out
function logOut() {
  showPage("landing");
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

// Save Edit Profile changes (placeholder)
function saveProfileChanges() {
  alert("Profile changes saved!");
  showPage("profile");
}

// Authentication Functions
// Login User: Collects credentials, sends them to the server, and handles response.
async function loginUser() {
  // Grab login inputs from the #login page.
  const inputs = document.querySelectorAll("#login .auth-input");
  const email = inputs[0] ? inputs[0].value : "";
  const password = inputs[1] ? inputs[1].value : "";

  console.log("Attempting login with:", email, password);

  if (!email || !password) {
    alert("Please enter both your username (email) and password.");
    return;
  }

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      // Save token to localStorage for future requests.
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      showPage("home");
    } else {
      alert(data.error || "Login failed.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login.");
  }
}

// Register User: Collects new user details and sends them to the server.
async function registerUser() {
  // Grab signup inputs from the #signup page.
  // Expected order: Full Name, Email, Username, Password.
  const inputs = document.querySelectorAll("#signup .auth-input");
  const fullName = inputs[0] ? inputs[0].value : "";
  const email = inputs[1] ? inputs[1].value : "";
  // We'll ignore the third input (Username) since the server uses "name" for registration.
  const password = inputs[3] ? inputs[3].value : "";

  if (!fullName || !email || !password) {
    alert("Please fill out all required fields.");
    return;
  }

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fullName,
        email,
        password,
        preferences: "",
      }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Registration successful! Please log in.");
      showPage("login");
    } else {
      alert(data.error || "Registration failed.");
    }
  } catch (error) {
    console.error("Registration error:", error);
    alert("An error occurred during registration.");
  }
}
