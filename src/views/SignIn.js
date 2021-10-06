
import React, { createRef, useState } from 'react';
import {
    View, Text, Alert
} from 'react-native';

import { Button, TextInput, HelperText } from 'react-native-paper';
import styles from './styles';

import UserServices from '../services/UserServices';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignIn (props){
    const [formData, setFormData] =  useState({username:"", password:"" });
    const {userLogin} = UserServices();
    const [isLoggingIn, setIsLoggingIn] =  useState(false);

    const handleLogin =()=>{
        if(formData.username===""){
            Alert.alert("Error", "Invalid Username or email")
        }else if(formData.password===""){
            Alert.alert("Error", "Invalid password")
        }else{
            setIsLoggingIn(true)
            userLogin(formData).then(res=>  {
                console.log(res)
                if(res.ok){
                  setUserSession(res);
                }else{
                    Alert.alert("Error", res.message)
                }
                setIsLoggingIn(false)
            })
        }
    }
    const setUserSession = async(res)=>{
        const data = JSON.stringify(res.user);
        await AsyncStorage.setItem("@userData", data);
        props.resetSession();
        props.jumpTo("home")
    }
    return (
        <View style={styles.formContainer}>
                <View style={{padding:5, backgroundColor:"white",  alignItems:"center"}}>
                    <MaterialCommunityIcons {...props} name='fire' size={26} />
                    <Text style={{fontSize:20,  color:"red", fontWeight:"bold"}}>Post<Text style={{color:"black"}}>4you</Text></Text>
                </View>
                <View style={styles.separator} />
                <Text style={{fontSize:25, fontWeight:"bold", color:"black"}}>Login</Text>
                <View style={styles.separator} />
                <View style={{width:"90%"}}>
                    <TextInput
                        mode={"outlined"}
                        label="Username or email"
                        returnKeyType={"next"}
                        value={formData.username}
                        onChangeText={text => setFormData({...formData, username: text})}
                    />
                    <HelperText visible={false} />
                    <TextInput
                        mode={"outlined"}
                        label="Password"
                        secureTextEntry={true}
                        value={formData.password}
                        onChangeText={text => setFormData({...formData, password: text})}
                    />
                    <HelperText visible={false} />
                    <Button
                        mode={"contained"}
                        loading={isLoggingIn}
                        onPress={()=>{handleLogin()}}
                    >
                        Login
                    </Button> 
                    <View style={styles.separator} />
                    <Button
                        mode={"outlined"}
                        onPress={()=>{props.jumpTo("signup")}}
                    >
                        I don't have an account
                    </Button> 
                </View>
           
        </View>
      
    );
}