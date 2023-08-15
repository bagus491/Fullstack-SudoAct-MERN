import {Button,Container} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const NavigationOne = () => {
    const Navigate = useNavigate()

    
    return(
        <>
        <Container>
        <div className='bg-text'>
            <h1>Welcome to SudoAct</h1>
            <Button onClick={() => Navigate('/register')}  className='btn-one'>Register</Button>
            <Button onClick={() => Navigate('/login')} className='btn-two'>Login</Button>
        </div>
        </Container>
        </>
    )
}