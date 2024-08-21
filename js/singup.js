document.addEventListener("DOMContentLoaded", function() {
    const signupform = document.querySelector(".signupform");
    const errorbox = document.getElementById('signup-erro-msg');

    signupform.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        try {
            const response = await fetch('php/signupsubmit.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            if (result.status === 'success') {
                alert("success");
                errorbox.style.display = "flex";
                errorbox.style.backgroundColor = "rgba(0, 255, 0, 0.541)";
                errorbox.textContent = result.message;
                setTimeout(() => {
                    errorbox.style.display = "none";
                }, 2000);
                setTimeout(() => {
                    window.location.href = 'chat.php';
                }, 1000);  // Optional: Delay redirection to show the success message
            } else {
                errorbox.style.display = "flex";
                errorbox.style.backgroundColor = "rgba(255, 0, 0, 0.753)";
                errorbox.textContent = result.message;
                setTimeout(() => {
                    errorbox.style.display = "none";
                }, 2000);
            }
        } catch (error) {
            console.error("Error during signup:", error);
            errorbox.style.display = "flex";
            errorbox.style.backgroundColor = "rgba(255, 0, 0, 0.753)";
            errorbox.textContent = "An error occurred during signup.";
            setTimeout(() => {
                errorbox.style.display = "none";
            }, 2000);
        }
    });
});
