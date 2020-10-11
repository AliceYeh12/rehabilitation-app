import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { API_KEY } from '@env'

import MealSuggestor from './components/MealSuggestor'

export default class NutritionHome extends React.Component {
  constructor() {
    super();
    this.state = {
      stateName: "",
      imgUrl: "",
      mealsEaten: 0,
      calories: 0,
      carbs: 0,
      protein: 0,
      maxCalories: 0,
      maxCarbs: 0,
      maxProtein: 0
    };
  }

  onButtonPressedSetState = (maxCalories, maxCarbs, maxProtein) => {
    
    const { mealsEaten, calories, carbs, protein } = this.state;
    let url = `https://api.spoonacular.com/recipes/findByNutrients?apiKey=${API_KEY}&maxCalories=${maxCalories}&maxCarbs=${maxCarbs}&maxProtein=${maxProtein}&number=1`
    let newMealsEaten = 0, newCalories = 0, newCarbs = 0, newProtein = 0;

    fetch(url, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      newMealsEaten = mealsEaten + 1;
      newCalories = calories + responseJson[0]["calories"];
      newCarbs = carbs + parseInt(responseJson[0]["carbs"].slice(0, -1));
      newProtein = protein + parseInt(responseJson[0]["protein"].slice(0, -1));
      this.setState({
        stateName: responseJson[0]["title"],
        mealsEaten: newMealsEaten,
        calories: newCalories, 
        carbs: newCarbs,
        protein: newProtein
      })
    })
    .catch((error) => {
      console.error(error);
    });

  }

  handleCalories = (text) => {
    this.setState({ maxCalories: text })
  }

  handleCarbs = (text) => {
    this.setState({ maxCarbs: text })
  }

  handleProtein = (text) => {
    this.setState({ maxProtein: text })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Nutrition</Text>
        <View style={styles.dashboard}>
          <Text style={styles.dashboardTitle}>My Dashboard</Text>
          <Text style={styles.dashboardText}>Meals Eaten: {this.state.mealsEaten}</Text>
          <Text style={styles.dashboardText}>Calories: {this.state.calories}</Text>
          <Text style={styles.dashboardText}>Carbohydrates: {this.state.carbs}</Text>
          <Text style={styles.dashboardText}>Protein: {this.state.protein}</Text>
        </View>
        <View>
          <Text style={styles.suggestionTitle}>Get a Meal Suggestion</Text>
          <TextInput
              style={styles.indInput}
              placeholder="Maximum Calories"
              onChangeText={this.handleCalories}
          />
          <TextInput
              style={styles.indInput}
              placeholder="Maximum Carbohydrates (g)"
              onChangeText={this.handleCarbs}
          />
          <TextInput
              style={styles.indInput}
              placeholder="Maximum Protein (g)"
              onChangeText={this.handleProtein}
          />
        </View>
        <Button title="Suggest Meal"
            onPress = {
              () => this.onButtonPressedSetState(this.state.maxCalories, this.state.maxCarbs, this.state.maxProtein)
            }
        />
        <MealSuggestor food={this.state.stateName}/>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    marginTop: 75,
  },
  titleText: {
    fontSize: 36,
    textAlign: "center",
    padding: 15,
    backgroundColor: "lightgray",
  },
  dashboard: {
    margin: 20,
    marginTop: 30,
    padding: 15,
    textAlign: "left",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
  dashboardTitle: {
    fontSize: 28,
    marginBottom: 10,
  },
  dashboardText: {
    fontSize: 20,
    opacity: 0.7,
    marginBottom: 5
  },
  suggestionTitle: {
    textAlign: "center",
    fontSize: 28,
    marginTop: 20,
  },
  inputContainer: {
    margin: 30,
    alignContent: "flex-start",
  },
  indInput: {
    margin: 15,
    marginTop: 0,
    fontSize: 20,
    padding: 10
  }
})