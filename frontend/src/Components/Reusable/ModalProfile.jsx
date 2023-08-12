import { useState } from "react"
import { Button,Modal,Form} from "react-bootstrap"
import { doFetchingProfile } from "../../utils"
import { useNavigate, useParams } from "react-router-dom"

export const ModalProfile = ({show,handleClose}) => {
    const [Profile, setProfile] = useState()
    const [MyJob, setMyJob] = useState('')
    const [Desc, setDesc] = useState('')
    const {username} = useParams()
    const Navigate = useNavigate()
    const getToken = localStorage.getItem('uL_')

    const doFetch = async (e) => {
        e.preventDefault()
        try{
            const respone = await doFetchingProfile(username,Profile,MyJob,Desc,getToken)
            const json = await respone.json()
            if(!respone.ok){
                Navigate('*')
            }
            alert(json.msg)
            window.location.reload()
        }catch(err){
            console.error({msg : 'Error'})
        }
    }


    return(
        <>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={doFetch}>
            <div className="md-3" style={{marginBottom: '20px'}}>
            <Form.Control
            required
            type="file"
            placeholder="Foto Profile"
            name="Profile"
            onChange={(e) => setProfile(e.target.files)}
          />
            </div>

            <div className="md-3" style={{marginBottom: '20px'}}>
            <Form.Control
            required
            type="text"
            placeholder="Your Job"
            name="MyJob"
            onChange={(e) => setMyJob(e.target.value)}
          />
            </div>

            <div className="md-3" style={{marginBottom: '20px'}}>
            <Form.Control
            required
            type="text"
            placeholder="Description"
            name="Desc"
            onChange={(e) => setDesc(e.target.value)}
          />
            </div>

            <Button type="submit">Submit</Button>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}