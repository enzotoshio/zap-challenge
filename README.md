This project was bootstrapped with Create React App.
It uses redux, redux-thunk, normalizr, reselect and react-router-dom, and an adaptive fractal project structure.
It's code quality is guaranteed throught prettier and eslint (both with editors plugins).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run test:debug`

Launches the test runner in the interactive watch mode, it start on hold so you can open chrome inspect.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

Currently if the application is served via `https` it won't work beacuse of the requests beeing made to `http` domains.

You can serve it with:

```sh
npx serve -s build
```

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If necessary to alter the project pipeline, it's possible to eject and get out of the `create-react-app` structure.
