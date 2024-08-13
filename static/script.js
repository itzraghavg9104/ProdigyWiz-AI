function convertToHtml(response) 
{
    const styles = `
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { width: 80%; margin: auto; color: white; }
            h1, h2 { color: #1E90FF; }
            h2 { margin-top: 20px; }
            p { margin: 10px 0; }
            code { background: #333; padding: 2px 4px; border-radius: 4px; color: #1E90FF; }
            pre { background: #333; padding: 10px; border-radius: 4px; overflow-x: auto; color: #1E90FF; position: relative; white-space: pre-wrap; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; background-color: #333; color: white; }
            table th, table td { padding: 10px; border: 1px solid #444; text-align: left; }
            table th { background-color: #1E90FF; color: white; }
            .copy-btn { position: absolute; top: 10px; right: 10px; background-color: #1E90FF; color: white; border: none; padding: 5px; cursor: pointer; border-radius: 4px; }
        </style>
    `;

    const html = response
        .replace(/## (.+)/g, '<h1>$1</h1>') // Convert ## to <h1>
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Convert **bold** to <strong>
        .replace(/\* (.+)/g, '<li>$1</li>') // Convert * item to <li>
        .replace(/```([\s\S]*?)```/g, '<pre><button class="copy-btn">Copy</button><code>$1</code></pre>') // Convert code blocks
        .replace(/(\n|^)(\s*[*-] .+)/g, (match, p1, p2) => {
            if (p1.trim() === '') return `<ul>${p2}</ul>`;
            return match;
        })
        .replace(/(\n|^)(\s*[^*-].+)/g, '<p>$2</p>') // Convert plain text to <p>
        .replace(/(\n|^)(\s*Table:\n([\s\S]*?)\n)/g, (match, p1, p2) => {
            const tableContent = p2
                .replace(/^\s*([^\|\n].+)\n/gm, '<tr><td>$1</td></tr>')
                .replace(/^\s*\|\s*(.+)\s*\|\s*\n/gm, '<tr><th>$1</th></tr>')
                .replace(/\n\s*\|\s*(.+)\s*\|\s*\n/gm, '<tr><td>$1</td></tr>');
            return `<table>${tableContent}</table>`;
        });

    return `<div class="container">${styles}${html}</div>`;
}

const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatLog = document.getElementById('chat-log');
const sideMenu = document.getElementById('side-menu');
const menuToggle = document.getElementById('menu-toggle');

let initialMessageShown = false;

form.addEventListener('submit', function(event) 
{
    event.preventDefault();
    const userMessage = input.value.trim();
    input.value = '';

    if (!initialMessageShown && userMessage.toUpperCase() === 'START') 
    {
        chatLog.innerHTML = ''; // Clear the initial message
        initialMessageShown = true;
        input.placeholder = 'Type message here.....';
        chatLog.innerHTML += `<p class="user-message"><strong>User:</strong> ${userMessage}</p>`;
        handleUserInput(userMessage);
    } 
    else if (initialMessageShown) 
    {
        chatLog.innerHTML += `<p class="user-message"><strong>User:</strong> ${userMessage}</p>`;
        handleUserInput(userMessage);
    }
});

document.querySelectorAll('.menu-btn').forEach(button => 
{
    button.addEventListener('click', function() 
    {
        const userMessage = this.dataset.message;
        chatLog.innerHTML += `<p class="user-message"><strong>User:</strong> ${userMessage}</p>`;
        handleUserInput(userMessage);
        sideMenu.classList.add('hidden'); // Hide the menu after selection
    });
});

chatLog.addEventListener('click', function(event) 
{
    if (event.target.classList.contains('copy-btn')) 
    {
        const codeElement = event.target.nextElementSibling;
        const code = codeElement.innerText;
        navigator.clipboard.writeText(code).then(() => 
        {
            alert('Code copied to clipboard!');
        });
    }
});

menuToggle.addEventListener('click', function() 
{
    sideMenu.classList.toggle('hidden'); // Toggle the visibility of the side menu
});

function handleUserInput(userMessage) 
{
    fetch('/chat', 
    {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `message=${userMessage}`
    })
    .then(response => response.json())
    .then(data => 
    {
        const formattedResponse = convertToHtml(data.response);
        chatLog.innerHTML += `<p class="ProdigyWiz-response"><strong>Tutor AI:</strong> ${formattedResponse}</p>`;
        chatLog.scrollTop = chatLog.scrollHeight;
    });
}
