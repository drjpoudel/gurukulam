document.getElementById('urlForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const urlInput = document.getElementById('urlInput').value;
    const shortenedUrlElement = document.getElementById('shortenedUrl');
    const resultDiv = document.getElementById('result');

    try {
        // Call the backend to shorten the URL
        const response = await fetch('https://github.com/drjpoudel/gurukulam', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ originalUrl: urlInput }),
        });
        const data = await response.json();

        // Display the shortened URL
        shortenedUrlElement.href = data.shortUrl;
        shortenedUrlElement.textContent = data.shortUrl;
        resultDiv.classList.remove('hidden');
    } catch (error) {
        alert('An error occurred while shortening the URL.');
    }
});
