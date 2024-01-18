/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-image': 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(255, 255, 255, 0)), url("https://www.tuentrada.com/experiencia/ayuda-consulta/background-footer.jpg")',
        'main-image': 'url("https://www.tuentrada.com/experiencia/ayuda-consulta/background-main.png")'
      },
      gradientColorStops: {
        "blue-dark": "#1955A5",
        "red-dark": "#a51919",
        "maroon-dark": "#220D16",
        "blue-light": "#0893DD",
        "card-blue-light": "#1F83BF",
        "card-blue-dark": "#1C6CB2",
        "card-pink-light": "#8A2883",
        "card-pink-dark": "#583C92",
        "footer-light": "rgba(255,255,255,0)",
        "foter-dark": "rgba(0,0,0,0.9)",
      },
      colors: {
        "blue-dark": "#1955A5",
        "red-dark": "#a51919",
        "blue-light": "#0893DD",
        "hover-button-card": "#1C6CB2",
      },
      backgroundPosition: {
      
        'left-50': 'left 50px',
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
