document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchusers');
    const usersList = document.getElementById('searchresults');
    const chatHeader = document.getElementById('chat-header');
    const messagesDiv = document.getElementById('messages');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message');
    let currentChatId = null;

    searchInput.addEventListener('input', async () => {
        const query = searchInput.value;
        if (query) {
            const response = await fetch(`php/search.php?query=${query}`);
            const users = await response.json();
            usersList.style.display = 'flex';
            usersList.innerHTML = users.map(user => `<li data-user-id="${user.userid}">${user.username}</li>`).join('');
        } else {
            usersList.innerHTML = '';
        }
    });

    usersList.addEventListener('click', async (e) => {
        if (e.target.tagName === 'LI') {
            const otherUserId = e.target.dataset.userId;
            console.log('otherid',e.target.dataset);
            const formdata = new FormData();
            formdata.append('other_user_id',otherUserId);
            
            try {
                const response = await fetch('includes/start_chat.php', {
                    method: 'POST',
                    body: formdata
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
                if (data.chat_id) {
                    currentChatId = data.chat_id;
                    chatHeader.textContent = `Chat with ${e.target.textContent}`;
                    messageForm.style.display = 'flex';
                    fetchMessages();
                } else if (data.error) {
                    console.error('Error starting chat:', data.error);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
    });
    
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
            messagesDiv.innerHTML = messages.map(msg => `<div><strong>${msg.username}</strong>: ${msg.message}</div>`).join('');
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    }

    setInterval(fetchMessages, 500); // Fetch messages every 500 milliseconds for real-time chat
});
