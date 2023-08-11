
import { useContext, useEffect, useState } from "react"
import {AuthContext} from '../AuthContext'
import { Spinner,Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import { WhistlistCompo } from "../Components/MainCompo/WhistlistCompo"


export const  WhislistPage = () => {
    const [getSpinner, setgetSpinner] = useState(true)
    const getToken = localStorage.getItem('uL_')
    const {UserInfo} = useContext(AuthContext)
    const Navigate = useNavigate()

    useEffect(() => {
      if(!getToken || !UserInfo){
            Navigate('/login')
      }else{
        setTimeout(() => {
            setgetSpinner(false)
          },2000)
      }
     
    },[getToken,UserInfo,Navigate])
    return(
        <>

        {
            getSpinner ?    
            <Container>
            <div className="Page-Spinner" style={{height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', }}>
                <Spinner animation="grow" variant="info" />
            </div> 
            </Container>     : <WhistlistCompo />
        }
       
        </>
    )
}