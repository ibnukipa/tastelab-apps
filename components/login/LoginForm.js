import React from 'react'
import {StyleSheet, View} from "react-native";
import * as yup from 'yup';
import Text from "@components/Text";
import ENV from "@constants/env";
import Divider from "@components/Divider";
import ColorConstant from "@constants/color";
import {PaddingSizeConstant} from "@constants/size";
import TextInput from "@components/TextInput";
import {useForm} from "react-hook-form";
import Button from "@components/Button";
import useYupResolver from "@hooks/useYupResolver";
import {isEmpty} from "lodash-es";
import {useDispatch, useSelector} from "react-redux";
import {authStateSelector, loginFetch} from "@storage/reducer/auth";

export const LoginFormHeader = () => {
  return (
    <View style={styles.header} key="0">
      <Text bold size={'xHuge'} color={ColorConstant.primary}>LOGIN</Text>
      <Text color={ColorConstant.blueGray300}>{ENV.baseUrl}</Text>
    </View>
  )
}

const loginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
});

const LoginForm = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => authStateSelector(state))
  // Form
  const resolver = useYupResolver(loginValidationSchema);
  const {control, handleSubmit, errors} = useForm(
    {resolver, mode: 'onChange'})
  const loginSubmission = (data) => {
    dispatch(loginFetch(data))
  };

  return (
    <View style={styles.container}>
      <Divider space={20}/>
      <TextInput
        isLight
        control={control}
        name={'username'}
        placeholder={'Username'}
        iconPosition={'left'}
        iconName={'person'}
        errorMessage={errors.username?.message}
      />
      <TextInput
        isLight
        secureTextEntry
        control={control}
        name={'password'}
        placeholder={'Password'}
        iconPosition={'left'}
        iconName={'md-key'}
        errorMessage={errors.password?.message || auth.error}
      />
      <Divider space={20}/>
      <Button isDisabled={!isEmpty(errors) || auth.isLoading} name={'Submit'} onPress={handleSubmit(loginSubmission)}/>
      <Divider space={20}/>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    padding: PaddingSizeConstant.large,
    paddingBottom: 0,
    backgroundColor: ColorConstant.whiteDimmed,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  container: {
    paddingHorizontal: PaddingSizeConstant.large,
  },
})

export default LoginForm
