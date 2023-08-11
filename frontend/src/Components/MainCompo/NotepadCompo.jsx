
import { useEffect, useState } from "react"
import { CheckNotepad } from "../../utils"
import { useNavigate, useParams } from "react-router-dom"
import { NavigationTwo } from "../Reusable/NavigationTwo"
import { CardNote } from "../sub-compo/CardNote"

export const NotepadCompo = () => {
    const getToken = localStorage.getItem('uL_')
    const [getContent, setgetContent] = useState(true)
    const Navigate = useNavigate()
    const {username} = useParams()
    useEffect(() => {
        const CheckToken = async () => {
            const respone = await CheckNotepad(username,getToken)            
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
            <CardNote />
        </div>
         :
        
        <h1>Anda Tidak Punya akses</h1>
       }
        </>
    )
}