// script.js
const API_KEY = "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"; // 🔑 Use your OpenRouter API key

document.getElementById("chat-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("user-input");
  const userMessage = input.value.trim();
  const chatBox = document.getElementById("chat-box");

  if (!userMessage) return;

  chatBox.innerHTML += `<div class="user-bubble"><b>You:</b> ${userMessage}</div>`;
  input.value = "";

  chatBox.innerHTML += `
  <div class="ai-bubble" id="loading">
    <b>AI Bro:</b> <span class="typing">AI is typing...</span>
  </div>`;


  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528:free",
        messages: [
          {
            role: "system",
            content: "You are a kind and supportive big brother. Respond to the user's feelings like family."
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || "AI didn't reply. 😞";

    document.getElementById("loading").remove();

    chatBox.innerHTML += `<div class="ai-bubble"><b>AI Bro:</b> ${aiReply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {
    console.error("Fetch error:", error);
    document.getElementById("loading").remove();
    chatBox.innerHTML += `<div class="ai-bubble"><b>AI Bro:</b> Error reaching AI 😥</div>`;
  }
}
);

