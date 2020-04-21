import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  AsyncStorage,
  Dimensions,
  Alert,
} from "react-native";
import {
  Text,
  View,
  GlobalStyle,
  Button,
  CustomInput,
  Touch,
  Badge,
} from "../../components";
import { theme, mocks } from "../../constants";
import { AirbnbRating } from "react-native-ratings";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import _ from "lodash";

export default class DetailMajikan extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Detail Majikan",
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

  render() {
    return (
      <ScrollView style={styles.parent}>
        <View center padding={theme.sizes.base}>
          <Image
            source={{ uri: "https://source.unsplash.com/random" }}
            style={{
              width: theme.sizes.base * 6,
              aspectRatio: 1,
              borderRadius: theme.sizes.base * 6,
              marginBottom: theme.sizes.base,
            }}
          />
          <AirbnbRating
            showRating={false}
            size={theme.sizes.base}
            isDisabled={true}
            defaultRating={5}
          />
          <Text title ellipsizeMode={"tail"} numberOfLines={1}>
            Bambang Gunawan
          </Text>
        </View>

        <View padding={theme.sizes.base}>
          <View
            color={"white"}
            shadow
            radius={theme.sizes.base / 2}
            padding={theme.sizes.base}
          >
            <FlatList
              data={["Status", "Usia", "Jumlah anak", "Lokasi saat ini"]}
              renderItem={({ item }) => (
                <View row>
                  <Text lilbit black_t30 style={{ flex: 1 }}>
                    {item}
                  </Text>
                  <View width={theme.sizes.base} />
                  <Text lilbit bold style={{ flex: 1 }}>
                    [{item}]
                  </Text>
                </View>
              )}
              ItemSeparatorComponent={() => (
                <View height={theme.sizes.lilbit} />
              )}
            />
          </View>
        </View>
        <View padding={[0, theme.sizes.base]}>
          <Text upbit>Review & Ratings</Text>
        </View>
        <FlatList
          data={[1, 2]}
          renderItem={({ item }) => (
            <View
              color={"white"}
              padding={theme.sizes.base}
              margin={[0, theme.sizes.base]}
              radius={theme.sizes.base / 2}
              shadow
            >
              <View row space={"between"}>
                <Text bold>[Name]</Text>
                <Text caption>[Date]</Text>
              </View>
              <View wrap pointerEvents="none" marginBottom={theme.sizes.base / 2}>
                <AirbnbRating
                  size={theme.sizes.lilbit}
                  isDisabled={true}
                  showRating={false}
                  defaultRating={5}
                  count={5}
                />
              </View>
              <Text lilbit>[review]</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View height={theme.sizes.base} />}
          ListFooterComponent={() => <View height={theme.sizes.base}/>}
          style={{paddingTop: theme.sizes.base}}
        />

        <View padding={theme.sizes.base}>
          <Button color={'secondary'}>
            <Text center white>MENERIMA PEKERJAAN</Text>
          </Button>
          <Button color={'transparent'} style={{marginTop: theme.sizes.base}}>
            <Text center> MENOLAK PEKERJAAN</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = GlobalStyle;
