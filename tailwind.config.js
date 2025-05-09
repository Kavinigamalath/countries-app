/** @type {import('tailwindcss').Config} */
// Provides IDE/type-checking support for the Tailwind config object
module.exports = {
  // Specify all template files Tailwind should scan for class names
  content: [
    "./index.html",        // Root HTML file
    "./src/**/*.{js,jsx}"  // All JS/JSX files in src folder and subfolders
  ],
  theme: {
    extend: {
       animation: {
      'bounce-slow': 'bounce 3s infinite',
    },
    }
  },
  // Register any Tailwind CSS plugins (e.g., forms, typography) here
  plugins: [],
};
