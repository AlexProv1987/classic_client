import { Button, Card, Container, FloatingLabel, Form } from "react-bootstrap"
import { ArrowLeftCircle, ArrowRightCircle } from "react-bootstrap-icons"
import { axiosBaseURL, getConfig } from "../../../https";
import { useEffect, useState } from "react";
import { RequestNote } from "../ts/interface";
import { BouncingDotsLoader } from "../../../components/bouncy-loader";

interface RecordNotesProps {
    record_type: string,
    record_id: string,
}

export const RecordNotes = (props: RecordNotesProps) => {
    const [notes, setNotes] = useState<RequestNote[] | null>(null)

    useEffect(() => {

        axiosBaseURL
            .get(`request_api/request_notes/get_request_notes/?request_id=${props.record_id}`, getConfig())
            .then((response) => {
                console.log(response.data)
                setNotes(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

    }, [props.record_id]);

    return (
        <Container className="mb-4" style={{ minHeight: '80vh' }}>

            {/*Note Input Form*/}
            <div className="border-bottom mb-2">
                <Form>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Message"
                        className="mb-3"
                    >
                        <Form.Control style={{ height: '100px' }} as="textarea" placeholder="Leave a comment here" />
                    </FloatingLabel>
                    <div className="d-flex justify-content-end mb-2">
                        <Button size="sm" variant="outline-primary">
                            Post
                        </Button>
                    </div>
                </Form>
            </div>

            {/*Notes section*/}
            {
                notes ? (
                    <>
                    {/*Pagination and totalcnt */}
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="badge bg-secondary">{notes.length} Notes</span>

                            <div className="d-flex align-items-center gap-2">
                                <ArrowLeftCircle size={20} style={{ cursor: 'pointer' }} />
                                <ArrowRightCircle size={20} style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                        {/*notes object map*/}
                        {notes.map((note, index) => (
                          <Card key={index} className="mb-2">
                            <Card.Header>{note.note_type} · {note.created}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {note.note_text}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        ))}
                    </>
                    
                ) :
                    (
                        <BouncingDotsLoader
                            vh='20'
                        />
                    )
            }
        </Container>
    )
}