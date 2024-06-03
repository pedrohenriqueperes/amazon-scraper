document.getElementById('scrapeButton').addEventListener('click', async () => {
    const keyword = document.getElementById('keyword').value;
    if (!keyword) {
        alert('Please enter a keyword');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        if (data.products.length === 0) {
            resultsDiv.innerHTML = '<p>No products found.</p>';
            return;
        }

        data.products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            const img = document.createElement('img');
            img.src = product.imageUrl;
            productDiv.appendChild(img);

            const infoDiv = document.createElement('div');
            infoDiv.classList.add('product-info');

            const title = document.createElement('p');
            title.textContent = `Title: ${product.title}`;
            infoDiv.appendChild(title);

            const rating = document.createElement('p');
            rating.textContent = `Rating: ${product.rating} stars`;
            infoDiv.appendChild(rating);

            const reviews = document.createElement('p');
            reviews.textContent = `Reviews: ${product.reviews}`;
            infoDiv.appendChild(reviews);

            productDiv.appendChild(infoDiv);
            resultsDiv.appendChild(productDiv);
        });
    } catch (error) {
        console.error('Error during fetching data:', error);
        alert('An error occurred while fetching the data');
    }
});
