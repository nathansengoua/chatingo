document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchusers');
    const usersList = document.getElementById('searchresults');
    const oldChatsDiv = document.getElementById('oldchats');
    const chatHeader = document.getElementById('chat-header');
    const messagesDiv = document.getElementById('messages');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message');
    const usersbox = document.querySelector(".usersactions");
    const completusersbox = document.getElementById('profile-info');
    let currentusername = null;
    let currentChatId = null;
    
    async function loaduserparm() {
        try {
            const response = await fetch('includes/load_data.php');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const userparm = await response.json();
    
            // Ensure that userparm is an array and has at least one item
            if (userparm.length > 0) {
                const user = userparm[0]; 
                currentusername = user.username;
                console.log("Username:", currentusername);
                    
                usersbox.innerHTML = `
                    <img src="uploads/${user.Profile_image}" alt="Profile Picture">
                    <div class="user-info">
                        <span class="profile-name"><b>Me</b></span>
                        <span class="profile-status ${user.status.toLowerCase()}">${user.status}</span>
                    </div>
                ` + usersbox.innerHTML;
    
                completusersbox.innerHTML = `
                    <div>
                        <img src="uploads/${user.Profile_image}" alt="Profile Picture" style="width: 100px; height: 100px;">
                        <button>Modify</button>
                    </div>
                    <div>
                        <span>First Name:</span>
                        <span>${user.Firstname}</span>
                        <button>Modify</button>
                    </div>
                    <div>
                        <span>Last Name:</span>
                        <span>${user.Lastname}</span>
                        <button>Modify</button>
                    </div>
                    <div>
                        <span>Username:</span>
                        <span>${user.username}</span>
                        <button>Modify</button>
                    </div>
                    <div>
                        <span>Email:</span>
                        <span>${user.email}</span>
                        <button>Modify</button>
                    </div>
                    <div>
                        <span>Password:</span>
                        <span>********</span>
                        <button>Modify</button>
                    </div>
                `;
            } else {
                throw new Error('No user data found');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            usersbox.innerHTML = '<div>Error loading personal info. Please try again later.</div>';
        }
    }
    
    loaduserparm();
    

    async function loadOldChats() {
        try {
            const response = await fetch('php/fetch_old_chats.php');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const chats = await response.json();
            oldChatsDiv.innerHTML = chats.map(user => 
                `<div data-user-id="${user.userid}">
                    <img src="uploads/${user.Profile_image}" alt="Profile Picture">
                    <div class="profile-details">
                        <span class="profile-name">${user.username}</span>
                        <span class="profile-status ${user.status.toLowerCase()}">${user.status}</span>
                    </div>
                </div>`).join('');
        } catch (error) {
            console.error('Fetch error:', error);
            oldChatsDiv.innerHTML = '<div>Error loading chats. Please try again later.</div>';
        }
    }

    searchInput.addEventListener('input', async () => {
        const query = searchInput.value;
        if (query) {
            try {
                const response = await fetch(`php/search.php?query=${encodeURIComponent(query)}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const users = await response.json();
                usersList.style.display = 'flex';
                usersList.innerHTML = users.map(user => 
                    `<li data-user-id="${user.userid}">
                        <img src="uploads/${user.Profile_image}" alt="Profile Picture">
                        <div class="profile-details">
                            <span class="profile-name">${user.username}</span>
                            <span class="profile-status ${user.status.toLowerCase()}">${user.status}</span>
                        </div>
                    </li>`).join('');
            } catch (error) {
                console.error('Fetch error:', error);
                usersList.innerHTML = '<li>Error loading users. Please try again later.</li>';
            }
        } else {
            usersList.innerHTML = 'no result';
        }
    });   

    async function startchat(e) {
        usersList.style.display = 'none';
    
        const target = e.target.closest('div[data-user-id], li[data-user-id]');
        
        if (target) {
            const otherUserId = target.dataset.userId;
            const formdata = new FormData();
            formdata.append('other_user_id', otherUserId);
    
            try {
                const response = await fetch('includes/start_chat.php', {
                    method: 'POST',
                    body: formdata
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
                
                if (data && data.id) { // Check if the data object has an 'id' property
                    currentChatId = data.id;
                    console.log("currentChatId:", currentChatId);
    
                    // Clear the chatHeader before adding new user information
                    chatHeader.innerHTML = `
                    <div>
                        <img src="uploads/${data.Profile_image}" alt="Profile Picture">
                        <div class="profile-details">
                            <span class="profile-name">${data.username}</span>
                            <span class="profile-status ${data.status.toLowerCase()}">${data.status}</span>
                        </div>
                    </div>
                    `;
                    
                    document.querySelector(".container").style.display = 'flex';                
                    messageForm.style.display = 'flex';
                    fetchMessages();
                } else if (data.error) {
                    console.error('Error starting chat:', data.error);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
    }
    
    oldChatsDiv.addEventListener('click', startchat);
    usersList.addEventListener('click', startchat);
    
    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const message = messageInput.value;
        if (message && currentChatId) {
            const formdata = new FormData();
            formdata.append('chat_id', currentChatId );
            formdata.append('message', message);
            console.log('chatid', formdata);
            const response = await fetch('php/sendmessage.php', {
                method: 'POST',
                body: formdata
            });
            const data = await response.json();
            if (data.status === 'success') {
                messageInput.value = '';
                fetchMessages();
            }
        }
    });

    async function fetchMessages() {
        if (currentChatId) {
            const response = await fetch(`php/fetchmessages.php?chat_id=${currentChatId}`);
            const messages = await response.json();
            
            messagesDiv.innerHTML = messages.map(msg => {
                if (currentusername === msg.username) {
                    return `<div class="message current-user">
                                <span class="username">${msg.username}</span>
                                <br>
                                <span>${msg.message}</span>
                                <div class="timestamp">${msg.created_at}</div>
                            </div>`;
                } else {
                    return `<div class="message other-user">
                                <span class="username">${msg.username}</span>
                                <br>
                                <span>${msg.message}</span>
                                <div class="timestamp">${msg.created_at}</div>
                            </div>`;
                }
            }).join('');
    
            // Scroll to the bottom of the messages div
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    }
    

    setInterval(fetchMessages, 500); // Fetch messages every 500 milliseconds for real-time chat
    loadOldChats();
    
});

document.addEventListener('DOMContentLoaded',function(){
    const usersPanel = document.getElementById('userspanel');
    const resizeHandle = document.createElement('div');
    resizeHandle.id = 'resize-handle';
    usersPanel.appendChild(resizeHandle);
    resizeHandle.addEventListener('mousedown', function(e) {
        e.preventDefault();

        const startX = e.clientX;
        const startWidth = parseInt(document.defaultView.getComputedStyle(usersPanel).width, 10);

        function doDrag(e) {
            usersPanel.style.width = (startWidth + e.clientX - startX) + 'px';
        }

        function stopDrag() {
            document.documentElement.removeEventListener('mousemove', doDrag, false);
            document.documentElement.removeEventListener('mouseup', stopDrag, false);
        }

        document.documentElement.addEventListener('mousemove', doDrag, false);
        document.documentElement.addEventListener('mouseup', stopDrag, false);
    });

 
});
document.addEventListener('DOMContentLoaded', () => {
    // Existing code...
    const usersProfile = document.getElementById('usersprofile');
    const threeDotsMenu = document.querySelector(".three-dots-menu");
    

    threeDotsMenu.addEventListener('click', () => {
        usersProfile.style.display = usersProfile.style.display === 'flex' ? 'none' : 'flex';
    });

    document.querySelector('#usersprofile .close-icon').addEventListener('click', () => {
        usersProfile.style.display = 'none';
    });

    // Responsive adjustments for mobile
    /*const hamburgerMenu = document.createElement('div');
    hamburgerMenu.classList.add('hamburger-menu');
    hamburgerMenu.innerhtml = <i class="fa-solid fa-bars"></i>;*/
    document.querySelector('.logo').prepend(hamburgerMenu);

    hamburgerMenu.addEventListener('click', () => {
        const userActions = document.querySelector('.usersactions');
        userActions.style.display = userActions.style.display === 'flex' ? 'none' : 'flex';
    });

    // Additional code to handle showing/discussion-container on mobile
});
