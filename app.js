// app.js

// Function to append messages to the conversation
function appendMessage(role, text) {
    const conversationDiv = document.getElementById('conversation');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    messageDiv.textContent = text;
    conversationDiv.appendChild(messageDiv);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
}

// Function to handle user input and send request to the ChatGPT API
async function askMascot() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    // Display user's message
    appendMessage('user', userInput);
    document.getElementById('user-input').value = '';

    // Send the user's question to ChatGPT
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY ' // Replace with your OpenAI API key
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "You are a helpful runner mascot." }, { role: "user", content: userInput }],
            max_tokens: 100
        })
    });

    const data = await response.json();
    const mascotResponse = data.choices[0].message.content;

    // Display the mascot's response
    appendMessage('mascot', mascotResponse);
}