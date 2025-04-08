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
    const message = document.querySelector(
      "#contactUs .message-input"
    ).value;

    if (!fullName || !email || !subject || !message) {
      alert("Please fill out all fields.");
      return;
    }

    console.log("Form Submitted:", { fullName, email, subject, message });
    alert("Thank you for contacting us! We will get back to you soon.");

    // Clear the form
    document.querySelector(
      '#contactUs input[placeholder="Full Name"]'
    ).value = "";
    document.querySelector(
      '#contactUs input[placeholder="Email Address"]'
    ).value = "";
    document.querySelector(
      '#contactUs input[placeholder="Subject"]'
    ).value = "";
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

// Detect selected account type on SIGN UP and redirect accordingly
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active-page');
        page.classList.add('hidden'); // Ensure all are hidden before showing
    });

    // Show requested page
    const pageToShow = document.getElementById(pageId);
    if (pageToShow) {
        pageToShow.classList.remove('hidden');
        pageToShow.classList.add('active-page');
    } else {
        console.error(`Error: Page with ID '${pageId}' not found.`);
    }
}

// Initially hide all pages except the landing/get started page
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.page').forEach(page => {
        if (page.id !== 'landing') { // Assuming your initial "get started" page has id="landing"
            page.classList.add('hidden');
        } else {
            page.classList.add('active-page');
        }
    });

    // Add event listeners to the "Get Started" buttons
    const getStartedBusinessButton = document.querySelector('#landing .account-button.business');
    const getStartedCustomerButton = document.querySelector('#landing .account-button.customer');

    if (getStartedBusinessButton) {
        getStartedBusinessButton.addEventListener('click', function() {
            showPage('businessProfile');
        });
    } else {
        console.warn("Warning: 'Get Started Business' button not found on the landing page.");
    }

    if (getStartedCustomerButton) {
        getStartedCustomerButton.addEventListener('click', function() {
            showPage('customerOriginal'); // Assuming your original customer code is on a page with id="customerOriginal"
        });
    } else {
        console.warn("Warning: 'Get Started Customer' button not found on the landing page.");
    }
});

// Detect selected account type on SIGN UP and redirect accordingly
document.getElementById("signupConfirmButton").addEventListener("click", function () {
    const selected = document.querySelector("#signup .account-button.active");
    if (!selected) {
        alert("Please select an account type.");
        return;
    }

    const role = selected.textContent.trim();
    if (role === "BUSINESS") {
        showPage("businessProfile"); // Redirect to business page
    } else if (role === "CUSTOMER") {
        // Assuming your original customer flow is triggered here
        showPage("customerOriginal"); // Show the original customer page
    }
});

document.querySelectorAll('.account-button').forEach(button => {
    button.addEventListener('click', function () {
        document.querySelectorAll('.account-button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});

function goBack() {
    // Implement your go back functionality here
    console.log("Go back functionality needs implementation.");
}

function toggleFollow() {
    const followButton = document.getElementById('follow-button');
    if (followButton) {
        if (followButton.textContent === 'Follow') {
            followButton.textContent = 'Following';
        } else {
            followButton.textContent = 'Follow';
        }
    }
}