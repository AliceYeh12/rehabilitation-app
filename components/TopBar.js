import * as React from "react";
import {
  View,
  Text
} from "react-native";

class TopBar extends React.Component{
    render () {
        return (<View style={this.props.style}>
            <Text>
                Recovering Ravens
            </Text>
        </View>)
    }
}

export default TopBar