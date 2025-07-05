import { Alert, Button, Card, Container, FloatingLabel, Form } from "react-bootstrap"
import { ArrowLeftCircle, ArrowRightCircle, PersonCheck, PersonFill } from "react-bootstrap-icons"
import { axiosBaseURL, getConfig } from "../../../https";
import { useEffect, useState } from "react";
import { RequestNote } from "../ts/interface";
import { BouncingDotsLoader } from "../../../components/bouncy-loader";
import Tippy from "@tippyjs/react";

interface RecordNotesProps {
    record_type: string,
    record_id: string,
    note: string,
    note_setter: React.Dispatch<React.SetStateAction<string>>,
    parent_note: RequestNote | null,
}

export const RecordNotes = (props: RecordNotesProps) => {
    const [notes, setNotes] = useState<RequestNote[] | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [alertMsg, setAlertMsg] = useState<string | null>(null)
    const notesPerPage = 5; // You can adjust this as needed

    // Calculate indices
    const totalNotes = notes?.length || 0;
    const totalPages = Math.ceil(totalNotes / notesPerPage);
    const startIndex = (currentPage - 1) * notesPerPage;
    const endIndex = Math.min(startIndex + notesPerPage, totalNotes);
    const currentNotes = notes?.slice(startIndex, endIndex) || [];

    useEffect(() => {
        axiosBaseURL
            .get(`request_api/request_notes/get_request_notes/?request_id=${props.record_id}`, getConfig())
            .then((response) => {
                setNotes(response.data);
            })
            .catch((error) => {
                setNotes([])
                setAlertMsg('Failed to retrieve request notes.')
            });

    }, [props.record_id]);

    useEffect(() => {
        if (props.parent_note) {
            setNotes([props.parent_note, ...(notes || [])])
            props.note_setter('')
        }
    }, [props.parent_note]);

    const postNote = () => {
        axiosBaseURL.post("request_api/request_notes/create_note/", {
            note_type: 'fullfiller', //evaluate this - manager v fullfiller etc
            note_text: props.note,
            request_id: props.record_id
        }, getConfig())
            .then(function (response) {
                setNotes([response.data, ...(notes || [])])
                setCurrentPage(1)
            }).catch(function (error) {
                setAlertMsg('Failed to save request note.')
            }).finally(function () {
                props.note_setter('')
            });
    }

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <Container className="mb-4" style={{ minHeight: '80vh' }}>
            {alertMsg &&
                <Alert
                    dismissible
                    variant='danger'
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        zIndex: 1060,
                        borderRadius: 0,
                    }}
                >
                    {alertMsg}
                </Alert>
            }
            {/*note form*/}
            <div className="border-bottom mb-2">
                <Form>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Message"
                        className="mb-3"
                    >
                        <Form.Control
                            value={props.note}
                            onChange={(e) => props.note_setter(e.target.value)}
                            style={{ height: '100px' }}
                            as="textarea"
                            placeholder="Leave a comment here"
                        />
                    </FloatingLabel>
                    <div className="d-flex justify-content-end mb-2">
                        <Tippy content="Send your note" delay={[250, 100]} placement="bottom">
                            <Button onClick={() => postNote()} size="sm" variant="outline-primary">
                                Post
                            </Button>
                        </Tippy>
                    </div>
                </Form>
            </div>

            {/*notes section*/}
            {
                notes ? (
                    <>
                        {/* paginatio and cnts */}
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="badge bg-secondary">
                                {totalNotes === 0 ? 0 : startIndex + 1} - {endIndex} of {totalNotes}
                            </span>

                            <div className="d-flex align-items-center gap-2">
                                <Tippy content="Previous" delay={[250, 100]} placement="bottom">
                                    <ArrowLeftCircle
                                        className="icon-no-focus"
                                        size={20}
                                        style={{ cursor: currentPage > 1 ? 'pointer' : 'not-allowed', opacity: currentPage > 1 ? 1 : 0.5 }}
                                        onClick={prevPage}
                                    />
                                </Tippy>
                                <Tippy content="Next" delay={[250, 100]} placement="bottom">
                                    <ArrowRightCircle
                                        className="icon-no-focus"
                                        size={20}
                                        style={{ cursor: currentPage < totalPages ? 'pointer' : 'not-allowed', opacity: currentPage < totalPages ? 1 : 0.5 }}
                                        onClick={nextPage}
                                    />
                                </Tippy>
                            </div>
                        </div>
                        {/*notes object map*/}
                        {currentNotes.map((note, index) => (
                            <Card key={index} className="mb-2">
                                <Card.Header>
                                    {(note.note_type === 'fullfiller' || note.note_type === 'manager') ? <PersonCheck size={24} color='green' /> : <PersonFill size={24} color='blue' />} · {(() => {
                                        const [year, month, day] = note.created.split('T')[0].split('-');
                                        return `${parseInt(month)}/${parseInt(day)}/${year}`;
                                    })()}
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>{note.note_text}</Card.Text>
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