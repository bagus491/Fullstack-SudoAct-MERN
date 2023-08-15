import { Container,Card,Button } from "react-bootstrap"
import '../../style/main.css'
import { useState } from "react"
import { ModalUpdateProfile } from "../Reusable/ModalUpdateProfile"
import { doDeleteUser,doDeleteProfile } from "../../utils"
import { useNavigate, useParams } from "react-router-dom"

export const CardSetting = () => {
    const [showUprofile, setshowUprofile] = useState(false)
    const getToken = localStorage.getItem('uL_')
    const {username} = useParams()
    const Navigate = useNavigate()
 
    const handleCloseProfile = () => setshowUprofile(false)
    const handleOpenProfile = () => setshowUprofile(true)

    const deleteUser = async () => {
        const confirmP = window.confirm('yakin?')
        if(confirmP){
            try{
                const respone = await doDeleteUser(username,getToken)

                if(!respone){
                    Navigate('*')
                }

                alert('success')
                localStorage.clear()
                Navigate(`/login`)
            }catch(error){
                console.error(error)
            }
        }else{
            console.warn({msg : 'Not Authorization'})
        }
     
    }

    const deleteProfile = async () => {
        const confirmP = window.confirm('yakin?')
        if(confirmP){
            try{
                const respone = await doDeleteProfile(username,getToken)

                if(!respone){
                    Navigate('*')
                }

                alert('success')
                window.location.reload()
            }catch(error){
                console.error(error)
            }
        }else{
            console.warn({msg : 'Not Authorization'})
        }
     
    }
    
    return(
        <>
        <Container>
        <div className="Setting-box">
        <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Setting List</Card.Title>
        <div className="sub-button">
            <Button variant="danger" className="btn-sub-setting" style={{marginLeft: '2px'}} onClick={() => deleteUser()}>Delete User</Button>
            <Button className="btn-sub-setting"  onClick={() => handleOpenProfile()}>Update Profile</Button>
            <Button variant="danger" className="btn-sub-setting" onClick={() => deleteProfile()}>Delete Profile</Button>
        </div>
      </Card.Body>
    </Card>
        </div>
        <ModalUpdateProfile showUser={showUprofile} handleCloseProfile={handleCloseProfile}/>
        </Container>
        </>
    )
}