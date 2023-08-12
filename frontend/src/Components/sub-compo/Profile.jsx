import { Container,Button} from "react-bootstrap"
import '../../style/main.css'
import {useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { GetProfile } from "../../utils"
import { ModalProfile } from "../Reusable/ModalProfile"

export const Profile = () => {
    const [Profile, setProfile] = useState(false)
    const [dataProfile, setdataProfile] = useState()
    const [show ,setshow] = useState(false)
    const {username} = useParams()
    const getToken = localStorage.getItem('uL_')
    const Navigate = useNavigate()

    //handleModal
    const handleClose = () => setshow(false);
    const handleOpen = () => setshow(true)

    useEffect(() => {
        const doFetching = async () => {
            try{
                const respone = await GetProfile(username,getToken)
                const json = await respone.json()
                if(!respone.ok){
                    Navigate('*')
                }

                if(respone.status === 203){
                    setProfile(false)
                }else{
                    setdataProfile(json.data)
                    setProfile(true)
                }


            }catch(err){
                console.error({msg : 'Error'})
            }
        }
        doFetching()
    },[username,getToken,Navigate])
    return(
        <>
        <Container>
            <div className="Profile-Box">
           {
            Profile ?  
            <div className="Profile-Valid">
              {
                dataProfile ?  
                dataProfile.map((e) => (
                    <div key={e.Desc} className="Profile-valid-data">
                     <div className="Profile-valid-img">
                     <img src={e.ImagePath} alt="foto"></img>
                     </div>
                     <div className="Profile-valid-text">
                    <h5>Name: {e.decodedUser}</h5>
                    <h6>Job: {e.MyJob}</h6>
                    <p>Desc: {e.Desc}</p>
                     </div>
                    
                    </div>
                ))
                :
                <div></div>
              }
            </div>
            :
            <div className="Profile-Empty">
              <h1>Welcome , {username}</h1>
              <Button className="profile-btn-handle" onClick={() => handleOpen()}>AddProfile</Button>
              <ModalProfile show={show} handleClose={handleClose} />
            </div>
           }
            </div>
        </Container>
        </>
    )
}