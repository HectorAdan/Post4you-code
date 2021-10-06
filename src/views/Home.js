
import React, { useState, useEffect } from 'react';
import {
    View, Text, FlatList, TouchableHighlight, RefreshControl
} from 'react-native';
import { Card, Avatar, Title, Paragraph, Button, ActivityIndicator } from 'react-native-paper';
import PostServices from '../services/PostServices';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles'


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function HomeView(props) {
    const {userData} = props;

    const { getAllPosts } = PostServices();
    const [postData, setPostData] =  useState([]);
    const [isLoadingData, setIsLoadingData] =  useState(true);

    useEffect(() => {
        handleGetAllPosts();
    }, [])


    const handleGetAllPosts = () => {
        getAllPosts().then(res => {
            setIsLoadingData(false)
            if(res.ok){
                setPostData(res.posts);
            }else{
                setPostData([]);
            }
        })
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            setRefreshing(false);
            handleGetAllPosts();
        } );
    }, []);

    const renderPost = ({ item, index, separators }) => (
        <TouchableHighlight
            key={item.key}
            onPress={() => { alert("post") }}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}
            style={{marginBottom:10}}>
            <Card>
                <Card.Title title={item.firstName} subtitle={new Date(item.create_at).toDateString()+", "+new Date(item.create_at).toLocaleTimeString()} left={(props)=><Avatar.Text {...props} label={item.firstName.match(/\b(\w)/g)[0] +""+ item.firstName.match(/\b(\w)/g)[1]} />} />
                <Card.Content>
                    <Title>{item.title}</Title>
                    <Paragraph style={{textAlign:"justify"}}>{item.content}</Paragraph>
                </Card.Content>
            </Card>
        </TouchableHighlight>
    )

    return (
        <View >
            
            <FlatList
                data={postData}
                renderItem={renderPost}
                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                }
                ListHeaderComponent={
                    <View >
                         
                        <View style={{padding:10, backgroundColor:"white", elevation:2, alignItems:"center"}}>
                            <MaterialCommunityIcons  name='fire' size={26} style={{color:"red"}} />
                            <Text style={{fontSize:18}}>Hi {userData?.username}, welcome to  <Text style={{ color:"red", fontWeight:"bold"}}>Post<Text style={{color:"black"}}>4you</Text></Text></Text>
                            
                        </View>
                        <View style={styles.addNewPost}>
                            <Avatar.Text size={40} label={userData?userData.username.match(/\b(\w)/g)[0]:"" } />
                            <Card  onPress={()=>{userData?props.jumpTo("add"):props.jumpTo("login")}} style={styles.chipContainer}>
                                <Text style={styles.chipText}>What's on your mind?</Text>
                            </Card>
                        </View>
                        
                        
                        <Text style={{fontSize:18, padding:10}}>Latest posts</Text>
                    </View>
                }
                ListEmptyComponent={()=>(
                    isLoadingData?
                        <ActivityIndicator animating={true} />
                    :
                        <Card style={styles.cardStyle}>
                            <View style={{flex:1, justifyContent:"center", alignItems:"center", height:150}}>
                                <Text style={{fontSize:18, textAlign:"center"}}>No post found yet. Be the first to publish one</Text>
                                <View style={{marginBottom:10}} />
                                <Button mode="contained"  onPress={()=>{userData?props.jumpTo("add"):props.jumpTo("login")}}>Add new post</Button>
                            </View>
                        </Card>
                )}
               
            />
        </View>
    );
}