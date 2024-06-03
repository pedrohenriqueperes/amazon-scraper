# Amazon Product Scraper

## Description

This project is a simple web scraper that fetches product listings from the first page of Amazon search results for a given keyword. It uses Node.js with Express for the backend, Axios for making HTTP requests, and JSDOM for parsing HTML. The frontend is built with HTML, CSS, and Vanilla JavaScript.

## Features

- Scrapes product titles, ratings, number of reviews, and image URLs from Amazon search results.
- Randomizes user agents to simulate requests from different browsers.
- Handles Cross-Origin Resource Sharing (CORS) using the `cors` middleware.
- Provides a simple web interface to input a search keyword and display the results.

## Prerequisites

- Node.js and npm installed on your system.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/amazon-product-scraper.git
    cd amazon-product-scraper
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the backend server:

    ```bash
    node index.js
    ```

    The server will run on `http://localhost:3000`.

2. Open `index.html` in your browser.

3. Enter a search keyword in the input field and click the "Scrape" button.

4. The scraped product listings will be displayed below the input field.

## Project Structure

amazon-product-scraper/
├── index.js
├── package.json
├── README.md
├── styles.css
└── index.html
└── script.js


- `index.js`: The main server file that handles scraping and serves the API endpoint.
- `package.json`: Contains the project metadata and dependencies.
- `README.md`: The project documentation.
- `styles.css`: The stylesheet for the frontend.
- `index.html`: The main HTML file for the frontend.
- `script.js`: The JavaScript file that handles the frontend logic.

## API Endpoint

- `GET /api/scrape?keyword=yourKeyword`

  - Query Parameters:
    - `keyword` (string): The search keyword to scrape Amazon product listings for.

  - Response:
    - A JSON object containing an array of products with the following fields:
      - `title`: The product title.
      - `rating`: The product rating (stars out of 5).
      - `reviews`: The number of reviews.
      - `imageUrl`: The URL of the product image.

## Example

Request:

GET /api/scrape?keyword=laptop


Response:

```json
{
  "products": [
    {
      "title": "Beelink SER5 MAX Mini PC, AMD Ryzen 7 5800H(up to 4.4GHz) 8C/16T, Mini Computer 32GB DDR4 RAM 500GB NVMe SSD, Mini Desktop Computer 4K@60Hz Triple Display HDMI&DP&USB-C WiFi6/BT5.2/WOL/HTPC/W-11 Pro",
      "rating": "4.5",
      "reviews": "459",
      "imageUrl": "https://m.media-amazon.com/images/I/7170PfHm6-L._AC_UY218_.jpg"
    },
    ...
  ]
}
Error Handling
If no keyword is provided, the API returns a 400 status with the error message: {"error": "Keyword is required"}.
If an error occurs during scraping, the API returns a 500 status with the error message: {"error": "An error occurred while scraping the data"}.
