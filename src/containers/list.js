import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import { graphql, compose } from 'react-apollo';

import { CREATE_USER, DELETE_USER_BY_ID } from '../graphql/mutations';
import { ALL_USERS_QUERY, GET_USER_BY_NAME } from '../graphql/queries';

class List extends React.Component {
  state = {
    username: "",
    password: "",
  };

  setUsername = username => this.setState(() => ({ username }));
  setPassword = password => this.setState(() => ({ password }));

  createUser = () => {
    console.log('this.props: ', this.props);

    const { username, password } = this.state;
    if (username && password && this.props.createUser) {
      this.props.createUser(username, password)
        .then(res => this.props.refetch())
    }
  }

  deleteUser = (user) => {
    if (this.props.deleteUserById) {
      
      this.props.deleteUserById(user.id)
        .then(res => this.props.refetch());
    }
  }

  render() {
    console.log('src/containers/list this.props: ', this.props);
    return (
      <View style={styles.container}>
        <View style={styles.form}>
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
            onPress={this.createUser}
          >
            <Text style={styles.btnText}>
              CREATE USER
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {this.props.allUsers && this.props.allUsers.map(item => (
            <View
              style={styles.listItem}
              key={item.id}
            >
              <Text>{item.username}</Text>

              <TouchableOpacity onPress={() => this.deleteUser(item)}>
                <Text>
                  Delete
                </Text>
              </TouchableOpacity>

            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const createUser = graphql(CREATE_USER, {
  props: (data) => ({
    createUser: (username, password) =>
      data.mutate({
        variables: { username, password },
      }),
  }),
});

const deleteUserById = graphql(DELETE_USER_BY_ID, {
  props: (data) => ({
    deleteUserById: (id) =>
      data.mutate({
        variables: { id },
      }),
  }),
});

const allUsers = graphql(ALL_USERS_QUERY, {
  props: (res) => res.data
});

export default compose(
  deleteUserById,
  createUser,
  allUsers,
)(List);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  form: {
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentContainerStyle: {
    flex: 1,
  },
  listItem: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
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
