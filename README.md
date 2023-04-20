
# OpenSauced Browser Extension

This project is my basic version for [OpenSauced Extension](https://github.com/open-sauced/browser-extensions/)! This is a simple and easy-to-use Extension that enhances your GitHub experience by providing useful information and features.

## Features

- Check if a GitHub user has an OpenSauced account
- Adds a button to quickly navigate to their OpenSauced profile
- Find more about their contributions & Highlights
- Add your own highlights to your OpenSauced account

## Installation

To install the extension, follow these steps:

1. Clone the repository or download the ZIP file
2. cd over to vite-extension folder and run the command `npm install` 
3. run the `npm run dev` cpmmand, It'll generate a dist folder on the current path 
4. Open your browser and go to the extensions page
5. Enable developer mode
6. Click on "Load unpacked" and select the dist folder

## Technical details

- This is a vite-react powered browser Extension made with the [CRXJS](https://crxjs.dev/vite-plugin/getting-started/vanilla-js/create-project) guidance. CRXJS makes it easy to set up a Chrome Extension project with a modern development experience. 

- The OpenSauced Extension incorporates multiple APIs from OpenSauced and implements API optimization techniques such as debouncing, memoization, caching etc to ensure a smooth and efficient user experience. Additionally, the extension features comprehensive error and loading states to handle a variety of scenarios.

- To ensure that the extension always provides up-to-date information, it runs on hash change and utilizes Chrome's sync storage to transfer data seamlessly between the content script and popup script. When user tried to add their highlight, it does the initial validation with the help of regex for a valid GitHub pull request..

## Usage

Once the extension is installed, you can use it on any user's GitHub profile page. Simply add the extension to the browser and it'll do its job, adding the 'View on OpenSauced' button.. you can select the desired feature from the popup window.



https://user-images.githubusercontent.com/92778686/233290923-f79369fe-a922-447e-8789-ff1ffcdcf5b2.mp4

*highlight functionality after 

## Contributing

This is not the official OpenSauced's Extension, just a personal project. If you like to add some new features to it, You're always welcome. To contribute, please fork the repository and submit a pull request.

## Acknowledgements

I would like to thank the OpenSauced community and espacially [Brian Douglas](https://github.com/bdougie) for their valuable suggestions and feedback.
