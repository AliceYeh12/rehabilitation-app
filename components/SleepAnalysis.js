import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  Button
} from "react-native";

import moment from 'moment'
import CalendarDay from 'react-native-calendar-strip'
import TimeInterval from "react-native-clock-interval";
import getSleepData from "./GoogleSleep";

class SleepAnalysis extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            sleepData: [],
            markedDatesArray: []
        }
        this.calendar = React.createRef()
    }

    componentDidMount(){
        console.log('Mounted')
        
    }

    dateSelected = (date) => {
        console.log(date)
    }

    weekSelected = (start, end) => {
        console.log("WEEK",start, end)
        getSleepData(moment(start).subtract(1, "week").toISOString(), moment(end).add(1, "week").toISOString(), (err, res) => {
            
            if(!err){
                let marks = []
                for(const sleepLog of res){
                    if(moment(sleepLog.endDate).diff(moment(sleepLog.startDate), "minutes") >= 480){
                        marks.push({
                            date: moment(sleepLog.endDate),
                            lines: [{
                                color: "#32CD32"
                            }]
                        })
                    }
                    else{
                        marks.push({
                            date: moment(sleepLog.endDate),
                            lines: [{
                                color: "#FF5555"
                            }]
                        })
                    }
                }
                this.setState(() => ({
                    sleepData: res,
                    markedDatesArray: marks,
                }), () => {
                    console.log("STATE CHANGED")
                })
            }
            else{
                this.setState(() => ({
                    sleepData: [],
                    markedDatesArray: [],
                }), () => {
                    console.log("STATE CHANGED")
                })
            }
        })
    }

    renderRange =() => {
        
        const index = this.state.sleepData.findIndex((log) => {
            return moment(log.endDate).isSame(this.calendar.current.getSelectedDate(), "day")
        })
        console.log(index)
        return (index != -1 ? <View>
            <Text>
                Slept From: {moment(this.state.sleepData[index].startDate).format("hh:mm a")}
            </Text>
            <Text>
                To: {moment(this.state.sleepData[index].endDate).format("hh:mm a")}
            </Text>
        </View> : null)
    }

    render() {
        return (
            <View>
                <CalendarDay 
                    ref={this.calendar}
                    onDateSelected = {this.dateSelected}
                    onWeekChanged = {this.weekSelected}
                    markedDates = {[...this.state.markedDatesArray]}
                    maxDate={moment()}
                />
                {this.state.sleepData.length > 0 && this.calendar.current.getSelectedDate() ? this.renderRange() : null}
            </View>
            
        )
    }
}

export default SleepAnalysis