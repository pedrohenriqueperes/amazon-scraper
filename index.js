const express = require('express'); // Import the express module
const axios = require('axios'); // Import the axios module for making HTTP requests
const { JSDOM } = require('jsdom'); // Import JSDOM for parsing HTML
const cors = require('cors'); // Import CORS for handling Cross-Origin Resource Sharing

const app = express(); // Create an express application
const PORT = process.env.PORT || 3000; // Define the port the server will run on

app.use(cors()); // Use CORS middleware

// Array of user agents to simulate requests from different browsers
const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.3",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:61.0) Gecko/20100101 Firefox/61.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:64.0) Gecko/20100101 Firefox/64.0"
];

// Function to randomly select a user agent from the array
function getRandomUserAgent() {
    return userAgents[Math.floor(Math.random() * userAgents.length)];
}

// Define the /api/scrape endpoint
app.get('/api/scrape', async (req, res) => {
    const keyword = req.query.keyword; // Get the keyword from the query parameters
    if (!keyword) { // If no keyword is provided, return a 400 status with an error message
        return res.status(400).json({ error: 'Keyword is required' });
    }

    try {
        const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`; // Construct the URL for the Amazon search
        console.log(`Fetching URL: ${url}`); // Log the URL being fetched
        const { data: html } = await axios.get(url, {
            headers: {
                'User-Agent': getRandomUserAgent() // Set a random user agent in the request headers
            }
        }); // Fetch the HTML content of the search results page
        const dom = new JSDOM(html); // Parse the HTML content using JSDOM
        const document = dom.window.document; // Get the document object

        const products = []; // Initialize an empty array to store product details
        const productElements = document.querySelectorAll('.s-result-item'); // Select all product elements on the page

        productElements.forEach(product => {
            const titleElement = product.querySelector('h2 a span'); // Get the title element
            const ratingElement = product.querySelector('.a-icon-alt'); // Get the rating element
            const reviewsElement = product.querySelector('.a-size-base'); // Get the reviews element
            const imageElement = product.querySelector('.s-image'); // Get the image element

            // If all elements are found, extract their content and add to the products array
            if (titleElement && ratingElement && reviewsElement && imageElement) {
                const title = titleElement.textContent.trim();
                const rating = ratingElement.textContent.trim().split(' ')[0];
                const reviews = reviewsElement.textContent.trim();
                const imageUrl = imageElement.src;

                products.push({ title, rating, reviews, imageUrl });
            }
        });

        res.json({ products }); // Return the products array as a JSON response
    } catch (error) { // Handle any errors during the scraping process
        console.error('Error during scraping:', error); // Log the error
        res.status(500).json({ error: 'An error occurred while scraping the data' }); // Return a 500 status with an error message
    }
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
