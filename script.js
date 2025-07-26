




const API_KEY = 'AIzaSyBkuEp5EHn49i36TLBamRiFtiv6sb4';
 // <-- Replace this with your YouTube Data API key
const searchBtn = document.getElementById('search-btn');
const emotionInput = document.getElementById('emotion-input');
const resultsDiv = document.getElementById('results');
const playerContainer = document.getElementById('player-container');

// Function to search videos by query (emotion)
async function searchVideos(query) {
  const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(query)}&key=${API_KEY}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.error) {
      alert('Error from YouTube API: ' + data.error.message);
      return [];
    }

    return data.items; // array of video objects
  } catch (error) {
    alert('Network or API error: ' + error.message);
    return [];
  }
}

// Function to display search results
function displayResults(videos) {
  resultsDiv.innerHTML = '';

  if (videos.length === 0) {
    resultsDiv.innerHTML = '<p>No results found.</p>';
    return;
  }

  videos.forEach((video) => {
    const videoId = video.id.videoId;
    const title = video.snippet.title;
    const thumbnail = video.snippet.thumbnails.medium.url;

    const item = document.createElement('div');
    item.classList.add('result-item');

    item.innerHTML = `
      <div class="result-thumb">
        <img src="${thumbnail}" alt="${title}" />
      </div>
      <div class="result-title">${title}</div>
    `;

    // Add click event to play video
    item.addEventListener('click', () => {
      playVideo(videoId);
    });

    resultsDiv.appendChild(item);
  });
}

// Function to embed and play video in player container
function playVideo(videoId) {
  playerContainer.innerHTML = `
    <iframe 
      width="100%" 
      height="315" 
      src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  `;
}

// On search button click
searchBtn.addEventListener('click', async () => {
  const query = emotionInput.value.trim();
  if (!query) {
    alert('Please enter a mood or emotion!');
    return;
  }

  resultsDiv.innerHTML = '<p>Loading...</p>';
  const videos = await searchVideos(query);
  displayResults(videos);
});
