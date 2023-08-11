import {Card,Form,Button} from 'react-bootstrap'
import Astronout from '../../Assets/Astronout.png';
import { useNavigate } from 'react-router-dom';
import {  useContext, useState } from 'react';

import { doFetchLogin } from '../../utils';
import { AuthContext } from '../../AuthContext';

export const CardLogin = () => {
    const [username,setusername] = useState('')
    const [password,setpassword] = useState('')
    const {setUserInfo} = useContext(AuthContext)

    const Navigate = useNavigate()

    const doRegister = async (e) => {
        e.preventDefault()
        try{
            const respone = await doFetchLogin(username,password)
            const json = await respone.json()
            if(!respone.ok){
               return alert('Check Username or Password')
            }

            alert('Welcome')
            localStorage.setItem('uL_', json.token)
            setUserInfo(json)
            Navigate(`/dasbord/${json.username}`)
        }catch(error){
            console.error({msg : 'Error'})
            alert('Check Username or Password')
        }
    }


    return(
        <>
        <Card className='cardCompo'>
         <Card.Body style={{display: 'flex', flexWrap: 'wrap',flexDirection: 'column'}} className='CardBody'>
         <div className='card-one' style={{flex: 1}}>
            <h3>Login</h3>
            <br></br>
            <form onSubmit={doRegister}>
                <div className='md-3'>
            <Form.Control
            required
            type="text"
            placeholder="Username"
            name='username'
            onChange={(e) => setusername(e.target.value)}
          />
                </div>

                <br></br>
                <div className='md-3'>
            <Form.Control
            required
            type="password"
            placeholder="Password"
            name='password'
            onChange={(e) => setpassword(e.target.value)}
          />
                </div>

             <br></br>
            <Button style={{background: '#03c988', border: 'none'}} type='submit'>Login</Button>
            </form>
         </div>
        
         <div className='card-two text-center' style={{flex: 1}}>
        <img src={Astronout}  className='imgAstro' alt='foto'></img>
        <br></br>
        
        <Button onClick={() => Navigate('/register')} style={{background: 'none', border: 'none', color: 'black', borderBottom: '1px solid blue'}}>&laquo; Register</Button>
        <Button onClick={() => Navigate('/')} style={{background: 'none', border: 'none', color: 'black', borderBottom: '1px solid blue', marginLeft: '10px'}}>&laquo; Home</Button>
         </div>
      </Card.Body>
    </Card>
        </>
    )
}