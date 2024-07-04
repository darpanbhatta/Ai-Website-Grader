# Ai-Website-Grader
Description
The Essay Grader Application is a web-based tool designed to assist in grading essays based on a provided rubric. This application consists of two main components: a React frontend and an Express.js backend.

Features
File Upload: Users can upload essay and rubric files in PDF or text format.
Text Extraction: The application extracts text from PDF files using the react-pdftotext library.
Essay Grading: The backend processes the essay text using Anthropic's Claude model to provide a detailed grade and feedback based on the rubric.
Streaming Response: Graded essays are displayed incrementally in the frontend as the backend processes them.
Frontend Code
The frontend is built with React and includes the following key functionalities:

File Handling: Allows users to upload essay and rubric files and converts PDFs to text.
Text Inputs: Provides text areas for users to paste essay and rubric text directly.
File Upload Handling: Uses FormData to send files and text to the backend for processing.
Streaming Results: Displays the graded essay incrementally as it is received from the backend.
Main Components
App Component: The main component that manages state and renders the UI.
File Handling: Functions to handle file changes and text extraction.
Grading Functionality: Functions to handle file uploads and process the grading stream from the backend.
Backend Code
The backend is built with Express.js and includes the following key functionalities:

File Upload Handling: Uses multer for handling file uploads.
Anthropic API Integration: Connects to Anthropic's Claude model to process and grade the essay.
Streaming Response: Sends the graded essay back to the frontend incrementally.
Key Endpoints
POST /upload: Handles the uploaded files and text, processes the grading using Anthropic's API, and streams the response back to the frontend.
Environment Setup
Dependencies: Express, multer, cors, body-parser, and Anthropic SDK.
Server Configuration: Listens on port 3001 and handles CORS for cross-origin requests.
Getting Started
Prerequisites
Node.js and npm installed on your machine.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/essay-grader.git
cd essay-grader
Install frontend dependencies:

bash
Copy code
cd frontend
npm install
Install backend dependencies:

bash
Copy code
cd backend
npm install
Running the Application
Start the backend server:

bash
Copy code
cd backend
npm start
Start the frontend application:

bash
Copy code
cd frontend
npm start
Open your browser and navigate to http://localhost:3000 to use the application.


