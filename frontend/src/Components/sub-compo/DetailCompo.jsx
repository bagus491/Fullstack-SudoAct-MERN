import { Container,Spinner,Form,Button } from "react-bootstrap"
import { GetDetailPad,doUpdateNotepad } from "../../utils"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import '../../style/main.css'


export const DetailCompo = () => {
    const [getSpinner ,setgetSpinner] = useState(false)
    const [getContent, setgetContent] = useState()
    const [Title, setTitle] = useState('')
    const [Paragraf, setParagraf] = useState('')
    const [defTitle, setdefTitle] = useState('')
    const [defParagraf, setdefParagraf] = useState('')

    const getToken = localStorage.getItem('uL_')
    const {username,id} = useParams()

    const Navigate = useNavigate()

    const doFetch = async (e) => {
        e.preventDefault()
        try{
            const ValidTitle = Title !== '' ? Title  : defTitle
            const ValidParagraf = Paragraf !== '' ? Paragraf : defParagraf

            const respone = await doUpdateNotepad(username,getToken,id,ValidTitle,ValidParagraf)
            const json = await respone.json()

            if(!respone.ok){
                Navigate('*')
            }

            if(respone.status === 203){
                alert(json.msg)
            }

            alert(json.msg)
            Navigate(`/notepad/${username}`)

        }catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        const doFetch = async () => {
            try{
                const respone = await GetDetailPad(username,getToken,id)
                const json = await respone.json()

                if(!respone.ok){
                    Navigate('*')
                }

                if(respone.status === 203){
                    setgetContent(false)
                }

                setgetContent(json.data)
                
                json.data.forEach((e) => {
                    setdefTitle(e.Title)
                    setdefParagraf(e.Paragraf)
                })

                setgetSpinner(true)

            }catch(error){
                console.error(error)
            }
        }
        doFetch()
    },[getToken,username,id,Navigate])
  
    return(
        <>
        <Container>
            <div className="bg-paper">
                {
                    getSpinner ?    
                    <div className="sub-bg-paper">
                        {
                            getContent ?    
                            getContent.map((e) => (
                                <div className="sub-bg-Paper-content" key={e._id}>
                                     <Button onClick={() => Navigate(`/notepad/${username}`)} style={{background: 'none', border: 'none'}}>&laquo; BACK</Button>
                                   <form onSubmit={doFetch}>
                                    <div className="md-3">
                                    <Form.Control
                                      type="text"
                                     placeholder="Title"
                                     defaultValue={e.Title}
                                     onChange={(e) => setTitle(e.target.value)}
                                     name="Title"
                                     />
                                    </div>

                                    <div className="md-3">
                                    <textarea 
                                    placeholder="Paragraf"
                                    defaultValue={e.Paragraf}
                                    onChange={(e) => setParagraf(e.target.value)}
                                    name="Paragraf"
                                    >
                                        
                                    </textarea>
                                    </div>
                                    <Button type="submit" className="sub-bg-paper-button">Update</Button>
                                    </form>
                                    <br></br>

                                </div>
                            ))
                            :

                            <h1>NO CONTENT</h1>
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