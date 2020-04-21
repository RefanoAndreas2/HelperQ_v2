import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  AsyncStorage,
  Dimensions,
  Alert,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
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
import Icon from "react-native-vector-icons/MaterialIcons";
// import { RadioButtons } from 'react-native-radio-buttons'
import { StackActions, NavigationActions } from "react-navigation";
import _ from "lodash";

const majikan = [
  { id: 0, title: "View Profile", navigate: "ViewProfile" },
  { id: 1, title: "Dokumen", navigate: "ViewDokumen" },
];

class RadioButtons extends Component {
  state = {
    value: null,
  };

  render() {
    const { options } = this.props;
    const { value } = this.state;

    return (
      <View>
        {options.map((item) => {
          return (
            <View
              color={"white"}
              shadow
              ovHidden
              margin={[theme.sizes.base / 2, theme.sizes.base]}
              radius={theme.sizes.base / 2}
            >
              <Touch onPress={() => this.setState({ value: item.key })}>
                <View
                  row
                  padding={theme.sizes.base}
                  key={item.key}
                  style={styles.buttonContainer}
                >
                  <Icon
                    name={
                      "radio-button-" +
                      (value === item.key ? "checked" : "unchecked")
                    }
                    size={24}
                    color={
                      value === item.key
                        ? theme.colors.secondary
                        : theme.colors.black_t90
                    }
                  />
                  <View marginLeft={theme.sizes.base * 0.5}>
                    <Text bold>{item.title}</Text>
                    <Text lilbit style={{ marginTop: theme.sizes.base / 2 }}>
                      {item.addr}
                    </Text>
                  </View>
                </View>
              </Touch>
            </View>
          );
        })}
      </View>
    );
  }
}

class Verifikasi extends Component {
  constructor(props) {
    super(props);
    this.inputs = {};
    this.state = {
      selectedOption: "",
      modal: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Lokasi Verifikasi",
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

  setSelectedOption(selectedOption) {
    console.log(selectedOption);
    this.setState({
      selected,
    });
  }

  render() {
    const options = [
      { key: 0, title: "Mitra HelperQ Bandung", addr: "Deskripsi Alamat" },
      { key: 1, title: "Mitra HelperQ Surabaya", addr: "Deskripsi Alamat" },
      { key: 2, title: "Mitra HelperQ Denpasar", addr: "Deskripsi Alamat" },
      { key: 3, title: "Mitra HelperQ Jakarta", addr: "Deskripsi Alamat" },
      { key: 4, title: "Mitra HelperQ Batam", addr: "Deskripsi Alamat" },
    ];
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.parent}>
        <View padding={theme.sizes.base}>
          <Text lilbit>Pencarian lokasi anda saat ini</Text>
          <View
            row
            center
            color={"white"}
            radius={theme.sizes.base / 2}
            marginTop={theme.sizes.base / 2}
            padding={[theme.sizes.base * 0.75, theme.sizes.base]}
            shadow
          >
            <Icon
              name={"search"}
              size={theme.sizes.base * 1.5}
              color={theme.colors.black_t90}
            />
            <TextInput
              placeholder={"Pencarian Lokasi"}
              style={{
                fontSize: theme.sizes.base,
                marginLeft: theme.sizes.base,
              }}
            />
          </View>
          <View marginTop={theme.sizes.base}>
            <Text>
              Pilih Cabang Mitra Rewang untuk melakukan Pemeriksaan & Verifikasi
              Akun anda.
            </Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: theme.sizes.base / 2 }}
        >
          <RadioButtons options={options} />
        </ScrollView>
        <View
          color={"white"}
          padding={theme.sizes.base}
          style={{ elevation: 6 }}
        >
          <Button
            color={"secondary"}
            onPress={() => this.setState({ modal: !this.state.modal })}
          >
            <Text white center>
              Lanjut
            </Text>
          </Button>
        </View>

