
import React, { useState, useEffect } from 'react';
import {
    View, Text, FlatList, TouchableHighlight
} from 'react-native';

import { Card, Avatar, Title, Paragraph, Button, ActivityIndicator } from 'react-native-paper';

import PostServices from '../../services/PostServices';


export default function HomeRoute() {
    const { getAllPosts } = PostServices();
    const [postData, setPostData] =  useState();

    useEffect(() => {
        handleGetAllPosts();
        console.log("hey")
    }, [])

    const handleGetAllPosts = () => {
        getAllPosts().then(res => {
            if(res.ok){
                setPostData(res.posts);
            }
        })
    }
    const renderPost = ({ item, index, separators }) => (
        <TouchableHighlight
            key={item.key}
            onPress={() => { alert("post") }}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}
            style={{marginBottom:15}}>
            <Card>
                <Card.Title title={"Juan manuel"} subtitle={new Date(item.create_at).toDateString()+", "+new Date(item.create_at).toLocaleTimeString()} left={(props)=><Avatar.Text {...props} label="JM" />} />
                <Card.Content>
                    <Title>{item.title}</Title>
                    <Paragraph style={{textAlign:"justify"}}>{item.content}</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                {/* <Card.Actions>
                    <Button>Comment</Button>
                </Card.Actions> */}
            </Card>
        </TouchableHighlight>
    )

    return (
        <View >
            
            
            <FlatList
                data={postData}
                renderItem={renderPost}
                ListHeaderComponent={
                    <Text style={{fontSize:18, padding:10}}>Recent posts</Text>
                }
                ListEmptyComponent={()=>(
                    <ActivityIndicator animating={true} />
                )}
            />
        </View>
    );
}