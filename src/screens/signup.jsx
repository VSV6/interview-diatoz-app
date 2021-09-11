import React, { Component } from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";
import { connect } from "react-redux";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";

import COLORS from "../components/COLORS";
import COMMONSTYLES from "../components/STYLES";
import { createUser } from "../store/user";
import DateTimePicker from "@react-native-community/datetimepicker";
import validateEmail from "../components/validEmail";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDatePicker: false,
      isLoading: false,
      isLoginBtnDisabled: false,
      user: {
        DOB: "",
        email: "",
        password: "",
        username: "",
      },
    };
  }

  handleDatePicker = (date) => {
    if (date.type === "set") {
      const { timestamp } = date.nativeEvent;
      const reverseDateFormat = timestamp.toString().split("T")[0];
      const [, month, day, year] = reverseDateFormat.split(" ");

      this.setState({
        isDatePicker: false,
        user: { ...this.state.user, DOB: `${day}/${month}/${year}` },
      });
    }
  };

  handleInput = (name, value) =>
    this.setState({ user: { ...this.state.user, [name]: value } });

  handleLogin = () => this.props.navigation.goBack();

  handleSignUp = () => {
    this.setState({ isLoading: true, isLoginBtnDisabled: true });
    this.props.createUser(this.state.user);

    setTimeout(
      () =>
        this.setState({ isLoading: false }, () => {
          this.props.navigation.goBack();
          ToastAndroid.showWithGravity(
            "Your account has been created successfully!",
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          );
        }),
      1500
    );
  };

  showDatePicker = () => this.setState({ isDatePicker: true });

  render() {
    const { isDatePicker, isLoading, isLoginBtnDisabled, user } = this.state;

    return (
      <View style={COMMONSTYLES.container}>
        <Input
          errorMessage={
            user.username &&
            user.username.length < 3 &&
            "Username should be min of 3 chars."
          }
          errorStyle={STYLES.errorStyle}
          leftIcon={<Icon name="user" size={20} />}
          onChangeText={(v) => this.handleInput("username", v)}
          placeholder="Type your name"
          value={user.username}
        />

        <Input
          leftIcon={<Icon name="calendar-alt" size={20} />}
          rightIcon={
            <Button onPress={this.showDatePicker} title="Open date picker" />
          }
          placeholder="Select Date"
          value={user.DOB}
        />

        {isDatePicker && (
          <DateTimePicker
            dateFormat="day month year"
            is24Hour={true}
            onChange={this.handleDatePicker}
            value={new Date()}
          />
        )}

        <Input
          errorMessage={
            user.email && !validateEmail(user.email) && "Email is not valid."
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
            disabled={
              user.username.length < 3 ||
              !validateEmail(user.email) ||
              user.password.length < 8
            }
            loading={isLoading}
            onPress={this.handleSignUp}
            title="Sign Up"
          />

          <Button
            buttonStyle={COMMONSTYLES.btn}
            disabled={isLoginBtnDisabled}
            onPress={this.handleLogin}
            title="Login"
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

const mapDispatchToProps = (dispatch) => ({
  createUser: (user) => dispatch(createUser(user)),
});

export default connect(null, mapDispatchToProps)(SignUp);
