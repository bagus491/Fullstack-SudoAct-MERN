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