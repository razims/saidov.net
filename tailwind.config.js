/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--background)",
        ink: "var(--foreground)",
        "muted-ink": "var(--muted)",
        rule: "var(--subtle)",
        surface: "var(--panel)",
        field: "var(--field-border)",
        "focus-ring": "var(--focus)"
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
