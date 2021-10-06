
import React, { createRef, useState } from 'react';
import {
    View, Text, Alert
} from 'react-native';

import { Button, TextInput, HelperText } from 'react-native-paper';
import styles from './styles';

import UserServices from '../services/UserServices';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function SignUp (props){
    const [formData, setFormData] =  useState({username:"", email:"", firstName:"", lastName:"", password:"" });
    const {userLogin, createUser} = UserServices();
    const [isCreating, setIsCreating] =  useState(false);

    const handleSignUp =()=>{
        if(formData.username===""){
            Alert.alert("Error", "Invalid Username")
        }else if(formData.email===""){
            Alert.alert("Error", "Invalid Email")
        }else if(formData.firstName===""){
            Alert.alert("Error", "Invalid First name")
        }else if(formData.lastName===""){
            Alert.alert("Error", "Invalid Last name")
        }else if(formData.lastName===""){
            Alert.alert("Error", "Invalid password")
        }else{
            setIsCreating(true)
            createUser(formData).then(res=>{
                console.log(res)
                if(res.ok){
                    props.jumpTo("login")
                    Alert.alert("Beautiful!", res.message)
                }else{
                    Alert.alert("Error", res.message)
                }
                setIsCreating(false)
            })
        }
    }

    return (
       
        <View style={styles.formContainer}>

                <View style={{padding:5, backgroundColor:"white",  alignItems:"center"}}>
                    <MaterialCommunityIcons {...props} name='fire' size={26} />
                    <Text style={{fontSize:20,  color:"red", fontWeight:"bold"}}>Post<Text style={{color:"black"}}>4you</Text></Text>
                </View>
                <View style={styles.separator} />
                <Text style={{fontSize:25, fontWeight:"bold", color:"black"}}>SignUp</Text>
                <View style={styles.separator} />
                <View style={{width:"90%"}}>
                    <TextInput
                        mode={"outlined"}
                        label="Username"
                        returnKeyType={"next"}
                        
                        value={formData.username}
                        onChangeText={text => setFormData({...formData, username: text})}
                    />
                    <HelperText visible={false} />
                    <TextInput     
                        mode={"outlined"}
                        label="Email"
                        keyboardType={"email-address"}
                        value={formData.email}
                        onChangeText={text => setFormData({...formData, email: text})}
                    />
                    <HelperText visible={false} />
                    <TextInput
                        mode={"outlined"}
                        label="First Name"
                        value={formData.firstName}
                        onChangeText={text => setFormData({...formData, firstName: text})}
                    />
                    <HelperText visible={false} />
                    <TextInput
                        mode={"outlined"}
                        label="Last name"
                        value={formData.lastName}
                        onChangeText={text => setFormData({...formData, lastName: text})}
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
                        loading={isCreating}
                        onPress={()=>{handleSignUp()}}
                    >
                        SignUp
                    </Button> 
                    <View style={styles.separator} />
                    <Button
                        mode={"outlined"}
                        onPress={()=>{props.jumpTo("login")}}
                    >
                        Already have an account? SignIn
                    </Button> 
                </View>
           
        </View>
      
    );
}