
## INSTALL DEPENDENCIES

```bash
npm i 
```

## RUN THE APP

```bash
npm run start
npm run build:css:watch
```

## BUILD POSTCSS

```bash
npm run build:css
# OR WITH WATCHMODE
npm run build:css:watch
```

# -------- CONFIG --------

## POSTCSS PLUGINS AND TAILWIND

```bash
npm install postcss-import
npm install postcss@latest autoprefixer@latest
npm install tailwindcss
```

## CREATE CONFIG FILE FOR TAILWIND

```bash
npx tailwindcss init
# With postcss.config.js file
npx tailwindcss init -p
```

## Scaffolding the entire default configuration

```bash
npx tailwindcss init --full
```

[Tailwind doc](https://tailwindcss.com/docs/using-with-preprocessors#using-post-css-as-your-preprocessor)

## BUILD THE CSS FILE

```bash
# exemple arbo
------/public
  ----/styles
    --/style.css
    --/tailwind.css
```

In tailwind.css add those lines

```css
/* With postcss-import installed */
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

/* With postcss-import NOT installed */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Add this script to package.json in scripts key :

```bash
"build:css": "postcss public/styles/tailwind.css -o public/styles/style.css"
```

Then when we call in terminal npm run build:css its compiles the css ine the style.css file, we can do the code in tailwind.css and import style.css as usual in html.
