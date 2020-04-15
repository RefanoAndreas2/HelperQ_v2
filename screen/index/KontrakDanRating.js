import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  KeyboardAvoidingView,
  BackHandler,
  FlatList,
} from "react-native";
import {
  Text,
  View,
  GlobalStyle,
  Badge,
  Button,
  CustomInput,
  Touch,
} from "../../components";
import { theme, mocks } from "../../constants";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import { AirbnbRating, Rating } from "react-native-ratings";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StackActions, NavigationActions } from "react-navigation";

class Separator extends Component {
  render() {
    return <View color={theme.colors.black_t90} height={1}></View>;
  }
}

class ContactButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <View row padding={theme.sizes.base}>
          <View flex={1}>
            <View center>
              <View
                radius={theme.sizes.base * 2}
                ovHidden
                marginBottom={theme.sizes.base * 0.5}
              >
                <Touch onPress={() => null} ripple={theme.colors.whatsapp}>
                  <View
                    width={theme.sizes.base * 3.5}
                    thick={2}
                    ratio={1}
                    middle
                    center
                    color={"white"}
                    border={theme.colors.whatsapp}
                    radius={theme.sizes.base * 2}
                  >
                    <FAIcon
                      name={"whatsapp"}
                      size={24}
                      color={theme.colors.whatsapp}
                    />
                  </View>
                </Touch>
              </View>
              <Text small bold>
                Whatsapp
              </Text>
            </View>
          </View>
          <View flex={1}>
            <View center>
              <View
                radius={theme.sizes.base * 2}
                ovHidden
                marginBottom={theme.sizes.base * 0.5}
              >
                <Touch onPress={() => null} ripple={theme.colors.primary}>
                  <View
                    width={theme.sizes.base * 3.5}
                    thick={2}
                    ratio={1}
                    middle
                    center
                    color={"white"}
                    border={theme.colors.primary}
                    radius={theme.sizes.base * 2}
                  >
                    <FAIcon
                      name={"sms"}
                      size={24}
                      color={theme.colors.primary}
                    />
                  </View>
                </Touch>
              </View>
              <Text small bold>
                SMS
              </Text>
            </View>
          </View>
          <View flex={1}>
            <View center>
              <View
                radius={theme.sizes.base * 2}
                ovHidden
                marginBottom={theme.sizes.base * 0.5}
              >
                <Touch onPress={() => null} ripple={theme.colors.primary}>
                  <View
                    width={theme.sizes.base * 3.5}
                    thick={2}
                    ratio={1}
                    middle
                    center
                    color={"white"}
                    border={theme.colors.primary}
                    radius={theme.sizes.base * 2}
                  >
                    <FAIcon
                      name={"phone"}
                      size={24}
                      color={theme.colors.primary}
                    />
                  </View>
                </Touch>
              </View>
              <Text small bold>
                Phone
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

class BottomBtn extends Component {
  alert() {
    const { navigate } = this.props.navigation;
    Alert.alert(
      "Konfirmasi",
      "Apakah anda yakin ingin Mengakhiri Kontrak Kerja?",
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: "Cancel",
          // onPress: () => console.log('Cancel Pressed'),
          style: "cancel",
        },
        { text: "OK", onPress: () => navigate("ReviewRating") },
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <View color={'white'} padding={theme.sizes.base} style={{elevation: 6}}>
        <Button color="secondary" onPress={() => this.alert()}>
          <Text white center>
            Akhiri Kontrak Kerja
          </Text>
        </Button>
      </View>
    );
  }
}

