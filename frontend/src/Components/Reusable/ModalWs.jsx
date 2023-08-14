import { useState } from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { doFetchWhistlist } from '../../utils'

export const ModalWs = ({show,handleClose}) => {
    const [Title, setTitle] = useState('')
    const [Avatar, setAvatar] = useState()
    const [Count, setCount] = useState('')
    const [Desc, setDesc] = useState('')

    const getToken = localStorage.getItem('uL_')
    const {username} = useParams()
    const Navigate = useNavigate()

    const doFetch = async (e) => {
        e.preventDefault()
        try{
                const respone = await doFetchWhistlist(username,getToken,Title,Avatar,Count,Desc)
                const json = await respone.json()
                
                if(!respone.ok){
                    Navigate('*')
                }

                alert(json.msg)
                window.location.reload()
        }catch(error){
            console.error({msg : 'Error'})
        }
    }
    
    return(
        <>
         <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Whistlist Form</Modal.Title>
        </Modal.Header>
            <Modal.Body>
            <form onSubmit={doFetch}>

            <div className="md-3" style={{marginBottom: '20px'}}>
            <Form.Control
            required
            type="text"
            placeholder="Title"
            name="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
            </div>

            <div className="md-3" style={{marginBottom: '20px'}}>
            <Form.Control
            required
            type="file"
            placeholder="Foto Whist"
            name="Avatar"
            onChange={(e) => setAvatar(e.target.files)}
          />
            </div>

            <div className="md-3" style={{marginBottom: '20px'}}>
            <Form.Control
            required
            type="number"
            placeholder="Count"
            name="Count"
            onChange={(e) => setCount(e.target.value)}
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