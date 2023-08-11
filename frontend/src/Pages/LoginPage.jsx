import { useEffect, useState } from "react"
import { Spinner,Container } from "react-bootstrap"

import { LoginData } from "../utils"
import { CardLogin } from "../Components/MainCompo/CardLogin"
import { useNavigate } from "react-router-dom"

export const LoginPage = () => {
    const [getSpinner , setgetSpinner] = useState(true)
    const getToken = localStorage.getItem('uL_')
    const Navigate = useNavigate()

    useEffect(() => {
        const CheckedToken = async () => {
            const respone = await LoginData(getToken)
            const json = await respone.json()

            if(!respone.ok){
                setTimeout(() => {
                    setgetSpinner(false)
                    return false
                },3000)
            }

            if(respone.status === 200){
                setTimeout(() => {
                    Navigate(`/dasbord/${json.decodedUser}`)
                },3000)
            }
        }
        CheckedToken()
    },[getToken,Navigate])
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
            <div className="login-page">
            <CardLogin />
            </div>
        </Container>
        }
        </>
    )
}