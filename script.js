// API Endpoint (Sample: Free News API or JSON Server Endpoint)
const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

// Select DOM Elements
const newsContainer = document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");
const toggleThemeBtn = document.getElementById("toggleTheme");

// Fetch News Data
async function fetchNews() {
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();

    // Simulating simplified news (title, body)
    const newsData = data.slice(0, 10).map(news => ({
      title: news.title,
      description: news.body,
      image: "https://via.placeholder.com/300x200", // Placeholder image
    }));

    renderNews(newsData);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

// Render News Cards
function renderNews(newsData) {
  newsContainer.innerHTML = ""; // Clear previous results
  newsData.forEach(news => {
    const card = document.createElement("div");
    card.className = "news-card";

    card.innerHTML = `
      <img src="${news.image}" alt="${news.title}">
      <h3>${news.title}</h3>
      <p>${news.description}</p>
      <button class="like-btn">👍 Like</button>
    `;

    // Add Like Event Listener
    const likeBtn = card.querySelector(".like-btn");
    likeBtn.addEventListener("click", () => {
      alert(`You liked: ${news.title}`);
    });

    newsContainer.appendChild(card);
  });
}

// Search Functionality
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const newsCards = document.querySelectorAll(".news-card");

  newsCards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    if (title.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Toggle Dark Mode
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Initialize App
fetchNews();
