module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
<<<<<<< HEAD
<<<<<<< HEAD
      ["import", { libraryName: "@ant-design/react-native" }]
=======
      "module:react-native-dotenv"
>>>>>>> Create nutrition page
=======
      "module:react-native-dotenv"
>>>>>>> 7dbb2f0fae3ddeb6bf6229af125c87d75c24629c
    ]
  };
};
