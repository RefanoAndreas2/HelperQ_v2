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
            <View color={'white'} shadow ovHidden margin={[theme.sizes.base/2, theme.sizes.base]} radius={theme.sizes.base/2}>
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
                    <Text lilbit style={{marginTop: theme.sizes.base/2}}>{item.addr}</Text>
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

export default class Verifikasi extends Component {
  constructor(props) {
    super(props);
    this.inputs = {};
    this.state = {
      selectedOption: "",
      modal: false,
    };
  }

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
            marginTop={theme.sizes.base/2}
            padding={[theme.sizes.base * 0.75, theme.sizes.base]}
            shadow
          >
            <Icon
              name={"search"}
              size={theme.sizes.base * 1.5}
              color={theme.colors.black_t90}
            />
            <TextInput
              placeholder={'Pencarian Lokasi'}
              style={{
                fontSize: theme.sizes.base,
                marginLeft: theme.sizes.base
              }}
            />
          </View>
          <View marginTop={theme.sizes.base}>
            <Text >
              Pilih Cabang Mitra Rewang untuk melakukan Pemeriksaan &
              Verifikasi Akun anda.
            </Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{paddingBottom: theme.sizes.base/2}}>
          <RadioButtons options={options} />
        </ScrollView>
        <View color={'white'} padding={theme.sizes.base} style={{elevation: 6}}>
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

const styles = GlobalStyle;
