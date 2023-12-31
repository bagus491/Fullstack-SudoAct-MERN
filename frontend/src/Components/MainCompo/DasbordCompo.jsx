
import { useEffect, useState } from "react"
import { CheckDasbord } from "../../utils"
import { useNavigate, useParams } from "react-router-dom"
import { NavigationTwo } from "../Reusable/NavigationTwo"
import { Profile } from "../sub-compo/Profile"

export const DasbordCompo = () => {
    const getToken = localStorage.getItem('uL_')
    const [getContent, setgetContent] = useState(true)
    const Navigate = useNavigate()
    const {username} = useParams()
    useEffect(() => {
        const CheckToken = async () => {
            const respone = await CheckDasbord(username,getToken)            
            if(!respone.ok){
                setgetContent(false)
                Navigate('*')
            }

        }
        CheckToken()
    },[getToken,Navigate,username])
    return(
        <>
       {
        getContent ?   
        <div>
            <NavigationTwo />
            <Profile />
        </div>
         :
        
        <h1>Anda Tidak Punya akses</h1>
       }
        </>
    )
}