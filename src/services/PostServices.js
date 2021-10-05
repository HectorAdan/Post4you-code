
const URL_API = "https://api-post4you.vercel.app/api"

const PostServices = ()=>{

    const getAllPosts = async ()=>{
        return await fetch(URL_API+"/post-get-all", {
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res =>{
            return res.json();
        }).then(res=>{
            return res;
        }).catch(e=>{
            console.log("error"+ e)
        })
    }

    const createPost = async (data)=>{
        return await fetch(URL_API+"/post-create", {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res =>{
            return res.json();
        }).then(res=>{
            return res;
        }).catch(e=>{
            console.log("error"+ e)
        })
    }

    return {
        getAllPosts,
        createPost
    }
}
export default PostServices;