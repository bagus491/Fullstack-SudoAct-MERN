//fetching


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