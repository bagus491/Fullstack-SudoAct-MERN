import { Container,Button,Card,Spinner } from "react-bootstrap"
import '../../style/main.css'
import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import { GetNotepad } from "../../utils"
import { useNavigate } from "react-router-dom"
import { ModalNotepad } from "../Reusable/ModalNotepad"

export const CardNote = () => {
    const [getContent, setgetContent] = useState()
    const [getSpinner,setgetSpinner] = useState(true)
    const [show, setshow] = useState(false)
    const getToken = localStorage.getItem('uL_')
    const {username} = useParams()
    const Navigate = useNavigate()

    const handleClose = () => setshow(false)
    const handleOpen = () => setshow(true)

    useEffect(() => {
        const doFetch = async() => {
            try{
                const respone = await GetNotepad(username,getToken)
                const json = await respone.json()

                if(!respone.ok){
                    Navigate('*')
                }

                if(respone.status === 203){
                    setgetContent(false)
                }

                setgetContent(json.data)
                setgetSpinner(false)
            }catch(error){
                console.error(error)
            }
        }
        doFetch()
    },[Navigate,username,getToken])
    return(
        <>
        <Container>
        <div className="Notepad-Button">
            <Button style={{marginTop: '20px', background: 'white', border: '1px solid #03c988', color: 'black'}} onClick={() => handleOpen()}>Add Note</Button>
            <ModalNotepad  show={show} handleClose={handleClose}/>
        </div>

        <div className="Notepad-box">
         {
            getSpinner ?  
            <div className="Page-Spinner" style={{height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', }}>
            <Spinner animation="grow" variant="info" />
          </div> 
            : 
            
            <div style={{marginTop: '50px', display:'flex',flexWrap: 'wrap'}} className="box-card">
                {
                    getContent ?  
                    getContent.map((e) => (
                        <Card key={e._id} className="card-print">
                        <Card.Body style={{overflow: 'hidden'}}>
                          <Card.Title>{e.Title}</Card.Title>
                          <Card.Text>
                          {e.Paragraf}
                          </Card.Text>
                          <Button style={{background: '#03c988', border: 'none'}}>Read More</Button>
                        </Card.Body>
                      </Card>
                    ))
                    : <h1>No Content</h1>
                }
            </div>
         }
        </div>
        </Container>
        </>
    )
}