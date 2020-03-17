import React, { Component } from 'react'
import { StyleSheet, Image, ScrollView, Picker, TouchableWithoutFeedback} from 'react-native'
import _ from 'lodash'
import { FlatList } from 'react-native-gesture-handler'
import { GlobalStyle, Badge, Button, CustomInput, CustomPicker, Text, Touch, View } from '../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { theme, mocks } from '../../constants'
import CheckBox from 'react-native-check-box'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { RadioButtons } from 'react-native-radio-buttons'
import { NavigationActions } from 'react-navigation'



class Notification extends Component {

  itemBase = ({ item }) => {
    return (
      <View padding={theme.sizes.base}>
        <View row>
          {item.uri != '' ?
            <View marginRight={theme.sizes.base}>
              <Image
                source={{ uri: item.uri }}
                style={{
                  width: theme.sizes.base * 3,
                  aspectRatio: 1,
                  borderRadius: theme.sizes.base * .5
                }}
              />
            </View>
            : null}
          <View flex={1}>
            <Text>{item.desc}</Text>
          </View>
        </View>
        <View center row paddingTop={theme.sizes.base*.5}>
          <Icon name={'access-time'} size={theme.sizes.base} color={theme.colors.black_t60}  />
          <Text caption black_t60 style={{marginLeft: theme.sizes.base*.5}}>{item.date}</Text>
        </View>
      </View>
    )
  }

  item = ({ item }) => {
    const {navigate} = this.props.navigation
    console.log('test', item.uri)
    return (
      item.navigate != '' ?
        <Touch onPress={() => navigate(item.navigate)}>
          {this.itemBase({item})}
        </Touch>
      : this.itemBase({item})
    )
  }

  render() {
    const notif = mocks.notification
    // console.log(notif)
    return (
      <View tyle={styles.parent}>
        <FlatList
          data={notif}
          renderItem={({ item }) => this.item({ item })}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View height={1} color={theme.colors.black_t90} />}
        />
      </View>
    )
  }
}

class Filter extends Component {
  constructor(props) {
    super(props);
    this.inputs = {};
    this.state = {
      kategori: mocks.categories,
      kota:  mocks.form_Penempatan.kota,
      kotaSelect: '',
      gajiMin: '',
      gajiMax: '',
      umurMin: '',
      umurMax: '',
      selectedOption: ''
    };
  }

  kategoriCheck=(id)=>{
    const kategori = this.state.kategori
    kategori[id].checked = !kategori[id].checked
    this.setState({kategori: kategori})
  }

  render() {
    const kota  = this.state.kota

    const options = [
      'Latest',
      'Oldest',
      'A-Z',
      'Z-A',
    ];
   
    function setSelectedOption(selectedOption){
      this.setState({
        selectedOption
      });
    }

    function renderOption(option, selected, onSelect, index){
      const radio = selected ?
      <Icon name={'radio-button-checked'} size={24} color={theme.colors.primary}/>
      :
      <Icon name={'radio-button-unchecked'} size={24} color={theme.colors.black_t60} />
      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <View row center margin={[theme.sizes.base*.5, 0]}>
            {radio}
            <View row center marginLeft={theme.sizes.base*.5}>
              <Text>{option}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
   
    function renderContainer(optionNodes){
      return <View marginTop={theme.sizes.base}>{optionNodes}</View>;
    }

    const {navigate, dispatch} = this.props.navigation

    return (
      <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={100} style={styles.parent}>
        <View padding={theme.sizes.base}>
          <Text>Kategori</Text>
          <View marginTop={theme.sizes.base}>
            <FlatList
              data={this.state.kategori}
              renderItem={({item}) =>
                <CheckBox
                  checkBoxColor={theme.colors.primary}
                  isChecked={item.checked} 
                  onClick={() => this.kategoriCheck(item.id)} 
                  rightText={<Text >{item.title}</Text>}
                  style={{paddingVertical: theme.sizes.base*.25}}
                  uncheckedCheckBoxColor={theme.colors.black_t30}
                />
              }
              keyExtractor={item => item.id}
            />
          </View>
          <View marginTop={theme.sizes.base}>
            <CustomPicker
              label={'Kota Anda'}
              selectedValue={this.state.kotaSelect}
              style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
              onValueChange={(itemValue) =>
                this.setState({kotaSelect: itemValue}) //checkpoint here, statenya
              }>
              {this.state.kota.map((kotaData) => (
                <Picker.Item key={kotaData.id} label={kotaData.title} value={kotaData.id}/>
              ))}
            </CustomPicker>
          </View>
          <View row marginTop={theme.sizes.base}>
            <View flex={1}>
              <CustomInput
                number
                label={'Gaji minimal'}
                placeholder={'Rp. xxx.xxx'}
                value={this.state.gajiMin}
                onChangeText={(gajiMin)=>this.setState({gajiMin: gajiMin})}
                blurOnSubmit={false}
                returnKeyType={'next'}
                onRef={(ref) => { this.inputs['inputGajiMin'] = ref }}
                onSubmitEditing={() => this.inputs['inputGajiMax'].focus()}
              />
            </View>
            <View width={theme.sizes.base} />
            <View flex={1}>
              <CustomInput
                number
                label={'Gaji maximal'}
                placeholder={'Rp. xxx.xxx'}
                value={this.state.gajiMax}
                onChangeText={(gajiMax)=>this.setState({gajiMax: gajiMax})}
                blurOnSubmit={false}
                returnKeyType={'next'}
                onRef={(ref) => { this.inputs['inputGajiMax'] = ref }}
                onSubmitEditing={() => this.inputs['inputUmurMin'].focus()}
              />
            </View>
          </View>
          <View row marginTop={theme.sizes.base}>
            <View flex={1}>
              <CustomInput
                number
                label={'Umur minimal'}
                placeholder={'xx Thn'}
                value={this.state.gajiMin}
                onChangeText={(umurMin)=>this.setState({umurMin: umurMin})}
                blurOnSubmit={false}
                returnKeyType={'next'}
                onRef={(ref) => { this.inputs['inputUmurMin'] = ref }}
                onSubmitEditing={() => this.inputs['inputUmurMax'].focus()}
              />
            </View>
            <View width={theme.sizes.base} />
            <View flex={1}>
              <CustomInput
                number
                label={'Umur maximal'}
                placeholder={'xx Thn'}
                value={this.state.umurMax}
                onChangeText={(umurMax)=>this.setState({umurMax: umurMax})}
                blurOnSubmit={false}
                returnKeyType={'next'}
                onRef={(ref) => { this.inputs['inputUmurMax'] = ref }}
                onSubmitEditing={() => null}
              />
            </View>
          </View>
          <View marginTop={theme.sizes.base}>
            <Text>Sort By</Text>
            <RadioButtons
              options={ options }
              onSelection={ setSelectedOption.bind(this) }
              selectedOption={this.state.selectedOption }
              renderOption={ renderOption }
              renderContainer={ renderContainer }
            />
          </View>
        </View>
        <View padding={theme.sizes.base}>
          <Button color='primary' onPress={() => dispatch(NavigationActions.back())}>
            <Text white center bold>Terapkan</Text>
          </Button>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

export { Notification, Filter }

const styles = GlobalStyle
