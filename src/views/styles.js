import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
 
    chipContainer:{
        // width:"89%",
        flex:1,
        backgroundColor: "white",
        padding:10,
        borderRadius:20,
        marginVertical:10,
        justifyContent:"center",
        marginLeft:6,
        elevation:2
    },
    chipText:{
        fontSize:18,
        textAlign:"center"
    },
    addNewPost:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        padding:10
    },

    //profile
    infoContainer:{
        justifyContent:"center", alignItems:"center"
    },
    cardStyle:{
        padding:20,
        marginBottom:10
    },

    separator:{
        marginBottom:10
    },

    // forms
    formContainer:{
        flex:1, alignItems:"center", justifyContent:"center", flexDirection:"column", width:"100%"
    }

})

export default styles;