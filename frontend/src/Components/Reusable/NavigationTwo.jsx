import { Button } from 'react-bootstrap'
import '../../style/main.css'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doFetchingLogout } from '../../utils'

export const NavigationTwo  = () => {
    const [SideBar ,setSideBar] = useState(false)
    const Navigate = useNavigate()
    const {username} = useParams()
    const getToken = localStorage.getItem('uL_')

    const ChangeVisi = (e) => {
        e.preventDefault()
        if(SideBar === false){
            setSideBar(true)
        }else {
            setSideBar(false)
        }
    }

    const doLogout = async() => {
        try{
            const respone = await doFetchingLogout(username,getToken)
            const json = await respone.json()

            if(!respone.ok){
                Navigate('*')
            }
            
            alert(json.msg)
            localStorage.clear()
            Navigate('/login')
        }catch(error){
            console.error({msg : 'Error'})
        }
    }

    return(
        <>
        <div className={SideBar ? 'side-nav': 'side-noActive'}>
            <div className={SideBar ? 'side-nav-active'  :  'side-nav-sub'}>
                <div className='side-nav-flex text-center' style={{width: '100%'}}>
                <br></br>
                <h1>SudoAct</h1>
                <Button className='button-side-nav' onClick={() => Navigate(`/dasbord/${username}`)}>Dasbord</Button>
                <Button className='button-side-nav' onClick={() => Navigate(`/whistlist/${username}`)}>Whistlist</Button>
                <Button className='button-side-nav' onClick={() => Navigate(`/notepad/${username}`)}>Notepad</Button>
                <Button className='button-side-nav' onClick={() => Navigate(`/setting/${username}`)}>Setting</Button>
                <Button className='button-side-nav' onClick={() => doLogout()}>Logout</Button>
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