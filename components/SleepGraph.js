import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  Button,
  Dimensions
} from "react-native";

import moment from 'moment'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

class SleepGraph extends React.Component{
    constructor(props){
        super(props)
    }

    parseDates = (sleepData, start, end) => {
        let newSleepData = {
            dates:[],
            sleepTimes:[],
            nullPoints: [],
        }
        for(let d = moment(start); !moment(end).isSameOrBefore(d, "day"); d=d.add(1, 'day')){
            newSleepData.dates.push(d.format("YYYY-MM-DD"))
            
            let find = sleepData.find((log) => d.isSame(moment(log.date), "day"))
            if(find != undefined){
                newSleepData.sleepTimes.push(find.time/60)
            }
            else{
                newSleepData.nullPoints.push(newSleepData.sleepTimes.length)
                newSleepData.sleepTimes.push(8)
            }
        }
        //console.log(newSleepData.dates, newSleepData.sleepTimes)
        return newSleepData
    }

    parseDatesContribution = (sleepData) => {
        let newSleepData = []
        for(const log of sleepData){
            newSleepData.push({
                date: moment(log.date).format('YYYY-MM-DD'),
                count: Math.min(Math.round(log.time/60 * 10), 100)
            })
        }
        console.log(newSleepData)
        return newSleepData
    }

    onLineDataPointClick = ({index, value}, data) => {
        const d = moment(data.dates[index])
        console.log("LINE", index, value, data.dates[index])
        if(d.isAfter(moment(), "days")){

        }
        else{
            this.props.dateSelected(d)
        }
        
    }

    onMapDataPointClick = ({count, date}) => {
        console.log("MAP", count, date)
        const d = moment(date)
        if(d.isAfter(moment(), "days")){

        }
        else{
            this.props.dateSelected(d)
        }
        
    }

    renderLineGraph = () => {
        const sleepData = this.parseDates(this.props.sleepData, this.props.start, this.props.end)

        return (
            this.props.sleepData && this.props.sleepData.length > 0 ? <View>
                <LineChart
                    data={{
                    labels: sleepData.dates,
                    datasets: [
                        {
                            data: sleepData.sleepTimes
                        },
                        {
                            data: [0],
                            color: () => 'rgba(0, 0, 0, 0)',
                        },
                    ]
                    }}
                    hidePointsAtIndex={sleepData.nullPoints}
                    width={Dimensions.get("window").width} // from react-native
                    height={220}
                    withVerticalLabels={false}
                    yAxisSuffix=" hours"
                    onDataPointClick={(value) => {
                        this.onLineDataPointClick(value, sleepData)
                    }}
                    chartConfig={{
                        backgroundColor: "#dde2ff",
                        backgroundGradientFrom: "#C04848",
                        backgroundGradientTo: "#480048",
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "2",
                                strokeWidth: "2",
                                stroke: "#ffffff"
                            }
                    }}
                        bezier
                    style={{
                        marginVertical: 8,
                    }}
                />
            </View> : null
        )
    }

    renderHeatmap = () => {
        const sleepData = this.parseDatesContribution(this.props.sleepData)

        const chartConfig = {
            backgroundColor: "#dde2ff",
            backgroundGradientFrom: "#C04848",
            backgroundGradientTo: "#480048",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 0
            },
        };
        return (
            this.props.sleepData && this.props.sleepData.length > 0 ? <ContributionGraph
                values={sleepData}
                endDate={moment(this.props.end).toDate()}
                numDays={105}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                onDayPress={this.onMapDataPointClick}
            /> : null
        )
    }

    render() {        
        if(this.props.type == "line"){
            return this.renderLineGraph()
        }
        else if(this.props.type == "map"){
            return this.renderHeatmap()
        }
        else{
            return null
        }
    }
}

export default SleepGraph