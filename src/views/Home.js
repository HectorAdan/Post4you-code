
import React, { useState, useEffect } from 'react';
import {
    View, Text, FlatList, TouchableHighlight, RefreshControl, TouchableOpacity, Alert
} from 'react-native';
import { Card, Avatar, Title, Paragraph, Button, ActivityIndicator, IconButton } from 'react-native-paper';
import PostServices from '../services/PostServices';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles'


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function HomeView(props) {
    const { userData, updatePost, setUpdatePost} = props;
    const { getAllPosts, deletePost } = PostServices();
    const [postData, setPostData] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);


    useEffect(() => {
        handleGetAllPosts();
    }, [])

    useEffect(() => {
        if (updatePost) {
            handleGetAllPosts();
            setUpdatePost(false)
        }

    }, [updatePost])

    const handleGetAllPosts = () => {
        getAllPosts().then(res => {
            if (res.ok) {
                setPostData(res.posts);
            } else {
                setPostData([]);
            }
            setIsLoadingData(false)
        })
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            setRefreshing(false);
            handleGetAllPosts();
        });
    }, []);

    const renderPost = ({ item, index, separators }) => (
        <TouchableHighlight
            key={item.key}
            onPress={() => { console.log("post") }}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}
            style={{ marginBottom: 10 }}>
            <Card>
                <Card.Title
                    title={<Text style={{fontSize:18}}>{item.firstName +" "+ item.lastName}</Text>}
                    subtitle={new Date(item.create_at).toDateString() + ", " + new Date(item.create_at).toLocaleTimeString()}
                    left={(props) => <Avatar.Text {...props}
                    label={item.firstName.match(/\b(\w)/g)[0] + "" + item.lastName.match(/\b(\w)/g)[0]} />} 
                    right={
                        userData?
                            userData.idUser==item.idUser? (props) => <IconButton {...props} disabled={isDeleting} icon="close" onPress={() => {handleDelete(item)}} />: null
                        :
                            null
                    }
                />
                <Card.Content>
                    <Title style={{ fontSize: 18 }}>{item.title}</Title>
                    <Paragraph style={{ textAlign: "justify", fontSize: 16 }}>{item.content}</Paragraph>
                </Card.Content>

            </Card>
        </TouchableHighlight>
    )

    const handleDelete = (post)=>{
        Alert.alert(
            'Delete post',
            'Deleting '+post.title+', Are you sure?',
            [
              {
                text: 'Cancel',
                style: 'cancel'
              },
              {
                text: 'Delete',
                onPress: () => {
                    setIsDeleting(true)
                    deletePost(post.idPost).then(res=>{
                        setIsDeleting(false)
                        if(res.ok){
                            Alert.alert("Beautiful!", "Post deleted")
                            handleGetAllPosts();
                        }else{
                            Alert.alert("Error", "Post not deleted")
                        }
                       
                    })
                }
              }
            ]
          );
    }

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
                style={{ height: "100%" }}
                ListHeaderComponent={
                    <View >

                        <View style={{ padding: 10, backgroundColor: "white", elevation: 2, alignItems: "center" }}>
                            <MaterialCommunityIcons name='fire' size={26} style={{ color: "red" }} />
                            {userData ?
                                <Text style={{ fontSize: 18 }}>Hi {userData?.username}, welcome to  <Text style={{ color: "red", fontWeight: "bold" }}>Post<Text style={{ color: "black" }}>4you</Text></Text></Text>
                                :
                                <Text style={{ fontSize: 18, color: "red", fontWeight: "bold" }}>Post<Text style={{ color: "black" }}>4you</Text></Text>
                            }

                        </View>
                        <TouchableOpacity activeOpacity={1} style={styles.addNewPost} onPress={() => { userData ? props.jumpTo("add") : props.jumpTo("login") }}>
                            <Avatar.Text size={40} label={userData ? userData.username.match(/\b(\w)/g)[0] : ""} />
                            <View style={styles.chipContainer}>
                                <Text style={styles.chipText}>What's on your mind?</Text>
                            </View>
                        </TouchableOpacity>


                        <Text style={{ fontSize: 18, padding: 10 }}>Latest posts</Text>
                    </View>
                }
                ListEmptyComponent={() => (
                    isLoadingData ?
                        <ActivityIndicator animating={true} />
                        :
                        <Card style={styles.cardStyle}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: 150 }}>
                                <Text style={{ fontSize: 18, textAlign: "center" }}>No post found yet. Be the first to publish one</Text>
                                <View style={{ marginBottom: 10 }} />
                                <Button mode="contained" onPress={() => { userData ? props.jumpTo("add") : props.jumpTo("login") }}>Add new post</Button>
                            </View>
                        </Card>
                )}

            />
        </View>
    );
}