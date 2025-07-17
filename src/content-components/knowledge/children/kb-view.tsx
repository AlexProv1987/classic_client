import { Col, Container, Row } from "react-bootstrap"
import { useState } from "react"
import { KnowledgeArticle } from "../ts/interfaces"
import { ArticleForm } from "./article-form"

export const KBView: React.FC = () => {
    const [selectedKBID, setSelectedKBID] = useState<string | null>(null)
    const [editArticle, setEditArticle] = useState<KnowledgeArticle | null>(null)
    console.log(editArticle)
    return (
        <Container fluid>
            {editArticle ? (
                <ArticleForm
                    article={editArticle}
                />
            ) : (
                <Row className='mt-2'>
                    <Col md={6}>
                        {/**
                        <KnowledgeBaseList
                            set_selected_id={setSelectedKBID}
                        />
                         */}
                    </Col>
                    <Col xs={6}>
                        {/**
                        <ArticleList
                            kbID={selectedKBID}
                            select_to_edit={setEditArticle}
                        />
                           */}
                    </Col>
                </Row>
            )}
        </Container>
    )
}