# Next.js 14 Website Project with pnpm

This project is a website built with Next.js 14 and managed with pnpm. It also uses environment variables to configure key aspects of the application.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [pnpm](https://pnpm.io/)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Enzo889/FOTO.git
   ```

2. Navigate to the project directory:
   ```bash
   cd FOTO
   ```
3. Install the dependencies using pnpm:
   ```bash
   pnpm install
   ```

## Environment Variables Configuration

This project uses environment variables to configure certain aspects. Create a .env.local file in the root of the project and add your environment variables there. Ensure that this file is not included in version control (.gitignore is already set up to ignore it).

### Example of .env.local:

```plaintext
 NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_api_key
 NEXT_PUBLIC_UNSPLASH_SECRET_KEY=your_secret_key
```

## Available Scripts

In the project directory, you can run:

`pnpm dev`
Runs the app in development mode.
Open http://localhost:3000 to view it in the browser. The page will reload if you make edits.

`pnpm build`
Builds the app for production to the .next folder.
This includes optimizations like minification and precompilation.

`pnpm start`
Starts the production server on http://localhost:3000.
Make sure to run pnpm build before this command.

`pnpm lint`
Runs the linter to find and fix issues in your code.

## Project Structure

The project follows the standard Next.js structure:

- `app/`: Contains the application's pages.
- `public/`: Static files like images and fonts.
- `src/`: Contains the full aplication.
- `components/`: Reusable UI components.

### Contributions

Contributions are welcome. Please open an issue or submit a pull request.

### License

This project is licensed under the **MIT License**.

#### Thank you for using our project! If you have any questions or need help, feel free to contact us.
