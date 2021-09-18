import React, { Component } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { List, Tabs } from "@ant-design/react-native";

import callAPI from "../components/api";
import COMMONSTYLES from "../components/STYLES";

const Item = List.Item;
const tabs = [];

class AvailableShifts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shifts: [],
    };
  }

  componentDidMount() {
    this.getAvailableShifts();
  }

  bookOrCancel = async (type, id) => {
    try {
      const { data } = await callAPI(`shifts/${id}/${type}`, "post");

      return this.setState({ shifts: data.data });
    } catch (error) {
      alert("Internal server error!");
    }
  };

  getAvailableShifts = async () => {
    try {
      const { data } = await callAPI("availableShifts");
      data.data.forEach((d) =>
        tabs.push({ title: `${d.location} (${d.data.length})` })
      );

      return this.setState({ shifts: data.data });
    } catch (error) {
      alert("Internal server error!");
    }
  };

  renderShifts = (shifts, index) => {
    return (
      <ScrollView>
        {shifts[index].data.map((d, i) => (
          <List key={i} renderHeader={d.date}>
            {d.shifts.map((s, ind) => (
              <Item key={ind}>
                <View style={COMMONSTYLES.itemContainer}>
                  <View>
                    <Text style={{ fontSize: 15 }}>{s.time}</Text>
                    <Text style={COMMONSTYLES.locationItem}>{s.location}</Text>
                  </View>
                  <Text
                    style={[
                      STYLES.bookItem,
                      { color: s.booked ? "#4F6C92" : "#E2006A" },
                    ]}
                  >
                    {s.booked ? "Booked" : "Overlapping"}
                  </Text>
                  <Button
                    buttonStyle={COMMONSTYLES.btnItem}
                    onPress={() => this.bookOrCancel(s.booked, s.id)}
                    title={s.booked ? "Cancel" : "Book"}
                    type="outline"
                  />
                </View>
              </Item>
            ))}
          </List>
        ))}
      </ScrollView>
    );
  };

  render() {
    const { shifts } = this.state;

    if (!shifts.length)
      return (
        <View
          style={[COMMONSTYLES.shiftsContainer, { justifyContent: "center" }]}
        >
          <Text style={STYLES.loadingText}>Loading...</Text>
        </View>
      );

    return (
      <View style={COMMONSTYLES.shiftsContainer}>
        <Tabs tabs={tabs} tabBarTextStyle={STYLES.tabBarText}>
          <View style={STYLES.tab}>{this.renderShifts(shifts, 0)}</View>
          <View style={STYLES.tab}>{this.renderShifts(shifts, 1)}</View>
          <View style={STYLES.tab}>{this.renderShifts(shifts, 2)}</View>
        </Tabs>
      </View>
    );
  }
}

const STYLES = StyleSheet.create({
  header: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: "5%",
  },
  tab: {
    backgroundColor: "#fff",
    flex: 1,
  },
  bookItem: {
    fontSize: 15,
    fontWeight: "700",
  },
  loadingText: {
    alignSelf: "center",
    fontWeight: "700",
  },
  tabBarText: {
    color: "#4F6C92",
    fontWeight: "700",
  },
});

export default AvailableShifts;
