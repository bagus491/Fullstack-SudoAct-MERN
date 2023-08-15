
import { useEffect, useState } from "react"
import { CheckSetting } from "../../utils"
import { useNavigate, useParams } from "react-router-dom"
import { NavigationTwo } from "../Reusable/NavigationTwo"
import { CardSetting } from "../sub-compo/CardSetting"

export const SettingCompo = () => {
    const getToken = localStorage.getItem('uL_')
    const [getContent, setgetContent] = useState(true)
    const Navigate = useNavigate()
    const {username} = useParams()
    useEffect(() => {
        const CheckToken = async () => {
            const respone = await CheckSetting(username,getToken)            
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
            <CardSetting />
        </div>
         :
        
        <h1>Anda Tidak Punya akses</h1>
       }
        </>
    )
}