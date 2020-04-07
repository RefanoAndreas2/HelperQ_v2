import {StyleSheet, Platform} from 'react-native'
import { theme, mocks } from '../constants';

export default StyleSheet.create({
  mt_SafeArea:{
    marginTop: Platform.OS === 'android' ? 24 : 0
  },
  pt_SafeArea:{
    paddingTop: Platform.OS === 'android' ? 24 : 0
  },
  parent: {
    flex: 1,
    backgroundColor: theme.colors.bgParent
  },
  listTouch: {
    marginHorizontal: theme.sizes.base,
  },
  border: {
    borderWidth: 1,
    borderColor: theme.colors.black_t90
  }
})