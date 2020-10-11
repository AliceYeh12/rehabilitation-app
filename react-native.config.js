module.exports = {
    dependencies: {
      'rn-samsung-health': {
        platforms: {
          android: {
            packageInstance: "new SamsungHealthPackage(BuildConfig.APPLICATION_ID)"
          }
        },
      },
      'react-native-google-fit': {
        platforms: {
          android: {
            packageInstance: "new GoogleFitPackage(BuildConfig.APPLICATION_ID)"
          }
        },
      },
    },
  };