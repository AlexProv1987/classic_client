import Tippy from "@tippyjs/react"
import { Button, Card, Col, Container, Form, Modal, Row, Table } from "react-bootstrap"
import { EyeFill, Eyeglasses, FileText, Pencil } from "react-bootstrap-icons"
import { useEffect, useRef, useState } from "react"
import { axiosBaseURL, getConfig } from "../../../https"
import { TableCard } from "../../common/table-card"
import { KnowledgeArticle, KnowledgeBase } from "../ts/interfaces"
import { NoUserSelected } from "../../common/empty-selected"
import { Messages } from "../../../config"

interface ArticleListProps {

}

export function ArticleList({

}: ArticleListProps) {
    const [knowledgeArticles, setKnowledgeArticles] = useState<KnowledgeBase[] | null>(null)
    const [showModal, setShowModal] = useState(false);
    const pendingActionRef = useRef<'deactivate' | 'activate' | null>(null);
    const pendingArticleIDRef = useRef<string | null>(null);

    useEffect(() => {
        axiosBaseURL
            .get(`knowledge_api/knowledge_articles/get_chapter_articles/?kb=KBddcfa4de2702420a87ddd258b2527614`, getConfig())
            .then((response) => {
                setKnowledgeArticles(response.data)
            })
            .catch((error) => {
                console.error(error);
            })
    }, []);

    const handleToggleArticle = (kbId: string, newStatus: boolean) => {
        //clear stale data & well want to lock this thread 
        pendingActionRef.current = null
        pendingArticleIDRef.current = null
        console.log(`KB ${kbId} is now ${newStatus ? 'active' : 'inactive'}`);
    };

    const handleUpdateArticle = (kb: KnowledgeBase) => {
        //..update object in state arr
    }

    return (

        <TableCard
            title='Knowledge Article'
            data={knowledgeArticles}
            itemsPerPage={10}
            searchBy={(article, term) =>
                article.article_name.toLowerCase().startsWith(term.toLowerCase())
            }
            renderTable={(data) => (
                <>
                    <div className="d-flex justify-content-start align-items-center p-2">
                        <Col md={4} className="d-flex justify-content-start">
                            <Form.Select>
                                <option value='none'>--Select Knowledge Base--</option>
                            </Form.Select>
                        </Col>
                    </div>
                    <Table bordered hover responsive>
                        <thead>
                            <tr>
                                <th><Pencil /></th>
                                <th>Article</th>
                                <th>Knowledge Base</th>
                                <th>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((article, index) => (
                                <tr key={article.id || index}>
                                    <Tippy content="Edit Article" delay={[250, 100]} placement="bottom">
                                        <td
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => { }}
                                        >
                                            <Pencil />
                                        </td>
                                    </Tippy>
                                    <td>{article.article_name}</td>
                                    <td>{article.knowledge_base.topic_name}</td>
                                    <td>
                                        <Form.Check
                                            type="switch"
                                            checked={article.active}
                                            onChange={() => {
                                                pendingActionRef.current = article.active ? 'deactivate' : 'activate';
                                                pendingArticleIDRef.current = article.id;
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
                                    <h6 className='text-warning'>{Messages.INACTIVATE_ARTICLE}</h6>
                                ) : (
                                    <h6 className='text-danger'>{Messages.REACTIVATE_ARTICLE}</h6>
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
                                        if (pendingArticleIDRef.current) {
                                            handleToggleArticle(pendingArticleIDRef.current, pendingActionRef.current === 'activate');
                                        }
                                    }}
                                >
                                    Yes, {pendingActionRef.current === 'deactivate' ? 'Inactivate' : 'Reactivate'}
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Table>
                </>
            )}
        />
    );
}