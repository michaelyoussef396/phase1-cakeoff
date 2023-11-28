// Task 1: Fetch Cake Details and Display on Page Load (Core Deliverable)
document.addEventListener('DOMContentLoaded', () => {
    // Fetch cake details for the first cake
    fetch('http://localhost:3000/cakes/1')
      .then(response => response.json())
      .then(cakeData => {
        // Display cake details on the page
        displayCakeDetails(cakeData);
      })
      .catch(error => console.error('Error fetching cake details:', error));
  });
  
  function displayCakeDetails(cake) {
    // Function to display cake details on the page
    const cakeNameElement = document.getElementById('cake-name');
    const cakeImageElement = document.getElementById('cake-image');
    const cakeDescriptionElement = document.getElementById('cake-description');
    const reviewListElement = document.getElementById('review-list');
  
    // Update HTML elements with cake details
    cakeNameElement.textContent = cake.name;
    cakeImageElement.src = 'https://www.coles.com.au/content/dam/coles/cusp/recipes-inspiration/aug23_images/Aug23-The-ultimate-comic-cake-976x549.jpg';
    cakeImageElement.alt = cake.name;
    cakeDescriptionElement.textContent = cake.description;
  
    // Display reviews
    reviewListElement.innerHTML = cake.reviews.map(review => `<li>${review}</li>`).join('');
  }
  
  // Task 2: Display Menu of Cakes (Core Deliverable)
  fetch('http://localhost:3000/cakes')
  .then(response => response.json())
  .then(cakesData => {
    const cakeListElement = document.getElementById('cake-list');

    // Display cakes in the navigation menu
    cakesData.cakes.forEach(cake => {
      const cakeListItem = document.createElement('li');
      cakeListItem.textContent = cake.name;
      cakeListItem.addEventListener('click', () => displayCakeDetails(cake));
      cakeListElement.appendChild(cakeListItem);
    });
  })
  .catch(error => console.error('Error fetching cakes:', error));
  
  // Task 3: Add Review to the Page (Core Deliverable)
  const reviewForm = document.getElementById('review-form');
  reviewForm.addEventListener('submit', event => {
    event.preventDefault();
    const reviewTextArea = document.getElementById('review');
    const reviewText = reviewTextArea.value;
  
    // Display the new review on the page
    const reviewListElement = document.getElementById('review-list');
    const newReviewItem = document.createElement('li');
    newReviewItem.textContent = reviewText;
    reviewListElement.appendChild(newReviewItem);
  
    // Reset the form
    reviewTextArea.value = '';
  });
  
  // Add your provided code here
  // your code here
  
  // Bonus: Remove a Review from the Page When Clicked
  const reviewList = document.getElementById('review-list');
  reviewList.addEventListener('click', event => {
    if (event.target.tagName === 'LI') {
      event.target.remove();
    }
  });
  
  // Bonus: Implement a Non-GET Request to Update Cake Description or Reviews
  // Use fetch with a PATCH request to update cake details or reviews on the server.
  // Ensure the code structure is clean and reusable.
  // For example, to update a cake description:
  const cakeId = 1; // Assuming you want to update cake with ID 1
  const newDescription = 'New cake description text'; // The new description to update
  
  fetch(`http://localhost:3000/cakes/${cakeId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: newDescription,
    }),
  })
    .then(response => response.json())
    .then(updatedCake => {
      // Handle the response as needed
      console.log('Updated cake details:', updatedCake);
    })
    .catch(error => console.error('Error updating cake description:', error));
  