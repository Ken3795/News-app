// Replace 'YOUR_API_KEY' with your actual API key
const API_KEY = '9af879527b0049d38bfc150335b86838';
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

// Get DOM elements
const newsContainer = document.getElementById('newsContainer');
const searchInput = document.getElementById('searchInput');
const darkModeToggle = document.getElementById('darkModeToggle');

// Fetch and display news
async function fetchNews(query = '') {
  const url = query ? `${API_URL}&q=${query}` : API_URL;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('API Response:', data); // Log the response to console for debugging

    if (data.articles && data.articles.length > 0) {
      displayNews(data.articles);
    } else {
      newsContainer.innerHTML = '<p>No articles found.</p>';
    }
  } catch (error) {
    newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
    console.error('Error fetching news:', error);
  }
}

// Display news articles
function displayNews(articles) {
  newsContainer.innerHTML = articles
    .map(
      (article, index) => `
    <div class="news-card" data-index="${index}">
      <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
      <div class="content">
        <h2>${article.title}</h2>
        <p>${article.description || 'No description available.'}</p>
        <a href="${article.url}" target="_blank">Read More</a>
        <button class="like-button">Like</button>
      </div>
    </div>
  `
    )
    .join('');

  // Add event listeners for like buttons
  document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('liked');
    });
  });
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkModeToggle.textContent = document.body.classList.contains('dark-mode')
    ? 'Light Mode'
    : 'Dark Mode';
});

// Add event listener for search
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  fetchNews(query);
});

// Initial fetch
fetchNews();
