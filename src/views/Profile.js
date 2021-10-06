
import React, { useEffect, useState } from 'react';
import {
    View, Text, Alert, TouchableHighlight, RefreshControl, FlatList
} from 'react-native';

import { Avatar, Card, Title, ActivityIndicator, Paragraph, Button, IconButton } from 'react-native-paper';
import styles from './styles';

import UserServices from '../services/UserServices';
import PostServices from '../services/PostServices';
import AsyncStorage from '@react-native-async-storage/async-storage';


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Profile (props){
    const {userData, setUpdatePost} =props;

    const {getUserById} = UserServices();
    const {getAllPostsByUser, deletePost} = PostServices();
    const [userInfo, setUserInfo] = useState(null);
    const [postData, setPostData] =  useState([]);
    const [isLoadingData, setIsLoadingData] =  useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(()=>{
        handleGetUserById();
        handleGetUserPosts();
    },[])

    const handleGetUserById= async()=>{
        getUserById(userData.idUser).then(res=>{
            if(res.ok){
                setUserInfo(res.user)
            }
        })
    }
    const handleGetUserPosts =async()=>{
        getAllPostsByUser(userData.idUser).then(res=>{
            setIsLoadingData(false);
            if(res.ok){
                setPostData(res.posts)
            }else{
                setPostData([])
            }
        })
    }
    
    const handleLogOut = async()=>{
        await AsyncStorage.removeItem("@userData");
        props.resetSession();
        props.jumpTo("home")
    }

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
                    deletePost(post.idPost, index).then(res=>{
                       
                        if(res.ok){
                            Alert.alert("Beautiful!", "Post deleted")
                            handleGetUserPosts();
                            setUpdatePost(true);
                        }else{
                            Alert.alert("Error", "Post not deleted")
                        }
                        setIsDeleting(false)
                    })
                }
              }
            ]
          );
    }

    const renderPost = ({ item, index, separators }) => (
        <TouchableHighlight
            key={item.key}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}
            style={{marginBottom:10}}>
            <Card>
                <Card.Title 
                    title={<Text style={{fontSize:18}}>{item.firstName +" "+ item.lastName}</Text>}
                    subtitle={new Date(item.create_at).toDateString()+", "+new Date(item.create_at).toLocaleTimeString()} 
                    left={(props)=><Avatar.Text {...props} label={item.firstName.match(/\b(\w)/g)[0] +""+ item.lastName.match(/\b(\w)/g)[0]} />}
                    right={(props) => <IconButton {...props} disabled={isDeleting} icon="close"  onPress={() => {handleDelete(item, index)}} />}
                />
                    
                <Card.Content>
                    <Title>{item.title}</Title>
                    <Paragraph style={{textAlign:"justify"}}>{item.content}</Paragraph>
                </Card.Content>
            </Card>
        </TouchableHighlight>
    )

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            setRefreshing(false);
            handleGetUserPosts();
        } );
    }, []);

    return (
        < >
            <FlatList
                data={postData}
                renderItem={renderPost}
                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                }
                style={{height:"100%"}}
                ListHeaderComponent={
                    <>
                        <Card style={styles.cardStyle}>
                            <View style={styles.infoContainer}>
                                <Avatar.Image size={80} source={{uri:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"}} />
                                <Text style={{fontSize:18}}>{userInfo?.username}</Text>
                                <Text style={{fontSize:16}}>{userInfo?.email}</Text>
                                <Button icon={"exit-to-app"} onPress={()=>{handleLogOut()}}>
                                    Cerrar sesión
                                </Button>
                            </View>
                            
                        </Card>
                        <Card style={styles.cardStyle}>
                            <View>
                                <Paragraph style={{fontSize:16, fontWeight:"bold"}}>About info</Paragraph>
                                <View style={styles.separator} />
                                <Paragraph style={{color:"grey", fontSize:16}}>First name</Paragraph>
                                <Paragraph style={{fontSize:16}}>{userInfo?.firstName}</Paragraph>
                                <View style={styles.separator} />
                                <Paragraph style={{color:"grey", fontSize:16}}>Last name</Paragraph>
                                <Paragraph style={{fontSize:16}}>{userInfo?.lastName}</Paragraph>
                               
                               
                            </View>
                        </Card>
                    </>
                }
                ListEmptyComponent={()=>(
                    isLoadingData?
                        <ActivityIndicator animating={true} />
                    :
                        <Card style={styles.cardStyle}>
                            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                                <Text style={{fontSize:16}}>You haven't published anything yet</Text>
                                <View style={{marginBottom:10}} />
                                <Button mode="contained" onPress={()=>{props.jumpTo("add")}}>Add new post</Button>
                            </View>
                        </Card>
                )}
                
            />
            
        </>
    );
}