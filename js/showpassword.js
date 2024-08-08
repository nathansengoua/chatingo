document.addEventListener('DOMContentLoaded', function () {
    const eyeIcon = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('pswd');

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
});
