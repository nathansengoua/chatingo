<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit();
}
include 'includes/auth.php';
requireLogin();

$pageTitle = "Chat Room - Chatingo";
$pageCss = "chatstyle.css";
$pageJs = "chatscript.js";
include 'includes/header.php';
?>
<main>
<section id="userspanel">
    <div class="logo">chaingo</div>
    <div class="searchbox">
        <input type="search" id="searchusers" placeholder="Search users...">
        <ul id="searchresults"></ul>
    </div>
    <div class="oldchats"></div>

</section>
<section id="discusion-container">
<div class="container">
    <div id="chat-header">Select a user to start chatting</div>
    <div id="messages"></div>
        <form id="message-form" style="display: none;">
            <input type="text" id="message" placeholder="Type a message..." required>
            <button type="submit">Send</button>
        </form>
</div>
</section>
<section id="usersprofile">
    
</section>
<div class="logout"><a href="php/logout.php">
    <i class="fa fa-sign-out" aria-hidden="true"></i>
</a></div>
</main>

</body>
</html>