import React, { Component } from "react";
import { Alert, BackHandler, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { Header } from "react-native-elements";

import { getUserDetails } from "../store/user";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackAction
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackAction = () => {
    Alert.alert("Are you sure want to quit this app?", [
      {
        onPress: () => null,
        style: "cancel",
        text: "Cancel",
      },
      { onPress: () => BackHandler.exitApp(), text: "Yes" },
    ]);
    return true;
  };

  render() {
    return (
      <View style={STYLES.container}>
        <Header
          leftComponent={{
            icon: "menu",
            color: "#fff",
            iconStyle: { color: "#fff" },
          }}
          centerComponent={{
            text: "Home",
            style: { color: "#fff", fontWeight: "700" },
          }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        <Text style={STYLES.welcomeText}>
          Hi, {this.props.user.username}! Welecome to our app.
        </Text>
      </View>
    );
  }
}

const STYLES = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeText: {
    color: "gray",
    marginTop: "75%",
    textAlign: "center",
  },
});

const mapStateToProps = (state) => ({
  user: getUserDetails(state),
});

export default connect(mapStateToProps)(Home);
