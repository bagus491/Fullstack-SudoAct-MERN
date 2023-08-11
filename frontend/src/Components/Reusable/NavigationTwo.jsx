import { Button } from 'react-bootstrap'
import '../../style/main.css'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const NavigationTwo  = () => {
    const [SideBar ,setSideBar] = useState(false)
    const Navigate = useNavigate()
    const {username} = useParams()

    const ChangeVisi = (e) => {
        e.preventDefault()
        if(SideBar === false){
            setSideBar(true)
        }else {
            setSideBar(false)
        }
    }

    return(
        <>
        <div className="side-nav">
            <div className={SideBar ? 'side-nav-active'  :  'side-nav-sub'}>
                <div className='side-nav-flex text-center' style={{width: '100%'}}>
                <br></br>
                <h1>SudoAct</h1>
                <Button className='button-side-nav' onClick={() => Navigate(`/dasbord/${username}`)}>Dasbord</Button>
                <Button className='button-side-nav' onClick={() => Navigate(`/whistlist/${username}`)}>Whistlist</Button>
                <Button className='button-side-nav' onClick={() => Navigate(`/notepad/${username}`)}>Notepad</Button>
                <Button className='button-side-nav' onClick={() => Navigate(`/setting/${username}`)}>Setting</Button>
                <Button className='button-side-nav'>Logout</Button>
                </div>
            </div>
            <div className='side-nav-button'>
                <br></br>
          <Button onClick={(e) => ChangeVisi(e)} style={{background: 'none', border: '1px solid #03c988'}}>🚀</Button>
            </div>
          
        </div>
        </>
    )
}