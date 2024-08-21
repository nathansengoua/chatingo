document.addEventListener("DOMContentLoaded", function(){
    const loginForm = document.querySelector(".loginform");
    const errorbox = document.getElementById('login-erro-msg');

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
    
        const formData = new FormData(this);
        try {
            const response = await fetch('php/loginsubmit.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
             
            if (result.status === 'success') {
                errorbox.style.display = "flex";
                errorbox.style.backgroundColor = "rgba(0, 255, 0, 0.541)";
                errorbox.textContent = result.message;
            setTimeout(() => {
                errorbox.style.display = "none";
            },2000);
                setTimeout(() => {
                    window.location.href = 'chat.php';
                }, 1000);  // Optional: Delay redirection to show the success message
            } else {
                errorbox.style.display = "flex";
            errorbox.style.backgroundColor = "rgba(255, 0, 0, 0.753)";
            errorbox.textContent = result.message
            setTimeout(() => {
                errorbox.style.display = "none";
            },2000);
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    });
});
