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

document.addEventListener('DOMContentLoaded', function() {
    type();
});

// swap scrip

document.addEventListener('DOMContentLoaded', function() {
    const loginbtn = document.getElementById('signuplink');
    const signupbtn = document.getElementById('signinlink');
    const loginpage = document.getElementById('login-wrapper');
    const signuppage = document.getElementById('signup-wrapper');
    const toggleLink = document.getElementById('togglelink');

    loginpage.style.display = 'flex';
    toggleLink.textContent = 'Signup';
    signupbtn.addEventListener('click', function() {
            signuppage.style.display = 'none';
            loginpage.style.display = 'flex';
    });

    loginbtn.addEventListener('click', function() {
            loginpage.style.display = 'none';
            signuppage.style.display = 'flex';
    });
     
    
    toggleLink.addEventListener('click', function() {
        if (signuppage.style.display === 'none') {
            // If currently on the login page, switch to the signup page
            loginpage.style.display = 'none';
            signuppage.style.display = 'flex';
            toggleLink.textContent = 'Login'; // Change the link text to "Login"
        } else {
            // If currently on the signup page, switch to the login page
            signuppage.style.display = 'none';
            loginpage.style.display = 'flex';
            toggleLink.textContent = 'Signup'; // Change the link text to "Signup"
        }
    });

});

//show password script
document.addEventListener('DOMContentLoaded', function () {
    const eyeIcon1 = document.getElementById('togglePassword1');
    const eyeIcon2 = document.getElementById('togglePassword2');
    const passwordInput1 = document.getElementById('pswd');
    const passwordInput2 = document.getElementById('password');
    

    function showpass(passwordInput,eyeIcon){
        eyeIcon.addEventListener('click', function () {
            const isPassword = passwordInput.getAttribute('type') === 'password';

            if (isPassword) {
                passwordInput.setAttribute('type', 'text');
                eyeIcon.classList.remove('fa-eye');
                eyeIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.setAttribute('type', 'password');
                eyeIcon.classList.remove('fa-eye-slash');
                eyeIcon.classList.add('fa-eye');
            }

            eyeIcon.classList.toggle('active');
        });
    }

    showpass(passwordInput1,eyeIcon1);
    showpass(passwordInput2,eyeIcon2);

});