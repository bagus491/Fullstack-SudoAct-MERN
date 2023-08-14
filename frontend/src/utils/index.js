//fetching
//axios
import axios from 'axios'


export const doFetchReg = async (username,password,email) => {
    const formData = new URLSearchParams()
                formData.append('username',username)
                formData.append('password',password)
                formData.append('email',email)
    const respone = await fetch('http://localhost:5000/register',{
        method: 'post',
        body: formData
    })
    
   return respone
}


//fetching
export const LoginData = async (getToken) => {
    const respone = await fetch('http://localhost:5000/login', {
        method: 'GET',
        headers: {
            'Authorization': getToken
        }
    })

    return respone
}

//fetching login

export const doFetchLogin = async (username,password) => {
    const formData = new URLSearchParams()
    formData.append('username',username)
    formData.append('password',password)

const respone = await fetch('http://localhost:5000/login',{
method: 'post',
body: formData
})

return respone
}

//fetching logout
export const doFetchingLogout = async (username,getToken) => {
    const respone = await fetch(`http://localhost:5000/logout/${username}`, {
        method: 'GET',
        headers: {
            'Authorization': getToken,
        }
        
    })

    return respone
}



//fetching
export const CheckDasbord = async (username,getToken) => {
    const respone = await fetch(`http://localhost:5000/dasbord/${username}`, {
        method: 'GET',
        headers: {
            'Authorization': getToken
        }
    })

    return respone
}

//fetchinCardProfile
export const GetProfile = async(username,getToken) => {
    const respone = await fetch(`http://localhost:5000/dasbord/profile/${username}`,{
        method: 'GET',
        headers: {
            'Authorization': getToken
        }
    })
    return respone
}

//fetchingCardPost
export const doFetchingProfile = async(username,Profile,MyJob,Desc,getToken) => {
    const formData = new FormData()
        formData.append('Profile',Profile[0])
        formData.append('MyJob',MyJob)
        formData.append('Desc',Desc)
    const respone = await fetch(`http://localhost:5000/dasbord/profile/${username}`,{
        method: 'post',
        body: formData,
        headers: {
            'Authorization': getToken
        }
    })

    return respone
}

//whistlist
//GetWhislist
export const GetWhislist = async (username,getToken) => {
    const respone = await fetch(`http://localhost:5000/whistlist/card/${username}`,{
        method: 'GET',
        headers: {
            'Authorization': getToken
        }
    })
    return respone
}

//doUploadWhilsit
export const doFetchWhistlist = async (username,getToken,Title,Avatar,Count,Desc) => {
    const formdata = new FormData()
        formdata.append('Title',Title)
        formdata.append('Avatar',Avatar[0])
        formdata.append('Count',Count)
        formdata.append('Desc',Desc)
    const respone = await fetch(`http://localhost:5000/whistlist/card/${username}`,{
        method: 'post',
        body: formdata,
        headers: {
            'Authorization': getToken
        }
    })
    return respone
}

//doUpdate
export const doUpdateWhistlist = async (username,id,getToken,Title,Avatar,Count,Desc) => {
    const formdata = new FormData()
           formdata.append('Title',Title)
           formdata.append('Avatar',Avatar[0])
           formdata.append('Count',Count)
           formdata.append('Desc',Desc)
const respone = await fetch(`http://localhost:5000/whistlist/card/${username}/${id}`,{
    method: 'PUT',
    body: formdata,
    headers: {
        'Authorization': getToken
    }
})
return respone
}

//delete
export const doDeleteWhistlist = async (username,getToken,id) => {
    const respone = await axios.delete(`http://localhost:5000/whistlist/card/${username}/${id}`,{
        headers: {
            Authorization: getToken
        }
    })
    return respone
}

//fetching
export const CheckWhistlist = async (username,getToken) => {
    const respone = await fetch(`http://localhost:5000/whistlist/${username}`, {
        method: 'GET',
        headers: {
            'Authorization': getToken
        }
    })

    return respone
}

//fetching
export const CheckNotepad = async (username,getToken) => {
    const respone = await fetch(`http://localhost:5000/notepad/${username}`, {
        method: 'GET',
        headers: {
            'Authorization': getToken
        }
    })

    return respone
}

//fetching
export const CheckSetting = async (username,getToken) => {
    const respone = await fetch(`http://localhost:5000/setting/${username}`, {
        method: 'GET',
        headers: {
            'Authorization': getToken
        }
    })

    return respone
}