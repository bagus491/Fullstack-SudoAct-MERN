import { Container,Card,Button,Spinner} from "react-bootstrap"
import '../../style/main.css'
import { GetWhislist,doDeleteWhistlist } from "../../utils"
import { useEffect, useState } from "react"
import { useNavigate, useParams} from 'react-router-dom'
import { ModalWs } from "../Reusable/ModalWs"
import { ModalUpdateWs } from "../Reusable/ModalUpdateWs"


export const CardWs = () => {
    const [whistlist, setwhistlist] = useState()
    const [dataWhistlist, setdataWhistlist] = useState(false)
    const [ClickedCard, setClickedCard] = useState()
    const getToken = localStorage.getItem('uL_')
    const {username} = useParams()
    const [show ,setshow] = useState(false)
    const [showUp,setshowUp] = useState(false)
    const Navigate = useNavigate()

    const handleClose = () => setshow(false)
    const handleOpen = () => setshow(true)
        
    
    const handleCloseUp = () => {
        setClickedCard('undefined ')
        setshowUp(false)
    }

    const handleOpenUp = (e) => {
        setshowUp(true)
        setClickedCard(e)
    }
      
  
    const doFetchDelete = async (id) => {
        const proms = window.confirm('yakin?')
        if(proms){
            try{
                const respone = await doDeleteWhistlist(username,getToken,id)

                alert('success')
                window.location.reload()
            }catch(error){
                console.log(error)
            }

        }else{
            console.warn({msg : 'unxpected'})
        }
    }

    useEffect(() => {
        const doFetch  = async () => {
            try{
                const respone = await GetWhislist(username,getToken)
                const json = await respone.json()

                if(!respone.ok){
                   Navigate('*')
                }

                if(respone.status === 203){
                    setdataWhistlist(false)
                }else{
                    setdataWhistlist(true)
                    setwhistlist(json.data)
                }

            }catch(error){
                console.error({msg : 'Error'})
            }
        }
        doFetch()
    },[getToken,username,Navigate])
    return(
        <>
        <Container>
        <div className="Whistlist-form">
         <h1>AddCard</h1>
         <div className="whistlist-modal">
         <Button className="button-modal" onClick={() => handleOpen()}>Form</Button>
         </div>
         <ModalWs show={show} handleClose={handleClose} />
         <ModalUpdateWs showUp={showUp} handleCloseUp={handleCloseUp} />
        </div>
         
        <div className="whistlist-box">
        {
            dataWhistlist ? 
            <div className="whistlist-card">
                {
                    whistlist ? 
                    whistlist.map((e) => (
                        <Card style={{ width: '300px', height: '400px', marginLeft: '10px' }} key={e._id} className="card">
                     <Card.Img variant="top" src={e.ImagePath}  style={{width: '300px' , height: '200px'}}/>
                    <Card.Body>
                     <Card.Title>Title: {e.Title}</Card.Title>
                     <Card.Text>Count: {e.Count}</Card.Text>
                     <Card.Text>
                        Desc : {e.Desc}
                 </Card.Text>
                <Button variant="primary" onClick={() => handleOpenUp(e)}>Update</Button>
                <Button variant="danger" style={{marginLeft: '10px'}} onClick={() => doFetchDelete(e._id)}>Delete</Button>
                <ModalUpdateWs showUp={showUp} handleCloseUp={() => handleCloseUp()} data={ClickedCard}/>
                </Card.Body>
             </Card>
                    )) 
                    :
                <div>
                    <h1>No Card</h1>
                </div>
                 
                }
            </div>
            : 
            <div className="Page-Spinner" style={{height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', }}>
            <Spinner animation="grow" variant="info" />
          </div> 
        }
        </div>
        </Container>
        </>
    )
}