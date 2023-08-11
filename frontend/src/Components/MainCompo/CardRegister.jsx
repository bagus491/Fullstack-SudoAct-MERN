import {Card,Form,Button} from 'react-bootstrap'
import Astronout from '../../Assets/Astronout.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { doFetchReg } from '../../utils';

export const CardRegister = () => {
    const [username,setusername] = useState('')
    const [password,setpassword] = useState('')
    const [email,setemail] = useState('')
    const [getres, setgetres] = useState()


    const Navigate = useNavigate()

    const doRegister = async (e) => {
        e.preventDefault()
        try{
            const respone = await doFetchReg(username,password,email)
            const json = await respone.json()
            if(!respone.ok){
                setgetres(json)
                return false
            }

            alert(json.msg)
            Navigate('/login')
        }catch(error){
            console.error({msg : 'Error'})
        }
    }

    return(
        <>
        <Card className='cardCompo'>
         <Card.Body style={{display: 'flex', flexWrap: 'wrap'}} className='CardBody'>
         <div className='card-one' style={{flex: 1}}>
            <h3>Register</h3>
            <br></br>
            <ul>
                {
                    getres ?   getres.map((e) => (
                        <li key={e.msg}>{e.msg}</li>
                    ))  : <p></p>
                }
            </ul>
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
                <div className='md-3'>
            <Form.Control
            required
            type="email"
            placeholder="Email"
            name='email'
            onChange={(e) => setemail(e.target.value)}
          />
                </div>
             <br></br>
            <Button style={{background: '#03c988', border: 'none'}} type='submit'>Register</Button>
            </form>
         </div>

         <div className='card-two text-center' style={{flex: 1}}>
        <img src={Astronout}  className='imgAstro' alt='foto'></img>
        <br></br>
        
        <Button onClick={() => Navigate('/login')} style={{background: 'none', border: 'none', color: 'black', borderBottom: '1px solid blue'}}>&laquo; i am Already Member</Button>
         </div>
      </Card.Body>
    </Card>
        </>
    )
}