module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
<<<<<<< HEAD
      ["import", { libraryName: "@ant-design/react-native" }]
=======
      "module:react-native-dotenv"
>>>>>>> Create nutrition page
    ]
  };
};
