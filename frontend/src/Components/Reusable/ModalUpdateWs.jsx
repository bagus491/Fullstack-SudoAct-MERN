import { useEffect, useState } from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { doUpdateWhistlist } from '../../utils'

export const ModalUpdateWs = ({showUp,handleCloseUp, data}) => {
    const [Title, setTitle] = useState('')
    const [DefTitle, setDefTitle] = useState('')
    const [Avatar, setAvatar] = useState()
    const [Count, setCount] = useState('')
    const [DefCount, setDefCount] = useState('')
    const [Desc, setDesc] = useState('')
    const [DefDesc, setDefDesc] = useState('')

    const getToken = localStorage.getItem('uL_')
    const {username} = useParams()
    const Navigate = useNavigate()
    
    useEffect(() => {
      if(data){
        setDefTitle(data.Title)
        setDefCount(data.Count)
        setDefDesc(data.Desc)
      }
    },[Navigate,data])

    const doFetch = async (e) => {
        e.preventDefault()
        try{  
              const validTitle = Title !== '' ?  Title   : DefTitle;
              const validCount = Count !== '' ?  Count   : DefCount;
              const validDesc  = Desc  !== '' ?  Desc    : DefDesc;

                const respone = await doUpdateWhistlist(username,data._id,getToken,validTitle,Avatar,validCount,validDesc)
                if(!respone.ok){
                    Navigate('*')
                }

                alert('success')
                window.location.reload()
        }catch(error){
            console.error(error)
        }
    }
    
    return(
        <>
         <Modal show={showUp} onHide={handleCloseUp}>
        <Modal.Header closeButton>
          <Modal.Title>Whistlist Update</Modal.Title>
        </Modal.Header>
            <Modal.Body>
            <form onSubmit={doFetch}>

            <div className="md-3" style={{marginBottom: '20px'}}>
            <Form.Control
            type="text"
            placeholder="Title"
            name="Title"
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={DefTitle}
          />
            </div>

            <div className="md-3" style={{marginBottom: '20px'}}>
            <Form.Control
            type="file"
            placeholder="Foto Whist"
            name="Avatar"
            onChange={(e) => setAvatar(e.target.files)}
            required
          />
            </div>

            <div className="md-3" style={{marginBottom: '20px'}}>
            <Form.Control
            type="number"
            placeholder="Count"
            name="Count"
            onChange={(e) => setCount(e.target.value)}
            defaultValue={DefCount}
          />
            </div>

            <div className="md-3" style={{marginBottom: '20px'}}>
            <Form.Control
            type="text"
            placeholder="Description"
            name="Desc"
            onChange={(e) => setDesc(e.target.value)}
            defaultValue={DefDesc}
          />
            </div>

            <Button type="submit">Submit</Button>
            </form>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUp}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}