
import React, { useState } from 'react';
import {
    View, Alert
} from 'react-native';
import { TextInput, Card, HelperText, Paragraph, Button  } from 'react-native-paper';
import styles from './styles';

import PostServices from '../services/PostServices';

export default function AddPost (props){
    const {userData} = props;
    const {createPost} = PostServices();

    const [formData, setFormData] = useState({
        idUser: userData.idUser,
        title: "",
        content:"",
        idStatus: 2,
    });
    const [isCreating, setIsCreating] = useState()

    const handleCreatePost =()=>{
        if(formData.title===""){
            Alert.alert("Error", "Add a title")
        }else if(formData.content===""){
            Alert.alert("Error", "Add a content")
        }else{
            setIsCreating(true);
            createPost(formData).then(res=>{
                if(res.ok){
                    // Alert.alert("Beautiful!", res.message)
                    setFormData({...formData, title:"", content:""})
                    props.jumpTo("home")
                    props.setUpdatePost(true)
                }else{
                    Alert.alert("Error", res.message)
                }
                setIsCreating(false);
            })
        }
    }

    return (
        < >

        <Card style={styles.cardStyle}>
            <View>
                <Paragraph style={{fontSize:18}}>Hi {userData?.username}, What's on your mind?</Paragraph>
                <View style={styles.separator} />
         
                <TextInput
                    mode={"outlined"}
                    label="Title"
                    value={formData.title}
                    onChangeText={text => setFormData({...formData, title: text})}
                />
                <HelperText visible={false} />
                <TextInput
                    mode={"outlined"}
                    label="Description"
                    numberOfLines={8}
                    multiline={true}
                    value={formData.content}
                    onChangeText={text => setFormData({...formData, content: text})}
                />
                <HelperText visible={false} />
                <Button
                    mode={"contained"}
                    loading={isCreating}
                    disabled={isCreating}
                    onPress={()=>{handleCreatePost()}}
                >
                    POST
                </Button>
            </View>
        </Card>
        
    </>
    );
}