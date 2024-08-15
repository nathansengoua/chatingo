document.addEventListener("DOMContentLoaded", function() {
    const errorbox = document.querySelector(".erro-msg");
    document.querySelector(".signupform").addEventListener('submit', async function(e) {
        e.preventDefault();
    
        const formData = new FormData(this);
        try {
            const response = await fetch('php/signupsubmit.php', {
                method: 'POST',
                body: formData
            });
        
            const result = await response.json();
            errorbox.style.display = "flex";
            errorbox.textContent = result.message;
            
            if (result.status === 'success') {
                alert('Registration successful!');
                setTimeout(() => {
                    window.location.href = "chat.php";
                }, 1000);  // Adding a delay to ensure the message is seen before redirect
            } else {
                alert(result.message);
            }
        } catch (error) {
            errorbox.style.display = "flex";
            errorbox.textContent = "An unexpected error occurred. Please try again.";
            console.error("Error during signup:", error);
        }
    });
});
