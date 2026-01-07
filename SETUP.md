# Portfolio Project - Setup Instructions

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up Gemini API:**

   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Copy your API key
   - Update the `.env` file in the root directory:
     ```
     VITE_GEMINI_API_KEY=your_actual_api_key_here
     ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Features

- Modern React portfolio with TypeScript
- Integrated AI assistant powered by Google Gemini
- Responsive design with Tailwind CSS
- Terminal-style chat interface

## Important Notes

- Never commit your actual API key to version control
- The `.env` file should be added to your `.gitignore`
- The API key must start with `VITE_` to be accessible in the frontend

## Terminal Assistant

The floating terminal in the bottom right allows visitors to ask questions about your projects and experience. It's powered by Google's Gemini AI and has context about all your projects.
