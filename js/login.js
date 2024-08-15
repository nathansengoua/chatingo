document.addEventListener("DOMContentLoaded", function(){
    const loginForm = document.querySelector(".loginform");
    const errorbox = document.querySelector(".erro-msg");

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
    
        const formData = new FormData(this);
        try {
            const response = await fetch('php/loginsubmit.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            errorbox.style.display = "flex";
            errorbox.textContent = result.message;
    
            if (result.status === 'success') {
                setTimeout(() => {
                    window.location.href = 'chat.php';
                }, 1000);  // Optional: Delay redirection to show the success message
            } else {
                alert(result.message);  // Optional: Keep alert to highlight the error
            }
        } catch (error) {
            errorbox.style.display = "flex";
            errorbox.textContent = "An unexpected error occurred. Please try again.";
            console.error("Login error:", error);
        }
    });
});
