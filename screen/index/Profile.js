import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  AsyncStorage,
  Dimensions,
} from "react-native";
import {
  Text,
  View,
  GlobalStyle,
  Button,
  CustomInput,
  Touch,
} from "../../components";
import { theme, mocks } from "../../constants";
import { AirbnbRating } from "react-native-ratings";
import Icon from "react-native-vector-icons/MaterialIcons";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import _ from "lodash";
import {SegmentedControls} from 'react-native-radio-buttons'

const menuList = [
  { id: 0, icon:'lock', title: "List Majikan", role: ["helper"], navigate: "" },
  { id: 1, icon:'lock', title: "Kontrak Kerja", role: ["helper"], navigate: "KontrakKerja", params: { navigateFrom: "Profile", statusKontrak: "Aktif" }, },
  { id: 2, icon:'lock', title: "Kode Referal", role: ["helper", "majikan"], navigate: "" },
  { id: 3, icon:'settings', title: "Settings", role: ["helper", "majikan"], navigate: "Settings", },
  { id: 4, icon:'power-off', title: "Sign Out", role: ["helper", "majikan"], navigate: "" },
];

class ProfilePlaceholder extends Component {
  render() {
    const { role, context } = this.props;
    const { navigate } = context.props.navigation;
    return (
      <View style={styles.parent}>
        <View style={{ aspectRatio: 1036 / 872 }} color={"red"}>
          <Image
            source={require("../../assets/img/png/undraw-access-account.png")}
            style={{
              flex: 1,
              aspectRatio: 1036 / 872,
            }}
          />
        </View>
        <View padding={[0, theme.sizes.base, theme.sizes.base]}>
          <Text center>
            Silahkan Login sebagai
            {"\n"}
            <Text bold primary>
              {role == "helper" ? "Majikan" : "Helper"}
            </Text>
            {"\n"}
            terlebih dahulu
          </Text>
        </View>
        <View padding={[0, theme.sizes.base]}>
          <Button color="primary" onPress={() => navigate("Login")}>
            <View>
              <Text white bold center>
                Sign Out
              </Text>
            </View>
          </Button>
        </View>
      </View>
    );
  }
}

class ProfileContent extends Component {
  render() {
    const { role, context } = this.props;
    const list = _.filter(menuList, { role: [role] });
    const { navigate } = context.props.navigation;
    const option = ['Helper', 'Majikan']
    return (
      <ScrollView style={styles.parent}>
        <View center padding={theme.sizes.base}>
          <Image
            source={{ uri: "https://source.unsplash.com/random" }}
            style={{
              width: theme.sizes.base * 6,
              aspectRatio: 1,
              borderRadius: theme.sizes.base * 6,
              marginBottom: theme.sizes.base
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
          <Text lilbit italic ellipsizeMode={"tail"} numberOfLines={1}>
            Not Verified
          </Text>
          <Button
            smallHeight
            color={"primary"}
            onPress={() =>
              navigate("ViewData", { title: "Detail " + role })
            }
            style={{marginTop: theme.sizes.base}}
          >
            <Text lilbit white center style={{marginHorizontal: theme.sizes.base}}>
              View Data
            </Text>
          </Button>
        </View>
        <View margin={[0, theme.sizes.base]}>
          <SegmentedControls
            options={option}
            tint={theme.colors.primary_dark}
            separatorWidth={0}
            selectedOption={option[0]}
            optionStyle={styles.segmented_optionStyle}
            optionContainerStyle={styles.segmented_optionContainerStyle}
            containerStyle={styles.segmented_containerStyle}
          />
        </View>
        <View shadow color={'white'} radius={theme.sizes.base/2} ovHidden margin={[theme.sizes.base, theme.sizes.base, 0]}>
          <View
            padding={theme.sizes.base}
          >
            <Text lilbit>Jumlah Point</Text>
            <View row space={'between'} center>
              <Text h1 secondary>1540</Text>
              <Button
                smallHeight
                color={"primary"}
                onPress={() => null}
              >
                <Text white lilbit center style={{marginHorizontal: theme.sizes.base}}>
                  View
                </Text>
              </Button>
            </View>
          </View>
        </View>
        {role == "majikan" && (
          <View padding={[theme.sizes.base, theme.sizes.base, 0]}>
            <Touch>
              <View row center style={styles.border} padding={theme.sizes.base}>
                <View flex={1}>
                  <Text>Ingin menjadi mitra HelperQ?</Text>
                </View>
                <View flex={1}>
                  <Text right primary bold>
                    More Info
                  </Text>
                </View>
              </View>
            </Touch>
          </View>
        )}
        <View margin={[theme.sizes.base, 0]}>
          <FlatList
            data={list}
            renderItem={({ item }) => (
              <View shadow color={'white'}>
                <Touch onPress={() => navigate(item.navigate, item.params)}>
                  <View row padding={theme.sizes.base}>
                    {item.title == "Sign Out" ? 
                      <FAIcon name={item.icon} size={20} color={theme.colors.secondary}/>
                      :
                      <Icon name={item.icon} size={24} color={theme.colors.primary}/>
                    }
                    <View flex={1} paddingLeft={theme.sizes.base * 0.5}>
                      <Text color={item.title == 'Sign Out' ? theme.colors.secondary : 'black'}>{item.title}</Text>
                    </View>
                    {item.title == "Sign Out" ? null : (
                      <Icon name={"arrow-drop-down"} size={24} style={{transform:[{rotate: '-90deg'}]}} />
                    )}
                  </View>
                </Touch>
              </View>
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
              <View
                height={theme.sizes.base}
              />
            )}
            ListFooterComponent={<View height={3} />}
          />
        </View>
      </ScrollView>
    );
  }
}

class ProfileHelper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      async_role: "",
    };
  }

  async componentDidMount() {
    console.disableYellowBox = true;
    // const list  = _.filter(menuList, {role: ['majikan']})
    // console.log(list)
    try {
      // await AsyncStorage.setItem('ASYNC_ROLE', 'majikan')
      const role = await AsyncStorage.getItem("ASYNC_ROLE");
      this.setState({ async_role: role });
      // this.render()
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    return this.state.async_role == "helper" ? (
      <ProfileContent
        context={this}
        role={this.state.async_role}
      ></ProfileContent>
    ) : (
      <ProfilePlaceholder
        context={this}
        role={this.state.async_role}
      ></ProfilePlaceholder>
    );
  }
}

