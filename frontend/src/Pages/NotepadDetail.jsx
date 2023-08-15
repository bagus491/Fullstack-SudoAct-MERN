import { useContext, useEffect, useState } from "react"
import {AuthContext} from '../AuthContext'
import { useNavigate } from "react-router-dom"
import { Spinner } from "react-bootstrap"
import { NavigationTwo } from "../Components/Reusable/NavigationTwo"
import { DetailCompo } from "../Components/sub-compo/DetailCompo"

export const NotepadDetail = () => {
    const [getSpinner, setgetSpinner] = useState(false)
    const getToken = localStorage.getItem('uL_')
    const {UserInfo} = useContext(AuthContext)
    const Navigate = useNavigate()

    useEffect(() => {
        if(!getToken || !UserInfo){
            Navigate('/login')
        }else{
            setTimeout(() => {
                setgetSpinner(true)
            },2000)
        }
    },[getToken,UserInfo,Navigate])
    return(
        <>
        {
            getSpinner ?    
          <div>
            <NavigationTwo />
            <DetailCompo />
          </div>
            :

            <div className="Page-Spinner" style={{height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', }}>
                <Spinner animation="grow" variant="info" />
            </div> 
        }
        </>
    )
}