        <Modal
          transparent={true}
          visible={this.state.modal}
          onRequestClose={() => this.setState({ modal: !this.state.modal })}
        >
          <View flex={1} middle color="backdrop">
            <View
              margin={theme.sizes.base * 1.5}
              padding={[
                theme.sizes.base * 1.5,
                theme.sizes.base * 0.5,
                theme.sizes.base * 0.5,
                theme.sizes.base * 1.5,
              ]}
              color={"white"}
              radius={theme.sizes.radius}
            >
              <View marginBottom={theme.sizes.base * 1.5}>
                <Text title>Terima Kasih</Text>
              </View>
              <View paddingRight={theme.sizes.base}>
                <Text>
                  Silahkan mengunjungi Mitra HelperQ kami sesuai informasi di
                  bawah ini untuk melakukan verifikasi
                </Text>
              </View>
              <View
                marginTop={theme.sizes.base}
                paddingRight={theme.sizes.base}
              >
                <Text bold>MitraQ HelperQ [Kota]</Text>
                <Text lilbit>[Alamat Mitra]</Text>
              </View>
              <View wrap row right marginTop={theme.sizes.base}>
                <Button
                  onPress={() =>
                    this.setState({ modal: !this.state.modal }) ||
                    navigate("ViewData", { title: "Detail Helper" })
                  }
                >
                  <View padding={theme.sizes.base * 1.5}>
                    <Text bold primary>
                      Lanjutkan
                    </Text>
                  </View>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

class VerifikasiConfirm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Konfirmasi Proses Verifikasi",
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
    const { dispatch } = this.props.navigation;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "indexBottomTab",
          action: NavigationActions.navigate({ routeName: "Profile" }),
          // params: { navigateFrom: "PaymentGateway" },
        }),
      ],
    });
    return (
      <View style={styles.parent}>
        <View center middle flex={1}>
          <Icon
            name={"contacts"}
            size={theme.sizes.base * 6}
            color={theme.colors.black_t60}
          />
          <View padding={theme.sizes.base}>
            <Text center upbit bold>
              Terima Kasih,
            </Text>
            <Text center style={{ marginTop: theme.sizes.base }}>
              Harap mengunjungi Mitra Rewang Kami{"\n"}
              Sesuai infromasi di bawah ini{"\n"}
              untuk melakukan konfirmasi
            </Text>
          </View>

          <View
            color={"white"}
            width={Dimensions.get("window").width - theme.sizes.base * 2}
            padding={theme.sizes.base}
            radius={theme.sizes.base / 2}
            shadow
          >
            <Text center bold>
              Mitra Rewang [Kota]
            </Text>
            <Text lilbit center style={{ marginTop: theme.sizes.base }}>
              Jl. [Nama Jalan]{"\n"}
              [tambahan]{"\n"}
              [No. Telp]
            </Text>
          </View>
        </View>
        <View
          color={"white"}
          padding={theme.sizes.base}
          style={{ elevation: 6 }}
        >
          <Button color={"secondary"} onPress={() => dispatch(resetAction)}>
            <Text center white>
              Kembali Ke Home
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

class VerifikasiDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Detail Verifikasi",
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
      <ScrollView style={[styles.parent]}>
        <View
          color={"white"}
          shadow
          radius={theme.sizes.base / 2}
          margin={[theme.sizes.base, theme.sizes.base, 0]}
        >
          <View center row space={"between"} padding={theme.sizes.base}>
            <Text black_t30>Status</Text>
            <Text secondary bold right>
              [Status]
            </Text>
          </View>
        </View>

        <View
          color={"white"}
          shadow
          radius={theme.sizes.base / 2}
          margin={[theme.sizes.base, theme.sizes.base, 0]}
        >
          <View center row space={"between"} padding={theme.sizes.base}>
            <Text black_t30>Tanggal Order</Text>
            <Text right>[Tanggal Order]</Text>
          </View>
        </View>

        <View color={"white"} shadow marginTop={theme.sizes.base}>
          <View row center padding={theme.sizes.base}>
            <Icon
              name={"lock"}
              size={theme.sizes.base * 1.5}
              color={theme.colors.primary}
            />
            <Text style={{ marginLeft: theme.sizes.base / 2 }}>
              Info Mitra Rewang yang dipilih
            </Text>
          </View>
          <View height={1} color={theme.colors.black_t90} />
          <View padding={theme.sizes.base}>
            <Text bold>Mitra Rewang [Kota]</Text>
            <Text lilbit style={{ marginTop: theme.sizes.base / 2 }}>
              [Alamat] {"\n"}
              [Alamat] {"\n"}
              [Alamat] {"\n"}
            </Text>

            <TouchableWithoutFeedback onPress={() => console.log("Change")}>
              <Text lilbit bold secondary underline>
                Change
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View color={"white"} shadow marginTop={theme.sizes.base}>
          <View row center padding={theme.sizes.base}>
            <Icon
              name={"lock"}
              size={theme.sizes.base * 1.5}
              color={theme.colors.primary}
            />
            <Text style={{ marginLeft: theme.sizes.base / 2 }}>
              Info Personal Test
            </Text>
          </View>
          <View height={1} color={theme.colors.black_t90} />
          <View padding={theme.sizes.base}>
            <FlatList
              data={["Tanggal Tes", "Nilai Tes"]}
              renderItem={({ item }) => (
                <View row space={"between"}>
                  <Text lilbit black_t30>
                    {item}
                  </Text>
                  <Text lilbit bold>
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

        <View color={"white"} shadow margin={[theme.sizes.base, 0]}>
          <View row center padding={theme.sizes.base}>
            <Icon
              name={"lock"}
              size={theme.sizes.base * 1.5}
              color={theme.colors.primary}
            />
            <Text style={{ marginLeft: theme.sizes.base / 2 }}>
              Info Personal Test
            </Text>
          </View>
          <View height={1} color={theme.colors.black_t90} />
          <View padding={theme.sizes.base}>
            <FlatList
              data={["Status", "Biaya Verifikasi", "Biaya Administrasi"]}
              renderItem={({ item }) => (
                <View row space={"between"}>
                  <Text lilbit black_t30>
                    {item}
                  </Text>
                  <Text lilbit bold>
                    [{item}]
                  </Text>
                </View>
              )}
              ItemSeparatorComponent={() => (
                <View height={theme.sizes.lilbit} />
              )}
            />
          </View>
          <View height={1} color={theme.colors.black_t90} />
          <View padding={theme.sizes.base} row space={"between"}>
            <Text lilbit black_t30>
              Total
            </Text>
            <Text lilbit bold>
              [Total]
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export { Verifikasi, VerifikasiConfirm, VerifikasiDetail };

const styles = GlobalStyle;
