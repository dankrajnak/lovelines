/* eslint-disable @typescript-eslint/no-var-requires */
// const Colors = require("./src/Styles/colors");
const withLess = require("@zeit/next-less");

module.exports = withLess({
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        // white: Colors.white,
        // "body-background": Colors.white,
        // "component-background": Colors.white,
        // "link-color": "#1DA57A",
      },
    },
  },
});
