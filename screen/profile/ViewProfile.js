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
  profil: [
    { id: 0, title: "Nama Lengkap", desc: "[namaLengkap]" },
    { id: 1, title: "Email", desc: "[email]" },
    { id: 2, title: "Jenis kelamin", desc: "[jenis]" },
    { id: 3, title: "Tempat Lahir", desc: "[tempat]" },
    { id: 4, title: "Tanggal Lahir", desc: "[tanggal]" },
    { id: 5, title: "No. Telp", desc: "[no. WA]" },
    { id: 6, title: "Alamat", desc: "[alamat]" },
    { id: 7, title: "Berat", desc: "[berat]" },
    { id: 8, title: "Tinggi", desc: "[tinggi]" },
  ],
  lainnya: [
    { id: 0, title: "Punya Anak", desc: "-" },
    { id: 1, title: "Keturunan Suku", desc: "-" },
    { id: 2, title: "Golongan Darah", desc: "-" },
    { id: 3, title: "Agama", desc: "-" },
    { id: 4, title: "Pendidikan", desc: "-" },
    { id: 5, title: "Status perkawinan", desc: "-" },
    { id: 6, title: "Lokasi saat ini", desc: "-" },
  ],
};

const majikan = {
  profil: [
    { id: 0, title: "Nama Lengkap", desc: "[namaLengkap]" },
    { id: 1, title: "Email", desc: "[email]" },
    { id: 2, title: "Jenis kelamin", desc: "[jenis]" },
    { id: 3, title: "Tempat Lahir", desc: "[tempat]" },
    { id: 4, title: "Tanggal Lahir", desc: "[tanggal]" },
    { id: 5, title: "No. Telp", desc: "[no. WA]" },
    { id: 6, title: "Alamat", desc: "[alamat]" },
    { id: 7, title: "Berat", desc: "[berat]" },
    { id: 8, title: "Tinggi", desc: "[tinggi]" },
    { id: 9, title: "Keturunan Suku", desc: "-" },
    { id: 10, title: "Agama", desc: "-" },
    { id: 11, title: "Status perkawinan", desc: "-" },
    { id: 12, title: "Lokasi saat ini", desc: "-" },
    { id: 13, title: "Jumlah Anak", desc: "-" },
  ],
};

export default class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      async_role: "",
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Profil",
    headerStyle: {
      backgroundColor: 'white',
      color: theme.colors.primary
    },
    headerTitleStyle: {
      color: theme.colors.primary,
      fontWeight: 'bold'
    },
    headerTintColor: theme.colors.primary
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
    console.log(this.props.navigation);
    return (
      <ScrollView style={styles.parent}>
        <View color="white" shadow marginTop={theme.sizes.base}>
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
              data={
                this.state.async_role == "helper"
                  ? helper.profil
                  : majikan.profil
              }
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
              ItemSeparatorComponent={() => (
                <View height={theme.sizes.lilbit} />
              )}
            />
          </View>
        </View>
        {this.state.async_role == "helper" && (
          <View color="white" shadow margin={[theme.sizes.base, 0]}>
            <View row center space={"between"} padding={theme.sizes.base}>
              <View row center>
                <Icon
                  name={"lock"}
                  size={theme.sizes.base * 1.5}
                  color={theme.colors.primary}
                />
                <Text style={{ marginLeft: theme.sizes.base / 2 }}>Informasi lain</Text>
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
                data={helper.lainnya}
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
                ItemSeparatorComponent={() => (
                  <View height={theme.sizes.lilbit} />
                )}
              />
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = GlobalStyle;
