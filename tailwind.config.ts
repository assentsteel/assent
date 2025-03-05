import type { Config } from "tailwindcss";

const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        xxl: "1450px",
        xxxl: "1700px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "15px",
        },
        screens: {
          xs: "100%",
          sm: "540px",
          md: "740px",
          lg: "960px",
          xl: "1140px",
          xxl: "1420px",
          xxxl: "1650px",
        },
      },
      colors: {
        primary: "#18355F",
        secondary: "#5BA646",
        territory: "#1F1F1F",
        /* primary: {
				primary: '#FE6601',   
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			}, */
        "custom-gray": "#F2F2F2",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
     
      fontSize: {
        xxl: 'clamp(2.5rem, 4vw, 4.0625rem)',  // 56px - 65px  
        xl: 'clamp(2rem, 3vw, 3.4375rem)',     // 48px - 55px  
        lg: 'clamp(1.5625rem, 3vw, 1.875rem)', // **25px - 30px**  
        md: 'clamp(1.2rem, 2vw, 1.5rem)',    // 22px - 24px  
        sm: 'clamp(1.0625rem, 1.5vw, 1.1875rem)', // 17px - 19px  
        xs: 'clamp(0.875rem, 1.2vw, 0.9375rem)', // 14px - 15px               
      },
      borderRadius: {
        custom: "20px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ":root": newVars,
  });
}
