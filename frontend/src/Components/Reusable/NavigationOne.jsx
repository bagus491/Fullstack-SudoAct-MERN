import {Nav,Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const NavigationOne = () => {
    const Navigate = useNavigate()

    
    return(
        <>
        <div className="nav">
            <div className="nav-container">
             <div className="nav-flex">
                <h1>SudoAct</h1>

               <ul>
                <li><Nav.Link href='' className='path'>Home</Nav.Link></li>
                <li><Nav.Link href='' className='path'>About</Nav.Link></li>
                <li><Nav.Link href='' className='path'>Tutorial</Nav.Link></li>
               </ul>

                <div className='button-Landing'>
                <Button onClick={() => Navigate('/register')}  className='btn-one'>Register</Button>
                <Button onClick={() => Navigate('/login')} className='btn-two'>Login</Button>
                </div>

             </div>
            </div>
        </div>
        </>
    )
}