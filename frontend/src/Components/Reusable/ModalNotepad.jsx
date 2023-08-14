import { useState } from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
import { doFetchingNotepad } from '../../utils'
import { useNavigate, useParams } from 'react-router-dom'

export const ModalNotepad = ({show,handleClose}) => {
    const [Title,setTitle] = useState('')
    const [Paragraf, setParagraf] = useState('')
    const getToken = localStorage.getItem('uL_')
    const {username} = useParams()
    const Navigate = useNavigate()

    const doFetch = async (e) => {
        e.preventDefault()
        try{
            const respone = await doFetchingNotepad(username,getToken,Title,Paragraf)
            const json = await respone.json()

            if(!respone.ok){
                Navigate('*')
            }

           alert(json.msg)
           window.location.reload()
        }catch(error){
            console.error(error)
        }
    }
    return(
        <>
         <Modal show={show} onHide={handleClose} fullscreen>
        <Modal.Body className='bg-text'>
            <form onSubmit={doFetch}>
                <div className='md-3' style={{marginBottom: '10px'}}>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Title"
                        name='Title'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className='md-3'>
                <textarea 
                className='textarea-bg'
                placeholder='Paragraf'
                name='paragraf'
                onChange={(e) => setParagraf(e.target.value)}
                >
                </textarea>

                </div>

                <Button type='submit' variant='primary'>Submit</Button>
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