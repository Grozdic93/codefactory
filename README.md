# CodeFactory Website

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.1.

## Description
This is a website developed for CodeFactory, built using Angular and other modern web technologies. The project is open-source, but any modifications or distributions must provide proper credit to the original author.

## Features
- Fully responsive design
- API integration
- User authentication
- Dynamic content management
- SEO-friendly structure

## Installation

To run this project locally, follow these steps:
# Clone the repository
git clone https://github.com/yourusername/codefactory-website.git

# Navigate to the project directory
cd codefactory-website

# Install dependencies
npm install
## Environment Configuration

Before running the project, you need to create an environment file (`environment.ts`) with the following structure:

```typescript
export const environment = {
  production: true, // or false in environment.development.ts
  backendUrl: "your backend url for firebase admin sdk",
  backendUrlS: "your backend url for email handling",
  // firebase configuration
  firebase: {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
  },
  recaptchaSiteKey: "your recaptcha google api",
  googleCloudApiKey: "your google cloud api"
};
```

# Start the development server
- ng serve
- Then open http://localhost:4200/ in your browser.

## License
- This project is licensed under the MIT License. See the LICENSE file for details.

## Author
Dusan Grozdic
- For any inquiries, feel free to reach out!

## Contributions
Contributions are welcome! If you want to contribute:

Fork the repository
Create a new branch
Commit your changes
Submit a pull request
