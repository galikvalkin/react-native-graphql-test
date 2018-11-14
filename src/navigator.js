import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Signup from './containers/signup';
import Signin from './containers/signin';
import List from './containers/list';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 20
  },
});

const ROUTES_LIST = [
  {
    title: "Signup",
    route: "Signup",
  },
  {
    title: "Signin",
    route: "Signin",
  },
  {
    title: "List",
    route: "List",
  },
];

class RootScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {
          ROUTES_LIST.map(item => (
            <TouchableOpacity
              key={item.title}
              onPress={() => this.props.navigation.navigate(item.route)}
            >
              <Text style={styles.text}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }
}

export default createStackNavigator({
  Root: {
    screen: RootScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Navigator',
    }),
  },
  Signup: {
    screen: Signup,
    navigationOptions: ({ navigation }) => ({
      title: 'Signup',
    }),
  },
  Signin: {
    screen: Signin,
    navigationOptions: ({ navigation }) => ({
      title: 'Signin',
    }),
  },
  List: {
    screen: List,
    navigationOptions: ({ navigation }) => ({
      title: 'List',
    }),
  },
});