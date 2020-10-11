import GoogleFit, { Scopes } from 'react-native-google-fit'
import moment from 'moment'

const options = {
    scopes: [
        Scopes.FITNESS_ACTIVITY_READ_WRITE,
        Scopes.FITNESS_BODY_READ_WRITE,
    ],
}

const parse = (start, end, data) => {
    console.log(data)
    return data
}

const getData = (start, end, callback) => {
    GoogleFit.getSleepData({
        startDate: start,
        endDate: end
    }, (err, res) => {
        console.log("Got Sleep Data")
        callback(err, parse(start, end, res))
    });
}

export default function getSleepData(start, end, callback){
    GoogleFit.checkIsAuthorized().then(() => {
        console.log(GoogleFit.isAuthorized) 
        if(!GoogleFit.isAuthorized){  
            GoogleFit.authorize(options)
                .then(authResult => {
                    if (authResult.success) {
                        console.log("AUTH_SUCCESS");
                        getData(start, end, callback)
                    } else {
                        console.log("AUTH_DENIED", authResult.message);
                    }
                })
                .catch(() => {
                    console.log("AUTH_ERROR");
                })
        }
        else{
            getData(start, end, callback)
        }
    })
}
