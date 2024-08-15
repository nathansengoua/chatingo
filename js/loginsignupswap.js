const text = "Hello, Welcome Back!!";
const typingTextElement = document.getElementById('typing-text');
let index = 0;
let deleting = false;

function type() {
    if (!deleting) {
        // Typing phase
        if (index < text.length) {
            typingTextElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100); // Typing speed
        } else {
            deleting = true;
            setTimeout(type, 2000); // Pause before starting to delete
        }
    } else {
        // Deleting phase
        if (index > 0) {
            typingTextElement.textContent = typingTextElement.textContent.slice(0, -1);
            index--;
            setTimeout(type, 50); // Deleting speed
        } else {
            deleting = false;
            setTimeout(type, 2000); // Pause before starting to type again
        }
    }
}

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    type();
});

document.addEventListener('DOMContentLoaded', function() {
   const loginbtn = document.getElementById('signuplink');
   const signupbtn = document.getElementById('signinlink');
   const loginpage = document.getElementById('login-wrapper');
   const signuppage = document.getElementById('signup-wrapper');
   
   
   if(signuppage.style.display == 'flex'){
    loginpage.style.display= 'flex';
    signuppage.style.display = 'none';
   }else{
    loginpage.style.display= 'none';
    signuppage.style.display = 'flex';
   }
   loginbtn.addEventListener('click', function() {
        signuppage.style.display = 'flex';
        loginpage.style.display = 'none';
    });

    signupbtn.addEventListener('click', function() {
        signuppage.style.display = 'none';
        loginpage.style.display = 'flex';
    });

});