import React, { Component } from "react";
import { StyleSheet, FlatList, AsyncStorage, ScrollView, Image } from "react-native";
import {
  Text,
  View,
  GlobalStyle,
  Button,
  CustomInput,
  Touch,
} from "../../components";
import { theme, mocks } from "../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";

const helper = {
  keterampilan: [
    { id: 0, title: "Assisten Rumah Tangga", desc: "2010 - 2011" },
    { id: 1, title: "Assisten Rumah Tangga", desc: "2009 - 2010" },
  ],
};

export default class ViewRiwayatPekerjaan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      async_role: "",
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Riwayat Pekerjaan",
    headerStyle: {
      backgroundColor: "white",
      color: theme.colors.primary,
    },
    headerTitleStyle: {
      color: theme.colors.primary,
      fontWeight: "bold",
    },
    headerTintColor: theme.colors.primary,
  });

  async componentDidMount() {
    try {
      await AsyncStorage.setItem("ASYNC_ROLE", "helper");
      const role = await AsyncStorage.getItem("ASYNC_ROLE");
      this.setState({ async_role: role });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <FlatList
        data={helper.keterampilan}
        renderItem={({ item, index }) => (
          <View
            key={index}
            color={"white"}
            shadow
            padding={theme.sizes.base}
            center
            row
          >
            <Image
              style={{
                width: theme.sizes.base * 3,
                aspectRatio: 1,
                backgroundColor: theme.colors.black_t60,
                marginRight: theme.sizes.base,
              }}
            />
            <View>
              <Text bold>{item.title}</Text>
              <Text lilbit black_t30>{item.desc}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View height={theme.sizes.base} />}
        ListFooterComponent={()=> <View height={theme.sizes.base}/>}
        style={{marginTop: theme.sizes.base}}
      />
    );
  }
}

const styles = GlobalStyle;
