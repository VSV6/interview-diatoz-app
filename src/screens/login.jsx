import React, { Component } from "react";
import {
  Alert,
  BackHandler,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";

import COLORS from "../components/COLORS";
import COMMONSTYLES from "../components/STYLES";
import { getUserDetails } from "../store/user";
import validateEmail from "../components/validEmail";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isSignUpBtnDisabled: false,
      user: {
        email: "",
        password: "",
      },
    };
  }

  componentDidMount() {
    this.props.user.email && this.props.navigation.navigate("Home");

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

  handleInput = (name, value) =>
    this.setState({ user: { ...this.state.user, [name]: value } });

  handleLogin = async () => {
    const { email, password } = this.props.user;
    const { user } = this.state;

    if (email !== user.email || password !== user.password)
      return ToastAndroid.showWithGravity(
        "Invalid email/password",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );

    this.setState({ isLoading: true, isSignUpBtnDisabled: true });

    try {
      await AsyncStorage.setItem("email", this.state.user.email);
      setTimeout(() => this.props.navigation.navigate("Home"), 1500);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  handleSignUp = () => this.props.navigation.navigate("SignUp");

  render() {
    const { isLoading, isSignUpBtnDisabled, user } = this.state;

    return (
      <View style={COMMONSTYLES.container}>
        <Input
          errorMessage={
            user.email && !validateEmail(user.email) && "Enter valid email"
          }
          errorStyle={STYLES.errorStyle}
          leftIcon={<Icon name="envelope" size={20} />}
          onChangeText={(v) => this.handleInput("email", v)}
          placeholder="Type your email address"
          value={user.email}
        />

        <Input
          errorMessage={
            user.password &&
            user.password.length < 8 &&
            "Password should min length of 8 chars."
          }
          errorStyle={STYLES.errorStyle}
          leftIcon={<Icon name="lock" size={20} />}
          onChangeText={(v) => this.handleInput("password", v)}
          placeholder="Type your pasword"
          secureTextEntry={true}
          value={user.password}
        />

        <View style={COMMONSTYLES.btnContainer}>
          <Button
            buttonStyle={COMMONSTYLES.btn}
            disabled={!validateEmail(user.email) || user.password.length < 8}
            loading={isLoading}
            onPress={this.handleLogin}
            title="Login"
          />

          <Button
            buttonStyle={COMMONSTYLES.btn}
            disabled={isSignUpBtnDisabled}
            onPress={this.handleSignUp}
            title="Sign Up"
          />
        </View>
      </View>
    );
  }
}

const STYLES = StyleSheet.create({
  errorStyle: {
    color: COLORS.ERROR_COLOR,
  },
});

const mapStateToProps = (state) => ({
  user: getUserDetails(state),
});

export default connect(mapStateToProps)(Login);
