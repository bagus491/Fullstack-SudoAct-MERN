import { useEffect, useState } from "react"
import {Container} from 'react-bootstrap'
import '../style/main.css'

import { NavigationOne } from "../Components/Reusable/NavigationOne"

export const LandingPage = () => {
    const [getSpinner , setgetSpinner] = useState(true)
    const getSl = localStorage.getItem('Sl')
  
  useEffect(() => {
    if(getSl){
        setgetSpinner(false)
    }
    setTimeout(() => {
        setgetSpinner(false)
        localStorage.setItem('Sl', '!@34%$')
    },4000)
  },[getSl])

    return(
        <>
         {
            getSpinner ?  
            <Container>
                <div className="LandingPage-Load">
                    <div className="LandingPage-text">
                    <h1>isLoading</h1>
                    <div className="bar-Landing"></div>
                    </div>
                </div>
            </Container>
            : 
            <div className="Content-Landing">
                <NavigationOne />
            </div>
         }
        </>
    )
}