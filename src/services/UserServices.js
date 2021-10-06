
const URL_API = "https://api-post4you.vercel.app/api"

const UserServices = ()=>{

    const getUserById = async (idUser)=>{
        return await fetch(URL_API+"/user-find-by-id/"+idUser, {
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

    const userLogin = async (data)=>{
        return await fetch(URL_API+"/user-login/", {
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

    const createUser = async (data)=>{
        return await fetch(URL_API+"/user-create/", {
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
        getUserById,
        userLogin,
        createUser
    }
}
export default UserServices;