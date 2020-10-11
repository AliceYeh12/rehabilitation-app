import React from 'react';
import { Text, View, StyleSheet } from "react-native";

class MealSuggestor extends React.Component {
    render() {
        return (
        <View>
            <Text style={styles.suggestionText}>{this.props.food}</Text>
        </View>
        )
    }
}

const styles = StyleSheet.create ({
  suggestionText: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 30
  }
})

export default MealSuggestor