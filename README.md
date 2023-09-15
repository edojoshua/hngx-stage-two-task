# Movie Discovery Web Application

## Overview

This is a movie discovery web application that allows users to search for movies, view details about them, and save their favorite movies. The application consumes data from the TMDB API.

## Features

1. **User Interface:**

   - The application provides a responsive and visually appealing user interface.
   - The top 10 movies are listed on the homepage in a grid layout with their movie posters.
   - Each movie card displays the movie title and release date.
   - Key elements are accessible via data-testid attributes:
     - Movie card: [data-testid: movie-card]
     - Movie poster: [data-testid: movie-poster]
     - Movie title: [data-testid: movie-title]
     - Movie release date: [data-testid: movie-release-date]

2. **Movie Search:**

   - Users can search for movies by title.
   - Search results include movie posters, titles, and release dates.
   - A loading indicator is shown while fetching search results.

3. **Movie Details:**

   - Users can view detailed information about a movie by navigating to the /movies/:id route (where :id is the movie's ID).
   - The movie details page displays:
     - Movie title: [data-testid: movie-title]
     - Release date (in UTC): [data-testid: movie-release-date]
     - Runtime (in minutes): [data-testid: movie-runtime]
     - Overview: [data-testid: movie-overview]

4. **API Integration:**

   - The application consumes the TMDB API to fetch movie data.
   - API endpoints used:
     - Fetch movie details by ID: `https://api.themoviedb.org/3/movie/{movie_id}`

5. **Error Handling:**
   - The application implements error handling to display meaningful error messages to users in case of API failures or other issues.

## Tech Stack

- React/Next.js
- TypeScript
- Axios for API requests
- Tailwind CSS for styling
- @tanstack/react-query for data fetching and caching
- Other dependencies listed in package.json

## How to Run Locally

1. Clone this repository to your local machine.
2. Install dependencies by running:
3. Create a `.env.local` file in the root directory and set your TMDB API key as follows: TMDB_API_KEY=your_api_key_here
4. Start the development server: npm run dev
5. Open your web browser and access the application at http://localhost:3000.

## Demo

You can access a live demo of this application [here](insert_live_demo_url).

## Author

[Your Name]

## License

This project is licensed under the [License Name] License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- This project was created as part of the HNGx Stage Two Task.

Feel free to customize this README to include additional information or formatting as needed for your project. Good luck with your movie discovery web application!
