document.getElementById("issueForm").addEventListener("submit", addIssue);

function addIssue(e) {
  e.preventDefault();

  const title = document.getElementById("issueTitle").value.trim();
  const description = document.getElementById("issueDescription").value.trim();
  const priority = document.getElementById("issuePriority").value;
  const image = document.getElementById("image-upload").files[0];

  if (!title || !description) return alert("Please fill out all fields.");

  const issue = {
    id: Date.now(),
    title,
    description,
    priority,
    resolved: false,
  };

  const issues = JSON.parse(localStorage.getItem("issues")) || [];
  issues.push(issue);
  localStorage.setItem("issues", JSON.stringify(issues));

  document.getElementById("issueForm").reset();
  fetchIssues();
}

function fetchIssues() {
  const issues = JSON.parse(localStorage.getItem("issues")) || [];
  const issueList = document.getElementById("issueList");
  issueList.innerHTML = "";

  issues.forEach((issue, index) => {
    const div = document.createElement("div");
    div.className = `issue ${issue.priority.toLowerCase()} ${issue.resolved ? "resolved" : ""}`;
    div.style.animationDelay = `${index * 0.1}s`; // Staggered animation

    div.innerHTML = `
      <h3>${issue.title}</h3>
      <p>${issue.description}</p>
      <p><strong>Priority:</strong> ${issue.priority}</p>
      <button class="action resolve" onclick="toggleResolve(${issue.id})">
        ${issue.resolved ? "Unresolve" : "Resolve"}
      </button>
      <button class="action delete" onclick="deleteIssue(${issue.id})">Delete</button>
    `;

    issueList.appendChild(div);
  });
}
function goBack() {
    window.location.href = "index.html"; // Navigate back to welcome page
  }
  

function toggleResolve(id) {
  let issues = JSON.parse(localStorage.getItem("issues")) || [];
  issues = issues.map(issue => {
    if (issue.id === id) issue.resolved = !issue.resolved;
    return issue;
  });
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
}

function deleteIssue(id) {
  let issues = JSON.parse(localStorage.getItem("issues")) || [];
  issues = issues.filter(issue => issue.id !== id);
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
}
// Load on start
fetchIssues();
function handleKey(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (message === "") return;

  addMessage("user", message);
  input.value = "";

  // Typing effect
  setTimeout(() => {
    addMessage("bot", "Typing...");
    setTimeout(() => {
      document.querySelector(".bot-msg:last-child").remove();
      const reply = getBotReply(message);
      addMessage("bot", reply);
    }, 600);
  }, 300);
}

function addMessage(sender, text) {
  const chatbox = document.getElementById("chatbox");
  const msgDiv = document.createElement("div");
  msgDiv.className = sender === "user" ? "user-msg" : "bot-msg";
  msgDiv.textContent = text;
  chatbox.appendChild(msgDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function getBotReply(message) {
  const msg = message.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi")) {
    return "Hi there! How can I help you?";
  } else if (msg.includes("my report")) {
    return "You can report an issue from the 'Raise Issue' page.";
  } else if (msg.includes("my status") || msg.includes("shoe my status")) {
    return "Visit the 'Track Issue' section and enter your ticket ID.";
  } else if (msg.includes("contact") || msg.includes("how to contact")) {
    return "📧 You can contact us at support@unmasking.in";
  } else if (msg.includes("thanks") || msg.includes("thank you") || msg.includes("thankyou")) {
    return "You're welcome! Will you need any other help?";
  } else {
    return "I'm not sure about that. Can you rephrase it?";
  }
}

function resetChat() {
  const chatbox = document.getElementById("chatbox");
  chatbox.innerHTML = `<div class="bot-msg">Hello! How can I help you today?</div>`;
}

function toggleChat() {
  const bot = document.getElementById("chatbot");
  const visible = bot.style.display === "flex";
  bot.style.display = visible ? "none" : "flex";
}