class ProfileMajikan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      async_role: "",
    };
  }

  async componentDidMount() {
    console.disableYellowBox = true;
    // const list  = _.filter(menuList, {role: ['majikan']})
    // console.log(list)
    try {
      // await AsyncStorage.setItem('ASYNC_ROLE', 'helper')
      const role = await AsyncStorage.getItem("ASYNC_ROLE");
      this.setState({ async_role: role });
      this.render();
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return this.state.async_role == "majikan" ? (
      <ProfileContent
        context={this}
        role={this.state.async_role}
        navigateFrom={"ProfileMajikan"}
      ></ProfileContent>
    ) : (
      <ProfilePlaceholder
        context={this}
        role={this.state.async_role}
      ></ProfilePlaceholder>
    );
  }
}

class MainProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      async_role: "",
    };
  }

  async componentDidMount() {
    console.disableYellowBox = true;
    // const list  = _.filter(menuList, {role: ['majikan']})
    // console.log(list)
    try {
      // await AsyncStorage.setItem('ASYNC_ROLE', 'helper')
      const role = await AsyncStorage.getItem("ASYNC_ROLE");
      this.setState({ async_role: role });
      this.render();
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return this.state.async_role == "majikan" ? (
      <ProfileContent
        context={this}
        role={this.state.async_role}
        navigateFrom={"ProfileMajikan"}
      ></ProfileContent>
    ) : (
      <ProfileContent
        context={this}
        role={this.state.async_role}
      ></ProfileContent>
    );
  }
}

export { ProfileMajikan, ProfileHelper, ProfileContent, MainProfile };

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: theme.colors.bgParent,
  },
  listTouch: {
    marginHorizontal: theme.sizes.base,
  },
  border: {
    borderWidth: 1,
    borderColor: theme.colors.black_t90,
  },
  segmented_optionStyle: {
    fontSize: theme.sizes.base,
    fontWeight: "bold",
    margin: theme.sizes.base * 0.5
  },
  segmented_optionContainerStyle: {
    borderRadius: theme.sizes.base * 0.5,
    padding: 0
  },
  segmented_containerStyle: {
    borderWidth: 0,
    borderRadius: theme.sizes.base * 0.5,
    elevation: 2
  },
});
