import Tippy from "@tippyjs/react"
import { Button, Form, Modal, Table } from "react-bootstrap"
import { EyeFill, Eyeglasses } from "react-bootstrap-icons"
import { useEffect, useRef, useState, Dispatch } from "react"
import { axiosBaseURL, getConfig } from "../../../https"
import { sessionManager } from "../../../utils/session-manager"
import { TableCard } from "../../common/table-card"
import { KnowledgeBase } from "../ts/interfaces"
import { kbUtils } from "../utils/kb_utils"

interface KnowledgeBaseListProps {

}

export function KnowledgeBaseList({

}: KnowledgeBaseListProps) {
    const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[] | null>(null)
    const [showModal, setShowModal] = useState(false);
    const pendingActionRef = useRef<'deactivate' | 'activate' | null>(null);
    const pendingKbIdRef = useRef<string | null>(null);

    useEffect(() => {
        const loadKnowledgeBases = async () => {
            try {
                const kbs = await kbUtils.getKnowledgeBases();
                setKnowledgeBases(kbs)
            } catch (err) {
                console.error("Failed to load Knwledge Articles options", err);
            }
        };
        loadKnowledgeBases();
    }, []);

    const handleToggleKB = (kbId: string, newStatus: boolean) => {
        //clear stale data & well want to lock this thread 
        pendingActionRef.current = null
        pendingKbIdRef.current = null
        console.log(`KB ${kbId} is now ${newStatus ? 'active' : 'inactive'}`);
    };

    const handleUpdateKB = (kb: KnowledgeBase) => {
        //..update object in state arr
    }

    return (

        <TableCard
            title='Knowledge Base'
            data={knowledgeBases}
            itemsPerPage={10}
            searchBy={(kb, term) =>
                kb.topic_name.toLowerCase().startsWith(term.toLowerCase())
            }
            renderTable={(data) => (
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Topic</th>
                            <th>Chapter</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((kb, index) => (
                            <tr key={kb.id || index}>
                                <td>{kb.topic_name}</td>
                                <td>{kb.chapter_name}</td>
                                <td>
                                    <Form.Check
                                        type="switch"
                                        checked={kb.active}
                                        onChange={() => {
                                            pendingActionRef.current = kb.active ? 'deactivate' : 'activate';
                                            pendingKbIdRef.current = kb.id;
                                            setShowModal(true);
                                        }}
                                        label=""
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {pendingActionRef.current === 'deactivate' ? 'Inactivate Knowledge Base' : 'Reactivate Knowledge Base'}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {pendingActionRef.current === 'activate' ? (
                                <h6 className='text-warning'>**Reactivating a knowledge base will reactivate all its articles.**</h6>
                            ) : (
                                <h6 className='text-danger'>**Inactivating a knowledge base will inactivate all its articles.**</h6>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant={pendingActionRef.current === 'deactivate' ? 'danger' : 'success'}
                                onClick={() => {
                                    setShowModal(false);
                                    if (pendingKbIdRef.current) {
                                        handleToggleKB(pendingKbIdRef.current, pendingActionRef.current === 'activate');
                                    }
                                }}
                            >
                                Yes, {pendingActionRef.current === 'deactivate' ? 'Inactivate' : 'Reactivate'}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Table>
            )}
        />
    );
}