class InfoHelper extends Component {
  render() {
    return (
      <View>
        <View row center padding={theme.sizes.base}>
          <MDIcon name={'lock'} size={theme.sizes.base*1.5} color={theme.colors.primary} />
          <Text style={{marginLeft: theme.sizes.base/2}}>Info Helper</Text>
        </View>
        <Separator />
        <View padding={theme.sizes.base}>
          <FlatList
            data={this.props.data}
            renderItem={({ item }) => (
              <View key={item.id} center row >
                <Text lilbit black_t30 style={{flex: 1}}>{item.title}</Text>
                <View width={theme.sizes.lilbit}/>
                <Text lilbit bold style={{flex: 1}}>{item.desc}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View height={theme.sizes.lilbit} />}
          />
        </View>
      </View>
    );
  }
}

class InfoKontrakKerja extends Component {
  render() {
    return (
      <View>
        <View padding={theme.sizes.base}>
          <Text bold>Info Kontrak Kerja</Text>
        </View>
        <Separator />
        <View padding={theme.sizes.base}>
          <FlatList
            data={this.props.data}
            renderItem={({ item }) => (
              <View key={item.id} center row space={"between"}>
                <Text>{item.title}</Text>
                <Text lilbit>{item.desc}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View height={theme.sizes.base} />}
          />
        </View>
      </View>
    );
  }
}

class InfoPembayaran extends Component {
  footer() {
    return (
      <View paddingTop={theme.sizes.base}>
        <Separator />
        <View center row space={"between"} paddingTop={theme.sizes.base}>
          <Text lilbit black_t30>Total</Text>
          <Text bold lilbit>
            [total]
          </Text>
        </View>
      </View>
    );
  }
  render() {
    // console.log(this.props.data)
    return (
      <View>
        <View row center padding={theme.sizes.base}>
          <MDIcon name={'lock'} size={theme.sizes.base*1.5} color={theme.colors.primary} />
          <Text style={{marginLeft: theme.sizes.base/2}}>Info Pembayaran</Text>
        </View>
        <Separator />
        <View padding={theme.sizes.base}>
          <FlatList
            data={this.props.data}
            renderItem={({ item }) => (
              <View key={item.id} center row space={"between"}>
                <Text lilbit black_t30>{item.title}</Text>
                <Text lilbit bold>{item.desc}</Text>
              </View>
            )}
            ListFooterComponent={() => this.footer()}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View height={theme.sizes.lilbit} />}
          />
        </View>
      </View>
    );
  }
}

class ReviewRating extends Component {
  constructor(props) {
    super(props);
    this.inputs = {};
    this.state = {
      review: "",
    };
  }

  static navigationOptions = {
    title: "Review & Rating",
  };

