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

// Function to go back to the previous page
function goBack() {
  const pages = ['landing', 'login', 'signup', 'home', 'feed', 'map', 'profile', 'tokens'];
  const currentPage = document.querySelector('.active-page').id;

  // Determine the previous page based on the current page
  let previousPage = 'landing'; // Default fallback
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

document.querySelectorAll('.account-button').forEach(button => {
  button.addEventListener('click', function() {
      document.querySelectorAll('.account-button').forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
  });
});

// script.js like button
function toggleLike(button) {
  const heartIcon = button.querySelector('i');
  const likeCount = button.querySelector('.like-count');
  
  if (heartIcon.classList.contains('far')) {
      heartIcon.classList.remove('far');
      heartIcon.classList.add('fas');
      likeCount.textContent = parseInt(likeCount.textContent) + 1;
      button.classList.add('liked');
  } else {
      heartIcon.classList.remove('fas');
      heartIcon.classList.add('far');
      likeCount.textContent = parseInt(likeCount.textContent) - 1;
      button.classList.remove('liked');
  }
}

function logOut() {
  showPage('landing'); // Redirect to the landing page
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

  function submitContactForm() {
    // Grab values from all input fields
    const fullName = document.querySelector('#contactUs input[placeholder="Full Name"]').value.trim();
    const email = document.querySelector('#contactUs input[placeholder="Email Address"]').value.trim();
    const subject = document.querySelector('#contactUs input[placeholder="Subject"]').value.trim();
    const message = document.querySelector('#contactUs .message-input').value.trim();

    // Check if at least one field is filled
    if (!fullName && !email && !subject && !message) {
        // If all fields are empty, allow users to bypass submission
        alert("You can skip filling out the form, but at least one field must be filled to submit.");
        return;
    }

    // Validate individual fields (if filled)
    if ((fullName && fullName.length < 2) || 
        (email && !email.includes('@')) || 
        (subject && subject.length < 2) || 
        (message && message.length < 10)) {
        alert("Please ensure all filled fields are valid.");
        return;
    }

    // Simulate form submission (replace with actual backend logic)
    console.log("Form Submitted:", { fullName, email, subject, message });
    alert("Thank you for contacting us! We will get back to you soon.");

    // Clear the form after submission
    document.querySelector('#contactUs input[placeholder="Full Name"]').value = "";
    document.querySelector('#contactUs input[placeholder="Email Address"]').value = "";
    document.querySelector('#contactUs input[placeholder="Subject"]').value = "";
    document.querySelector('#contactUs .message-input').value = "";

    // Optionally, redirect to another page
    showPage('home');
}