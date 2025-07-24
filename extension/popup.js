const loginBtn = document.getElementById("login");
const addBtn = document.getElementById("add");
const viewBtn = document.getElementById("view");

// Check if JWT exists
chrome.storage.local.get(["token"], ({ token }) => {
  if (!token) {
    loginBtn.style.display = "block";
  } else {
    // Optional: Add expiry validation here if your JWT has exp field
    addBtn.style.display = "block";
    viewBtn.style.display = "block";
  }
});

// Handle Login
loginBtn.addEventListener("click", () => {
  chrome.tabs.create({ url: "http://localhost:3000/login" });
});

// Handle Add
addBtn.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.storage.local.get(["token"], async ({ token }) => {
    if (!token) return alert("Please log in first.");

    try {
      const response = await fetch("http://localhost:3000/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ url: tab.url })
      });

      if (response.ok) {
        alert("Bookmark added!");
      } else {
        const err = await response.json();
        alert("Error: " + (err.message || "Failed to add"));
      }
    } catch (err) {
      alert("Network error");
    }
  });
});

// Handle View
viewBtn.addEventListener("click", () => {
  chrome.tabs.create({ url: "http://localhost:3000/dashboard" });
});
