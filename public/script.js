function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active-page');
    });
    
    // Show requested page
    document.getElementById(pageId).classList.add('active-page');
}

// Initialize with landing page
document.addEventListener('DOMContentLoaded', () => {
    showPage('landing');
});

// Function to go back to the previous page
function goBack() {
    const pages = ['landing', 'login', 'signup', 'home', 'feed', 'map', 'profile', 'tokens'];
    const currentPage = document.querySelector('.active-page').id;

    // Determine the previous page based on the current page
    let previousPage = 'landing'; // Default fallback
    switch (currentPage) {
        case 'login':
            previousPage = 'landing';
            break;
        case 'signup':
            previousPage = 'landing';
            break;
        case 'home':
            previousPage = 'landing'; // Or adjust as needed
            break;
        case 'feed':
            previousPage = 'home';
            break;
        case 'map':
            previousPage = 'home';
            break;
        case 'profile':
            previousPage = 'home';
            break;
        case 'tokens':
            previousPage = 'home';
            break;
        case 'starOfTheWeek':
            previousPage = 'home';
            break;    
        case 'settings':
            previousPage = 'profile';
            break; 
        case 'editProfile':
             previousPage = 'settings';
            break;
        case 'favorites':
            previousPage = 'settings';
            break;
        case 'friends':
            previousPage = 'settings';
            break;
        case 'contactUs':
            previousPage = 'settings';
            break;
        case 'scanToken':
            previousPage = 'tokens';
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

// Add to your existing script.js
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

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active-page');
    });

    // Show requested page
    document.getElementById(pageId).classList.add('active-page');
}

function logOut() {
    showPage('landing'); // Redirect to the landing page
}

// Function to handle contact form submission
function submitContactForm() {
    // Get form values
    const fullName = document.querySelector('#contactUs input[placeholder="Full Name"]').value;
    const email = document.querySelector('#contactUs input[placeholder="Email Address"]').value;
    const subject = document.querySelector('#contactUs input[placeholder="Subject"]').value;
    const message = document.querySelector('#contactUs .message-input').value;

    // Validate form fields
    if (!fullName || !email || !subject || !message) {
        alert("Please fill out all fields.");
        return;
    }

    // Simulate form submission (replace with actual backend logic)
    console.log("Form Submitted:", { fullName, email, subject, message });
    alert("Thank you for contacting us! We will get back to you soon.");

    // Clear the form
    document.querySelector('#contactUs input[placeholder="Full Name"]').value = "";
    document.querySelector('#contactUs input[placeholder="Email Address"]').value = "";
    document.querySelector('#contactUs input[placeholder="Subject"]').value = "";
    document.querySelector('#contactUs .message-input').value = "";

    // Optionally, redirect to another page
    showPage('home');
}

// Function to toggle like button
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

