import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { graphql, compose } from 'react-apollo';

import { SIGNUP } from '../graphql/mutations';

class Signup extends React.Component{
  state = {
    username: "",
    password: ""
  };

  setUsername = username => this.setState(() => ({ username }));
  setPassword = password => this.setState(() => ({ password }));

  signup = () => {
    const { username, password } = this.state;
    if (username && password && this.props.signup) {
      this.props.signup(username, password)
        .then(res => {
          console.log('signup res: ', res);
        })
    }
  }

  render() {
    console.log('src/containers/signup this.props: ', this.props);
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          value={this.state.username}
          onChangeText={this.setUsername}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={this.state.password}
          onChangeText={this.setPassword}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={this.signup}
        >
          <Text style={styles.btnText}>
            SIGNUP
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const signup = graphql(SIGNUP, {
  props: (data) => ({
    signup: (username, password) =>
      data.mutate({
        variables: { username, password },
      }),
  }),
});

export default compose(
  signup,
)(Signup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  btn: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 20,
  },
  textInput: {
    fontSize: 20,
  }
});
