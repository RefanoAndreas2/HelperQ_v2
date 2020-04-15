import React, { Component } from "react";
import { StyleSheet, FlatList, AsyncStorage, ScrollView } from "react-native";
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
  informasi: [
    { id: 0, title: "Kategori Pekerjaan", desc: "-" },
    { id: 1, title: "Pengalaman Kerja", desc: "0 tahun" },
    { id: 2, title: "Gaji Per Bulan", desc: "Rp. x.xxx.xxx" },
    { id: 3, title: "Menginap (Live in)", desc: "Ya/Tidak" },
    { id: 4, title: "Takut anjing", desc: "Ya/Tidak" },
    { id: 5, title: "Pengalaman kerja LN", desc: "Ya/Tidak" },
    { id: 6, title: "Berbahasa Inggris", desc: "Ya/Tidak" },
  ],
  lainnya: [
    { id: 0, title: "Jabodetabek", desc: "-" },
    { id: 1, title: "Bandung", desc: "-" },
    { id: 2, title: "Yogyakarta", desc: "-" },
  ],
};

export default class ViewGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      async_role: "",
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "General Info",
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
      <ScrollView style={styles.parent}>
        <View color="white" marginTop={theme.sizes.base} shadow>
          <View row center space={"between"} padding={theme.sizes.base}>
            <View row center>
              <Icon
                name={"lock"}
                size={theme.sizes.base * 1.5}
                color={theme.colors.primary}
              />
              <Text style={{ marginLeft: theme.sizes.base / 2 }}>Profil</Text>
            </View>
            <Button smallHeight color="secondary">
              <Text
                caption
                white
                style={{ paddingHorizontal: theme.sizes.base }}
              >
                Edit
              </Text>
            </Button>
          </View>
          <View color={theme.sizes.base} height={1} />
          <View padding={theme.sizes.base}>
            <FlatList
              data={helper.informasi}
              renderItem={({ item }) => (
                <View key={item.id} center row>
                  <View flex={1}>
                    <Text lilbit black_t30>
                      {item.title}
                    </Text>
                  </View>
                  <View width={theme.sizes.base/2}/>
                  <View flex={1}>
                    <Text lilbit bold left>
                      {item.desc}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View height={theme.sizes.lilbit} />}
            />
          </View>
        </View>

        <View color="white" margin={[theme.sizes.base, 0]} shadow>
          <View row center space={"between"} padding={theme.sizes.base}>
            <View row center>
              <Icon
                name={"lock"}
                size={theme.sizes.base * 1.5}
                color={theme.colors.primary}
              />
              <Text style={{ marginLeft: theme.sizes.base / 2 }}>Bersedia Bekerja Di</Text>
            </View>
            <Button smallHeight color="secondary">
              <Text
                caption
                white
                style={{ paddingHorizontal: theme.sizes.base }}
              >
                Edit
              </Text>
            </Button>
          </View>
          <View height={1} color={theme.colors.black_t90}/>
          <View padding={theme.sizes.base}>
            <FlatList
              data={helper.lainnya}
              renderItem={({ item, index }) => (
                <View key={item.id} center row space={"between"}>
                  <Text lilbit bold>
                    {index + 1}. {item.title}
                  </Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View height={theme.sizes.lilbit} />}
            />
          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = GlobalStyle;
