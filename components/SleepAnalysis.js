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
import SleepGraph from "./SleepGraph";

class SleepAnalysis extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            sleepData: [],
            markedDatesArray: [],
        }
        this.calendar = React.createRef()
    }

    componentDidMount(){
        console.log('Mounted')
    }

    isDateBetweenWeek = (date=this.calendar.current.getSelectedDate()) => {
        console.log("COMPARISON", moment(date).format("YYYY-MM-DD"), moment(this.state.start).format("YYYY-MM-DD"), moment(this.state.end).format("YYYY-MM-DD"))
        return this.state.start && 
                this.state.end && 
                moment(date).subtract(8, "days").isSameOrAfter(this.state.start, "day") && 
                moment(date).add(8, "days").isSameOrBefore(this.state.end, 'day')
    }

    dateSelected = (date) => {
       /*  if(this.isDateBetweenWeek(date)){
           
        } 
        else{
            this.calendar.current.updateWeekView(date)
            
        }
        console.log("DATE SELECTED", date) */
    }

    dateSelectedFromGraph = (date) => {
        this.calendar.current.setSelectedDate(date.toDate())
    }

    weekSelected = (start, end) => {
        console.log("WEEK", start, end, this.isDateBetweenWeek())
        if(!this.isDateBetweenWeek() || this.state.sleepData.length == 0){
            getSleepData(moment(start).subtract(8, "days").toISOString(), moment(end).add(8, 'day').toISOString(), (err, res) => {
                if(!err){
                    let marks = []
                    for(const sleepLog of res){
                        if(sleepLog.sleepTime >= 480 && sleepLog.sleepTime < 600){
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
                        start: moment(start).subtract(8, "days").toISOString(),
                        end: moment(end).add(8, "days").toISOString()
                    }), () => {
                        console.log("STATE CHANGED")
                    })
                }
                else{
                    this.setState(() => ({
                        sleepData: [],
                        markedDatesArray: [],
                        start: moment(start).subtract(8, "days").toISOString(),
                        end: moment(end).add(8, "days").toISOString()
                    }), () => {
                        console.log("STATE CHANGED")
                    })
                }
            })
        }
        else{
            this.setState(() => {
                return {
                    start: moment(start).subtract(8, "days").toISOString(),
                    end: moment(end).add(8, "days").toISOString()
                }
            })
        }
    }

    renderRange = () => {
        console.log("RENDER RANGE")
        const index = this.state.sleepData.findIndex((log) => {
            return moment(log.endDate).isSame(this.calendar.current.getSelectedDate(), "day")
        })
        console.log('DATE INDEX', index)
        return (<View key={`dateIndex${index}`}>
            {index != -1 ? <Text key="date">
                {moment(this.state.sleepData[index].endDate).format("MM/DD/YYYY")}
            </Text> : null}
            {index != -1 ? [<Text key="startTime"> 
                Slept From: {moment(this.state.sleepData[index].startDate).format("hh:mm a")}
            </Text>,
            <Text key="endTime">
                To: {moment(this.state.sleepData[index].endDate).format("hh:mm a")}
            </Text>] : <Text key="noEntry">
                No Sleep Entry
            </Text>}
        </View>)
    }

    render() {
        const graphData = this.state.sleepData.map(log => {
            return {date: log.endDate, time: log.sleepTime}
        })
        return (
            <View>
                <CalendarDay 
                    ref={this.calendar}
                    onDateSelected = {this.dateSelected}
                    daySelectionAnimation={{
                        type: "border",
                        borderHighlightColor:"#aa9955",
                        borderWidth: 2,

                    }}
                    onWeekChanged = {this.weekSelected}
                    markedDates = {[...this.state.markedDatesArray]}
                    maxDate={moment()}
                />
                <SleepGraph 
                    key = {`line${this.state.start}${this.state.end}`}
                    sleepData={graphData}
                    start={this.state.start}
                    end={this.state.end}
                    type={"line"}
                    dateSelected={this.dateSelectedFromGraph}
                />
                <SleepGraph 
                    key = {`map${this.state.start}${this.state.end}`}
                    sleepData={graphData}
                    start={this.state.start}
                    end={this.state.end}
                    type={"map"}
                    dateSelected={this.dateSelectedFromGraph}
                />
                {this.state.sleepData.length > 0 && this.calendar.current.getSelectedDate() ? this.renderRange() : null}
                
            </View>
            
        )
    }
}

export default SleepAnalysis