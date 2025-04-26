// Function to show different forms
function showForm(formId) {
  const forms = ['loginForm', 'registerForm', 'forgotForm'];
  const loginCat = document.getElementById('loginCat');
  const registerCat = document.getElementById('registerCat');

  // Hide all forms
  forms.forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });

  // Show the selected form
  document.getElementById(formId).classList.remove('hidden');

  // Toggle cat images based on form
  if (formId === 'registerForm') {
    loginCat.classList.add('hidden');
    registerCat.classList.remove('hidden');
  } else {
    loginCat.classList.remove('hidden');
    registerCat.classList.add('hidden');
  }
}

// Function to handle login
function login() {
  const username = document.getElementById('usernameL').value;
  const password = document.getElementById('passwordL').value;

  // Handle login logic here
  if (username && password) {
    console.log('Logging in with', username, password);
    // Replace with your actual login logic (e.g., API request)
    alert('Login Successful!');
  } else {
    alert('Please enter both username and password.');
  }
}

// Function to handle register
function register() {
  const username = document.getElementById('usernameR').value;
  const name = document.getElementById('nameR').value;
  const password = document.getElementById('passwordR').value;

  // Handle register logic here
  if (username && name && password) {
    console.log('Registering with', username, name, password);
    // Replace with your actual registration logic (e.g., API request)
    alert('Registration Successful!');
  } else {
    alert('Please fill all the fields.');
  }
}

// Function to toggle between login and register forms
function toggleForm() {
  showForm('loginForm');
}

// Function to handle forgot password
function forgotPassword() {
  const email = document.querySelector('input[type="email"]').value;
  if (email) {
    console.log('Sending reset link to', email);
    // Replace with your actual password reset logic (e.g., API request)
    alert('Password reset link sent!');
  } else {
    alert('Please enter your email address.');
  }
}

// Automatically show the login form when the page loads
window.onload = function () {
  showForm('loginForm');
};