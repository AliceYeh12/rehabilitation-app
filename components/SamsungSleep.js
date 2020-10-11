/* import RNSamsungHealth from 'rn-samsung-health'
 
RNSamsungHealth.authorize((err, res) => {
  if (res) {
  let startDate = new Date().setDate(new Date().getDate()-30); // 30 days back date
  let endDate = new Date().getTime(); //today's date
    let opt = {startDate, endDate};
    RNSamsungHealth.getDailyStepCount(opt, (err, res) => {
      if (err) console.log(err);
      if (res) console.log(res);
    });
 
 
// more similar functions are - 
    //getDailyStepCount
    //getHeight
    //getWeight
    //getSleep
    //getCholesterol
    //getBloodPressure
    //getBodyTemprature
 
    } else console.log(err);
}); */