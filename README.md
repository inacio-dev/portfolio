# Portfolio Site

This repository contains the implementation of a functional portfolio website, created according to the design guidelines provided by myself in the [Figma Design](https://www.figma.com/file/9uD7fJW0ywgmwxfmJAbmBN/Portfolio?type=design&mode=design&t=nIHyFtDO7aphvQKg-1). The project was developed using the Next framework and is fully responsive, adapting to any screen size.

## Table of contents

- [Technologies Used](#technologies-used)
- [Deploy on Vercel](#deploy-on-vercel)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Using Next](#using-next)
- [Code Formatting](#code-formatting)
- [Contribution](#contribution)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Technologies Used

- HTML
- JavaScript
- Tailwind CSS
- Next
- TypeScript
- EsLint
- Prettier

## Getting Started

Follow the steps below to set up and run the project on your local environment:

1. Clone this repository:

   ```bash
   git clone https://github.com/inacio-dev/portfolio.git
   ```

2. Navigate to the project directory:

   ```bash
   cd portfolio
   ```

3. Install dependencies using one of the following package managers (choose one):

   ```bash
   npm install
   yarn install
   pnpm install
   ```

4. After installing dependencies, start the project:

   ```bash
   npm start
   yarn start
   pnpm start
   ```

The site will be available at [http://localhost:3000](http://localhost:3000/).

## Deploy on Vercel

This project is deployed on Vercel. You can access the live site at [Vercel deploy](https://inacio-rodrigues.vercel.app/en).

## Project Structure

Inside your Next project, you'll see the following folders and files:

```bash
   /
   ├── src/
   │ ├── app/
   │ | ├── [language]/
   │ | | ├── about/
   │ | | ├── projects/
   │ | | ├── records/
   │ | | ├── terms/
   │ ├── assets/
   │ ├── components/
   │ ├── hooks/
   │ ├── messages/
   │ ├── utils/
   └── package.json
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Using Next

This project was built using the Next framework. If you're new to Next and want to learn more about how to use it, follow these steps:

1. Create a new Next project:

   ```bash
      npx create-next-app@latest
   ```

2. On installation, you'll see the following prompts:

   ```bash
      What is your project named? my-app
      Would you like to use TypeScript? No / Yes
      Would you like to use ESLint? No / Yes
      Would you like to use Tailwind CSS? No / Yes
      Would you like to use `src/` directory? No / Yes
      Would you like to use App Router? (recommended) No / Yes
      Would you like to customize the default import alias (@/*)? No / Yes
      What import alias would you like configured? @/*
   ```

3. Start your Next project locally:

   ```bash
      npm run dev
   ```

Your Next project will be available at http://localhost:3000.

4. To build your production site, run:

   ```bash
      npm run build
   ```

5. For more information and advanced usage of Next, refer to the [Next documentation](https://nextjs.org/).

## Code Formatting

We use Prettier and ESLint for code formatting in this project to ensure consistent and clean code. You can format your code using the following commands:

- Format all JavaScript and TypeScript files:

  ```bash
     npm run format
  ```

- Check for code formatting issues:

  ```bash
     npm run lint
  ```

## Contribution

You can contribute to this project by opening issues, suggesting improvements, or creating pull requests. Feel free to contact the project author directly on GitHub.

## Author

- GitHub: [Inácio Rodrigues](https://github.com/inacio-dev)
- Email: inaciormgalvao@gmail.com
- Website: [Portfolio](https://inacio-rodrigues.vercel.app/en)
