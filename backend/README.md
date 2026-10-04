# Backend setup

The API serves account registration/login and user-specific portfolio holdings. It requires MongoDB and a JWT signing secret.

## Run locally

1. Install dependencies with `npm ci --prefix backend`.
2. Copy `backend/.env.example` to `backend/.env`.
3. Set `MONGO_URL` to your MongoDB connection string and replace `JWT_SECRET` with a random value of at least 32 characters.
4. Start the API with `npm --prefix backend run start:once`.
5. The health endpoint is `http://localhost:3002/health`.

The frontend defaults to this local API while running in development.

## Deploy to Render

1. In Render, create a new Blueprint and connect this GitHub repository. Render reads the root `render.yaml` and creates the `zerodha-project-api` service.
2. Set `MONGO_URL` in the new service's Environment settings. Do not commit the connection string. Configure MongoDB network access for the Render service before using the API.
3. Copy the service URL Render assigns, then add a repository Actions variable named `REACT_APP_API_URL` with that URL (for example, `https://zerodha-project-api.onrender.com`).
4. Trigger the **Deploy frontend to GitHub Pages** workflow again so the frontend is rebuilt with the API URL.

The deployment allows browser requests only from the configured GitHub Pages origin. Passwords are stored as salted scrypt hashes, API tokens expire after eight hours, and holdings are scoped to the authenticated account. Render's free service may sleep when idle, so the first request after inactivity can take longer.
