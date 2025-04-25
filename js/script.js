// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');

// Set up the date pickers with:
// - A start date 9 days ago
// - Today as the end date
// - Makes sure you can't pick dates before 1995
setupDateInputs(startInput, endInput);

// Function to fetch APOD data from NASA's API
const fetchAPODData = async (startDate, endDate) => {
  const apiKey = 'fSiokNe7fwuPGvAxpgJba8Uu6llg9IZ7SfWZR9qx'; // Replace with your NASA API key
  const url = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

  // Show loading message
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '<div class="placeholder">🔄 Loading space photos…</div>';

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayGallery(data);
  } catch (error) {
    console.error('Error fetching APOD data:', error);
    gallery.innerHTML = '<div class="placeholder">❌ Failed to load space photos. Please try again.</div>';
  }
};

// Function to display the fetched data in the gallery
const displayGallery = (data) => {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = ''; // Clear existing content

  if (data.length === 0) {
    gallery.innerHTML = '<div class="placeholder">No images found for the selected date range.</div>';
    return;
  }

  data.forEach((item) => {
    if (item.media_type === 'image') {
      const galleryItem = document.createElement('div');
      galleryItem.classList.add('gallery-item');
      galleryItem.innerHTML = `
        <div class="image-container">
          <img src="${item.url}" alt="${item.title}" />
          <div class="overlay">
            <p>${item.explanation}</p>
          </div>
        </div>
        <p><strong>${item.title}</strong></p>
        <p>${item.date}</p>
      `;
      gallery.appendChild(galleryItem);
    }
  });
};

// Event listener for the date inputs
document.querySelector('button').addEventListener('click', () => {
  const startDate = startInput.value;
  const endDate = endInput.value;

  if (startDate && endDate) {
    fetchAPODData(startDate, endDate);
  } else {
    alert('Please select both start and end dates.');
  }
});
