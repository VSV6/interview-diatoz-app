import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { List } from "@ant-design/react-native";

import callAPI from "../components/api";
import COMMONSTYLES from "../components/STYLES";

const Item = List.Item;

class MyShifts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shifts: [],
    };
  }

  componentDidMount() {
    this.getShifts();
  }

  cancelBooking = async (id) => {
    try {
      const { data } = await callAPI(`shifts/${id}/cancel`, "post");
      return this.setState({ shifts: data.data });
    } catch (error) {
      alert("Internal server error!");
    }
  };

  getShifts = async () => {
    try {
      const { data } = await callAPI("myshifts");
      return this.setState({ shifts: data.data });
    } catch (error) {
      alert("Internal server error!");
    }
  };

  renderShifts = (shifts) => {
    return shifts.map((shift, ind) => (
      <Item key={ind}>
        <View style={COMMONSTYLES.itemContainer}>
          <View>
            <Text style={{ fontSize: 15 }}>{shift.time}</Text>
            <Text style={COMMONSTYLES.locationItem}>{shift.location}</Text>
          </View>
          <Button
            buttonStyle={COMMONSTYLES.btnItem}
            disabled={!shift.booked}
            onPress={() => this.cancelBooking(shift.id)}
            title="Cancel"
            type="outline"
          />
        </View>
      </Item>
    ));
  };

  render() {
    const { shifts } = this.state;
    return (
      <View style={COMMONSTYLES.shiftsContainer}>
        <ScrollView>
          {shifts.map((s, i) => (
            <List key={i} renderHeader={s.date}>
              {this.renderShifts(s.shifts)}
            </List>
          ))}
        </ScrollView>
      </View>
    );
  }
}
export default MyShifts;
