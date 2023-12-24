# Climate Change News Scraper
This project is a simple web scraper that fetches news articles related to climate change from The Guardian's website.

## Technologies Used
* Node.js
* Express.js
* Axios
* Cheerio

## Setup and Installation
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies with npm install.
4. Start the server with npm start.

## How It Works
The application uses Express.js to set up a server. It uses Axios to make HTTP requests to The Guardian's climate crisis page. Cheerio is used to parse the HTML response and extract the relevant information from each article.

The application listens on port 8000 by default, but this can be configured by setting the PORT environment variable.

When a GET request is made to the /news endpoint, the application fetches the latest articles from The Guardian's climate crisis page and returns them as a JSON response. Each article in the response includes the title and URL.

## Future Improvements
* Add error handling for failed HTTP requests.
* Extend the application to scrape news from other sources.
* Implement a front-end to display the scraped news articles in a user-friendly format.
