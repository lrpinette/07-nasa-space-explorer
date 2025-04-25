// Select all gallery items and the body for modal insertion
const galleryItems = document.querySelectorAll('.gallery-item');
const body = document.querySelector('body');

// Create a function to open the modal
function openModal(imageSrc, title, date, explanation) {
  // Create the modal container
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <img src="${imageSrc}" alt="${title}" class="modal-image">
      <h2>${title}</h2>
      <p><strong>Date:</strong> ${date}</p>
      <p>${explanation}</p>
    </div>
  `;

  // Append the modal to the body
  body.appendChild(modal);

  // Add event listener to close the modal
  const closeButton = modal.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    body.removeChild(modal);
  });

  // Close the modal when clicking outside the content
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      body.removeChild(modal);
    }
  });
}

// Function to dynamically load gallery items
function loadGallery(images) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = ''; // Clear any existing content

  images.forEach((image) => {
    // Create a gallery item for each image
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');
    galleryItem.innerHTML = `
      <div class="image-container">
        <img src="${image.url}" alt="${image.title}">
      </div>
      <p class="title">${image.title}</p>
      <p class="date">${image.date}</p>
      <p class="explanation" style="display: none;">${image.explanation}</p>
    `;
    gallery.appendChild(galleryItem);
  });

  // Reattach click event listeners to the newly added gallery items
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      // Get data attributes from the clicked item
      const imageSrc = item.querySelector('img').src;
      const title = item.querySelector('.title').textContent;
      const date = item.querySelector('.date').textContent;
      const explanation = item.querySelector('.explanation').textContent;

      // Open the modal with the data
      openModal(imageSrc, title, date, explanation);
    });
  });
}

// Example data to populate the gallery (replace with API data)
const exampleImages = [
  {
    url: 'https://example.com/image1.jpg',
    title: 'Image 1',
    date: '2023-10-01',
    explanation: 'This is the explanation for Image 1.',
  },
  {
    url: 'https://example.com/image2.jpg',
    title: 'Image 2',
    date: '2023-10-02',
    explanation: 'This is the explanation for Image 2.',
  },
];

// Load the gallery with example data
loadGallery(exampleImages);
