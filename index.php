<?php
$pageTitle = 'Login | Signup';
$pageCss = 'login_signupstyles.css';
$pageJs = 'loginsignupscript.js';
$mediaqueryCSS='login_signup_responsive.css';
include 'includes/header.php';
?>
<body>
    <header>
        <div class="logo"><span>chatingo</span></div>
        <nav>
            <ul>
                <li><a href="#">About us</a></li>
                <li><a href="#" id="signuplink">Signup</a></li>
            </ul>
        </nav>
    </header>
<section>
        <div class="main container">            
			<div class="login container" id="login-wrapper">
				<div class="erro-msg">hiii</div>
				<div class="typing-container">
					<p id="typing-text"></p>
				</div>
				<form class="loginform" >
					<div class="input-wrapper">
						<input type="text" id="usr"  name="username" required>
						<label for="usr" class="label">username</label>
						<i class="fa fa-user" aria-hidden="true"></i>
					</div>
					<div class="input-wrapper">
						<input type="password" id="pswd" name="password" required>
						<label for="pswd" class="label">Password</label>
						<i class="fa fa-key" aria-hidden="true"></i>
						<i class="fa fa-eye" id="togglePassword1" aria-hidden="true"></i>
					</div>
					<button type="submit">Login</button>
								
				</form>
				<div class="other-login">
					<a href="#"></a><i class="fa fa-facebook" aria-hidden="true"></i></a>
					<a href="http://"><i class="fa fa-google" aria-hidden="true"></i></a>
					
				</div>
				<div class="lbox">Don't have an acount ? <span id="signuplink">signup</span></div>            

			</div>
			<div class="signup container" id="signup-wrapper">
				<div class="erro-msg"></div>
				<span class="signuplogo">sign up</span>
				<form class="signupform">
					<div class="names">
						<div class="ffiled input">					
							<label for="fname">First name</label>
							<input type="text" name="fname" id="fname" required>
						</div>
						<div class="lfiled input">					
							<label for="lname">last name</label>
							<input type="text" name="lname" id="lname" required>
						</div>
					</div>
					<div class="input">
					<label for="uname">Username</label>
					<input type="text" name="uname" id="uname" required>
					<i class="fa fa-user" aria-hidden="true"></i>
					</div>
					<div class="input">
					<label for="email">Email</label>
					<input type="email" name="email" id="email">
					<i class="fas fa-mail-bulk    "></i>
					</div>
					<div class="input">
						<label for="password">Password</label>
						<input type="password" name="password" id="password" required>
						<i class="fa fa-lock" aria-hidden="true"></i>
						<i class="fa fa-eye" id="togglePassword2"aria-hidden="true"></i>					
					</div>
					<div class="input">
					<label for="pimg">Profile Image</label>
					<input type="file" name="pimg" id="pimg" accept=".jpg, .jpeg, .png, .gif" required>
					</div>
					<div class="button-container">
						<button type="submit">Sign up</button>
					</div>
				</form>
				
				<div class="sbox">already have an acount ? <span id="signinlink">Login</span></div> 
			</div>

        </div>              
            
    </section>
    
<?php include 'includes/footer.php' ?>
<script src="js/login.js" ></script>
<script src="js/singup.js" ></script>
<footer style="text-align: center;">
        <p>&copy; <?php echo date('Y'); ?> My Website. All rights reserved.</p>
    </footer>
</body>
</html>