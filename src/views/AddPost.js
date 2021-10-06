
import React, { useState } from 'react';
import {
    View, Text
} from 'react-native';
import { Avatar, TextInput, Card, HelperText, Paragraph, Button } from 'react-native-paper';
import styles from './styles';

export default function AddPost (props){
    const {userData} = props;
    const [formData, setFormData] = useState({
        idUser:1,
        title: "",
        content:"",
        idStatus:1,
    });
    const [isCreating, setIsCreating] = useState(false)

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
                />
                <HelperText visible={false} />
                <TextInput
                    mode={"outlined"}
                    label="Description"
                    numberOfLines={8}
                    multiline={true}
                    value={formData.content}
                />
                <HelperText visible={false} />
                <Button
                    mode={"contained"}
                    loading={isCreating}
                >
                    POST
                </Button>
            </View>
        </Card>
        
    </>
    );
}