/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-primary": "#717FF8",
        "custom-secondary": "#E5FFEF",
        "custom-secondary-light": "#E1F8E6",
        "custom-third": "#FCA120",
      },
      fontFamily: {
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui'],
        spartan: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
