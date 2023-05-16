// tailwind.config.js
const path = require("path");

module.exports = {
  content: [
    "./src/**/*{js,ts,jsx,tsx}",
   path.join(
      require.resolve("@thaddeusjiang/react-sortable-list"),
      "../**/*.{js,ts,jsx,tsx}"
    ),
  ],
  theme: {},
  plugins: [],
};