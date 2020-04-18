import React, { Component } from 'react'
import { StyleSheet, Modal, AsyncStorage } from 'react-native'
import axios from 'axios'

export default class Base extends Component{
    url = 'http://helperq-lumen.propertigo.id'
	url_image = 'http://helperq-lumen.propertigo.id/images'
    axios = axios
    // no_user_img = require ('../assets/img/no_profile_picture.png')
    no_user_img = require ('../assets/img/png/no_profile_picture.png')

    constructor(props){
		super(props)
	}
}