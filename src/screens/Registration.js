import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, AsyncStorage } from 'react-native'
import { Text, View } from 'react-native-animatable'
import axios from 'axios';
import Config from  'react-native-config';

import CustomButton from '../components/CustomButton'
import CustomTextInput from '../components/CustomTextInput'
import metrics from '../config/metric'

export default class Registration extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onSignupPress: PropTypes.func.isRequired,
    onLoginLinkPress: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      phone: '',
      department: '',
      address: ''
    }
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  handleRegistration() {
    let { fullName, phone, department, address } = this.state;
    axios.post(Config.API_URL+'registration', {
      fullName: fullName,
      phone: phone,
      department: department,
      address: address
    })
    .then(response => {

    })
    .catch(error => {

    });
  }

  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300)
      ])
    }
  }

  render () {
    const { fullName, phone, department, address } = this.state
    const { isLoading, onLoginLinkPress, onSignupPress } = this.props
    const isValid = email !== '' && password !== '' && fullName !== ''
    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => this.formRef = ref}>
          <CustomTextInput
            ref={(ref) => this.mobileInputRef = ref}
            placeholder={'Full name'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.departmentInputRef.focus()}
            onChangeText={(value) => this.setState({ fullName: value })}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            ref={(ref) => this.departmentInputRef = ref}
            placeholder={'Full name'}
            keyboardType={'text'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.phoneInputRef.focus()}
            onChangeText={(value) => this.setState({ email: value })}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            ref={(ref) => this.phoneInputRef = ref}
            placeholder={'Phone Number'}
            editable={!isLoading}
            blurOnSubmit={false}
            returnKeyType={'next'}
            withRef={true}
            onSubmitEditing={() => this.addressInputRef.focus()}
            onChangeText={(value) => this.setState({ phone: value })}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            ref={(ref) => this.addressInputRef = ref}
            multiline={true}
            placeholder={'Address'}
            keyboardType={'done'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onChangeText={(value) => this.setState({ address: value })}
            isEnabled={!isLoading}
          />
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={() => onSignupPress(email, password, fullName)}
              isEnabled={isValid}
              isLoading={isLoading}
              buttonStyle={styles.createAccountButton}
              textStyle={styles.createAccountButtonText}
              text={'Create Account'}
            />
          </View>
          <Text
            ref={(ref) => this.linkRef = ref}
            style={styles.loginLink}
            onPress={onLoginLinkPress}
            animation={'fadeIn'}
            duration={600}
            delay={400}
          >
            {'Already have an account?'}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  form: {
    marginTop: 20
  },
  footer: {
    height: 100,
    justifyContent: 'center'
  },
  createAccountButton: {
    backgroundColor: 'white'
  },
  createAccountButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  loginLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  }
})