  alert() {
    const home = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "indexBottomTab",
          action: NavigationActions.navigate({ routeName: "Order" }),
        }),
      ],
    });
    const { navigate, dispatch } = this.props.navigation;
    Alert.alert(
      "Terima Kasih",
      "Selamat, anda mendapatkan poin sebesar besarnya",
      [{ text: "OK", onPress: () => dispatch(home) }],
      { cancelable: false }
    );
  }

  backAction = () => {
    Alert.alert(
      "Mohon Maaf",
      "Silahkan berikan penilaian anda terlebih dahulu",
      [
        {
          text: "Ok",
          onPress: () => null,
          style: "cancel",
        },
      ]
    );
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }
  componentWillUnmount() {
    this.backHandler = BackHandler.removeEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }

  render() {
    return (
      <View style={styles.parent}>
        <KeyboardAwareScrollView
          enableOnAndroid
          extraScrollHeight={theme.sizes.base * 2}
        >
          <View padding={theme.sizes.base}>
            <View center>
              <View
                width={theme.sizes.base * 7}
                ratio={1}
                ovHidden
                radius={theme.sizes.base * 7}
              >
                <Image
                  source={{ uri: "https://source.unsplash.com/random" }}
                  style={{ flex: 1 }}
                ></Image>
              </View>
            </View>
            <View center>
              <Text title style={{ marginVertical: theme.sizes.base }}>
                [Nama Helper / Majikan]
              </Text>
              <AirbnbRating
                size={theme.sizes.base * 2}
                showRating={false}
                defaultRating={5}
              />
            </View>
            <CustomInput
              multiline
              label={"Review"}
              placeholder={"Tuliskan review anda"}
              value={this.state.review}
              onChangeText={(value) => this.setState({ review: value })}
              blurOnSubmit={false}
              returnKeyType={"next"}
              onRef={(ref) => (this.inputs["inputEmail"] = ref)}
              onSubmitEditing={(value) => this.setState({ review: value })}
            />
          </View>
        </KeyboardAwareScrollView>
        <View padding={theme.sizes.base}>
          <Button color="primary" onPress={() => this.alert()}>
            <Text white center bold>
              Submit
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

class KontrakKerja extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigateFrom: "",
      statusKontrak: "",
      infoHelper: [
        { id: 0, title: "Nama", desc: mocks.detailHelperMocks.nama },
        { id: 1, title: "Kategori", desc: mocks.detailHelperMocks.kategori },
        { id: 2, title: "Gaji", desc: mocks.detailHelperMocks.gaji },
        {
          id: 3,
          title: "Lokasi Saat ini",
          desc: mocks.detailHelperMocks.profile.lokasi,
        },
        { id: 4, title: "Umur", desc: mocks.detailHelperMocks.profile.umur },
      ],
      infoKontrakKerja: [
        { id: 0, title: "ID Kontrak Kerja", desc: "HQ-Q1" },
        { id: 1, title: "Tgl Terbuat", desc: new Date().toDateString() },
        { id: 2, title: "Tgl Mulai Kerja", desc: new Date().toDateString() },
        { id: 3, title: "Tgl Terakhir Kerja", desc: new Date().toDateString() },
        {
          id: 4,
          title: "Kesepakatan Gaji",
          desc: "Rp. " + mocks.detailHelperMocks.gaji,
        },
      ],
      infoPembayaran: [
        { id: 0, title: "Tipe pembayaran", desc: "[tipe]" },
        {
          id: 1,
          title: "Gaji Pokok",
          desc: "Rp. " + mocks.detailHelperMocks.gaji,
        },
        {
          id: 2,
          title: "Administrasi",
          desc: "Rp. " + mocks.detailHelperMocks.detail.biayaAdmin,
        },
      ],
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam == 'OrderKontrakKerja' ? 'Detail Kontrak Kerja' : 'Detail Rekrut'
    }
  };

  async componentDidMount() {
    this.setState({
      navigateFrom: this.props.navigation.getParam("navigateFrom"),
    });
    this.setState({
      statusKontrak: this.props.navigation.getParam("statusKontrak"),
    });
  }

  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={styles.parent}>
        <ScrollView>
          <View color={'white'} shadow marginTop={theme.sizes.base/2}>
            <View center row space={"between"} padding={theme.sizes.base}>
              <Text black_t30 >
                Status
              </Text>
              <Text secondary bold right>
                Menunggu Respon Helper
              </Text>
            </View>
            <Separator />
            <View center row space={"between"} padding={theme.sizes.base}>
              <Text black_t30>
                Tanggal Rekrut
              </Text>
              <Text right>
                {new Date().toDateString()}
              </Text>
            </View>
            {this.state.navigateFrom == "OrderKontrakKerja" && (
              <>
              <Separator />
              <View center row space={"between"} padding={theme.sizes.base}>
                <Text black_t30>
                  Tanggal Kontrak
                </Text>
                <Text right>
                  {new Date().toDateString()}
                </Text>
              </View>
              </>
            )}
            <Separator />
            <Touch>
              <View row space={"between"} padding={theme.sizes.base}>
                <Text black_t30 style={{ flex: 1 }}>
                  Invoice
                </Text>
                <Text secondary bold right style={{ flex: 1 }}>
                  View
                </Text>
              </View>
            </Touch>
          </View>

          <View color={'white'} marginTop={theme.sizes.base} shadow>
            {/* {this.state.navigateFrom == "OrderKontrakKerja" && (
              <>
                <Separator />
                <InfoKontrakKerja data={this.state.infoKontrakKerja} />
              </>
            )} */}
            {/* <Separator /> */}
            <InfoHelper data={this.state.infoHelper} />
            {this.state.navigateFrom == "OrderListHelper" && (
              <>
                <Separator />
                <ContactButton />
              </>
            )}
            <Separator />
            <Touch onPress={() => navigate('DetailHelper')}>
              <View row space={"between"} padding={theme.sizes.base}>
                <Text bold style={{ flex: 1 }}>
                  View More
                </Text>
                <MDIcon name={"arrow-drop-up"} size={theme.sizes.base * 1.5} style={{transform: [{rotate: '90deg'}]}}/>
              </View>
            </Touch>
          </View>
          <View color={'white'} margin={[theme.sizes.base, 0]} shadow>
            <InfoPembayaran data={this.state.infoPembayaran} />
          </View>
        </ScrollView>
        {this.state.statusKontrak == "Aktif" && (
          <BottomBtn navigation={this.props.navigation} />
        )}
      </View>
    );
  }
}

export { KontrakKerja, ReviewRating };

const styles = GlobalStyle;
