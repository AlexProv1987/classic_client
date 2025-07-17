import { useState } from "react";
import { KnowledgeSubNav } from "./children/sub-nav";
import { KnowledgeContent } from "./ts/types";
import { Container } from "react-bootstrap";
import { KnowledgeBaseList } from "./children/kb-list";
import { ArticleForm } from "./children/article-form";
import { ArticleList } from "./children/article-list";



export const Knowledge: React.FC = () => {
    const [content, setContent] = useState<KnowledgeContent>('kb')

    const renderView = (opt: KnowledgeContent) => {
        switch (opt) {
            case 'add_knowledge_base_article':
                return <ArticleForm
                />
            case 'kb':
                return <KnowledgeBaseList />
            case 'kb_articles':
                return <ArticleList />
            default:
                return null;
        }
    }

    return (
        <>
            <KnowledgeSubNav
                filter_setter={setContent}
            />
            <Container fluid className="pt-4">
                {renderView(content)}
            </Container>
        </>

    )
}