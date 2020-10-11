import GoogleFit, { Scopes } from 'react-native-google-fit'

GoogleFit.checkIsAuthorized().then(() => {
    console.log(GoogleFit.isAuthorized) 
    if(!GoogleFit.isAuthorized){
      // The list of available scopes inside of src/scopes.js file
    const options = {
        scopes: [
            Scopes.FITNESS_ACTIVITY_READ_WRITE,
            Scopes.FITNESS_BODY_READ_WRITE,
        ],
    }
    GoogleFit.authorize(options)
        .then(authResult => {
            if (authResult.success) {
                console.log("AUTH_SUCCESS");
                GoogleFit.getSleepData({
                    startDate: "2020-01-01T12:33:18.873Z",
                    endDate: "2020-10-10T13:45:00.000Z"
                }, (err, res) => {
                    console.log(res)
                });
            } else {
                console.log("AUTH_DENIED", authResult.message);
            }
        })
        .catch(() => {
            console.log("AUTH_ERROR");
        })
    }
})