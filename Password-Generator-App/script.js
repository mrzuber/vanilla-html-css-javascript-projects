// Selecting necessary HTML elements
const passwordField = document.getElementById('password');
const lengthInput = document.getElementById('length');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');

// Defining character sets for password generation
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '@#$';

// Function to generate a random password based on selected options
function generatePassword() {
    let characters = '';
    
    // Checking which character types are selected and adding them to the pool
    if (uppercaseCheckbox.checked) characters += uppercaseLetters;
    if (lowercaseCheckbox.checked) characters += lowercaseLetters;
    if (numbersCheckbox.checked) characters += numbers;
    if (symbolsCheckbox.checked) characters += symbols;
    
    // If no character type is selected, show an alert and stop the function
    if (!characters) {
        alert('Please select at least one character type!');
        return;
    }

    let password = '';
    const length = parseInt(lengthInput.value); // Getting the desired password length
    
    // Looping through the specified length to create the password
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length); // Selecting a random character
        password += characters[randomIndex];
    }

    passwordField.value = password; // Displaying the generated password in the input field
}

// Function to copy the generated password to the clipboard
function copyPassword() {
    passwordField.select();
    document.execCommand('copy');
}

// Adding event listeners to buttons
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);