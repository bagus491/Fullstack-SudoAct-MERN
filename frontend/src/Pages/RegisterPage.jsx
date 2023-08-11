import { useEffect, useState } from "react"
import {Spinner,Container} from 'react-bootstrap'
import '../style/main.css'

import { CardRegister } from "../Components/MainCompo/CardRegister"

export const RegisterPage = () => {
    const [getSpinner , setgetSpinner] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setgetSpinner(false)
        },2000)
    },[])

    return(
        <>
         {
            getSpinner ?
            <Container>
            <div className="Page-Spinner" style={{height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', }}>
                <Spinner animation="grow" variant="info" />
            </div> 
            </Container>
            
            : 
            
            <Container>
                <div className="register-page">
                <CardRegister />
                </div>
            </Container>
         }
        </>
    )
}