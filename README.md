# Samespace Frontend Task

This is a Samespace Frontend Music Player UI built with React.js and Tailwind CSS.

Deployed App Link: [https://samespace-theta.vercel.app/](https://samespace-theta.vercel.app/)

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/)

## Installing Samespace Frontend Task

To install Samespace Frontend, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/axxxay/samespace.git
    ```

2. Navigate into the project directory:
    ```bash
    cd samespace
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

## Setting Up Environment Variables

This project uses environment variables for configuration. These are stored in a `.env` file at the root of the project. 

To set up the environment variables:

1. Create a new file in the root directory of the project named `.env`.

2. Open the `.env` file and add your environment variables as key-value pairs. For example:

    ```bash
    REACT_APP_SONGS_API_URL=https://samespace-backend-api.com
    ```

Replace `https://samespace-backend-api.com` with your actual Backend Endpoint, respectively.

3. Save the `.env` file. The application will now use these values when running.

**Note:** Never commit the `.env` file to your repository. It contains sensitive information and should be added to your `.gitignore` file.

## Running Samespace Frontend Task

To run Samespace Frontend Task, follow these steps:

1. Start the development server:
    ```bash
    node start
    ```

2. Open your web browser and visit [http://localhost:3000](http://localhost:3000)
