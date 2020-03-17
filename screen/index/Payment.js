import React, { Component } from 'react'
import { StyleSheet, ScrollView, Image, TouchableWithoutFeedback, FlatList, Alert } from 'react-native'
import { Text, View, GlobalStyle, Badge, Button, CustomInput, Touch } from '../../components'
import { theme, mocks } from '../../constants';
import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackActions, NavigationActions } from 'react-navigation';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: ''
    };
  }

  render() {
    const options = [
      'Payment Gateway',
      'HelperQ Point'
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
          <View row center padding={theme.sizes.base} style={styles.border} margin={[theme.sizes.base*.5, 0]}>
            {radio}
            <View row center marginLeft={theme.sizes.base*.5}>
              <Text>{option}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
   
    function renderContainer(optionNodes){
      return <View padding={[theme.sizes.base*.5, theme.sizes.base]}>{optionNodes}</View>;
    }

    const {navigate} = this.props.navigation

    return (
      <View flex={1} style={styles.parent}>
        <ScrollView style={{flex: 1}}>
          <View padding={[theme.sizes.base, theme.sizes.base, 0]}>
            <View padding={theme.sizes.base} style={styles.border}>
              <Text caption>Total Tagihan</Text>
              <Text bold>Rp. 1.000.000</Text>
            </View>
          </View>
          <View row center margin={[theme.sizes.base, theme.sizes.base, 0]} flex={1} padding={theme.sizes.base} style={styles.border}>
            <Image source={require('../../assets/img/png/ic_logo_helperq_icon.png')} resizeMode={'contain'} style={{aspectRatio: 1, width: theme.sizes.base*2}}/>
            <View flex={1} marginLeft={theme.sizes.base}>
              <Text caption>Point Anda</Text>
              <Text bold>1.000 Point</Text>
            </View>
          </View>
          <View padding={[theme.sizes.base, theme.sizes.base, 0]}>
            <Text title>Metode Pembayaran</Text>
            <Text caption>( Pilih salah satu )</Text>
          </View>
          <RadioButtons
            options={ options }
            onSelection={ setSelectedOption.bind(this) }
            selectedOption={this.state.selectedOption }
            renderOption={ renderOption }
            renderContainer={ renderContainer }
          />
        </ScrollView>
        <View padding={theme.sizes.base}>
          <Button color='primary' onPress={() => navigate('PaymentGateway')}>
            <Text white bold center>Lanjutkan</Text>
          </Button>
        </View>
      </View>
    )
  }
}

class CheckOut extends Component {
  item = (item) =>{
    return(
      <View row padding={[theme.sizes.base*.5, 0]}>
        <Text style={{flex: 1}}>{item.title}</Text>
        <Text right style={{flex: 1}}>Rp. {item.price}</Text>
      </View>
    )
  }

  itemFooter = () =>{
    return(
      <View>
        <View height={1} color={theme.colors.black_t90} margin={[theme.sizes.base*.5, 0]}/>
        <View row padding={[theme.sizes.base*.5, 0]}>
          <Text bold style={{flex: 1}}>Total</Text>
          <Text bold right style={{flex: 1}}>Rp. [Total]</Text>
        </View>
      </View>
    )
  }

  render(){
    const list = [
      {id: 0, title: 'Perekrutan Helper x1', price: '1.000.000'},
      {id: 1, title: 'Pajak', price: '100.000'}
    ]
    const {navigate} = this.props.navigation
    return(
      <View style={styles.parent}>
        <ScrollView style={{flex: 1}}>
          <View padding={theme.sizes.base}>
            <Text title>Total Invoice</Text>
          </View>
          <FlatList
            data={list}
            renderItem={({item}) => this.item(item)}
            keyExtractor={item => item.id}
            ListFooterComponent={() => this.itemFooter()}
            style={{paddingHorizontal: theme.sizes.base}}
          />
        </ScrollView>
        <View padding={theme.sizes.base}>
          <Button color='primary' onPress={() => navigate('Payment')}>
            <Text white bold center>Payment</Text>
          </Button>
        </View>
      </View>
    )
  }
}

class PaymentGateway extends Component {
  static navigationOptions = {
    title: 'Payment'
  }
  alert(){
    const {navigate, dispatch} = this.props.navigation
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'DetailHelper', params: {navigateFrom: 'PaymentGateway'} })],
    });
    Alert.alert(
      'Berhasil',
      'Payment Success, Terima kasih',
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        // {
        //   text: 'Cancel',
        //   // onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
        {text: 'Lanjutkan', onPress: () => dispatch(resetAction)},
      ],
      {cancelable: false},
    );
  }
  render(){
    const {navigate} = this.props.navigation
    return(
      <View style={styles.parent}>
        <View flex={1} middle center padding={theme.sizes.base}>
          <Text title>Payment Gateway</Text>
        </View>
        <View padding={theme.sizes.base}>
          <Button color='primary' onPress={() => this.alert()}>
            <Text white bold center>Confirm</Text>
          </Button>
        </View>
      </View>
    )
  }
}

export { Payment, CheckOut, PaymentGateway } 

const styles = GlobalStyle
