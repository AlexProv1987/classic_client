import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";
import { KnowledgeArticle } from "../ts/interfaces";

interface ArticleFormProps {
  article?: KnowledgeArticle;
}

export function ArticleForm({ article }: ArticleFormProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [articleName, setArticleName] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [useUrl, setUseUrl] = useState(false);
  const [editorReady, setEditorReady] = useState(false);

  // Initialize form state from article prop
  useEffect(() => {
    if (!article) return;
    setArticleName(article.article_name);
    setDocumentUrl(article.document_url || "");
    setVideoUrl(article.video_url || "");
    setUseUrl(!!article.document_url);

    if (editorRef.current && article.article_content) {
      editorRef.current.setContent(article.article_content);
    }
  }, [article]);

  // Re-enable editor content if switching back from URL mode
  useEffect(() => {
    if (!useUrl && article?.article_content && editorReady && editorRef.current) {
      editorRef.current.setContent(article.article_content);
    }
  }, [useUrl, editorReady]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = useUrl ? "" : editorRef.current?.getContent() || "";
    const data = {
      article_name: articleName,
      article_content: content,
      document_url: useUrl ? documentUrl : null,
      video_url: videoUrl || null,
    };
    console.log("Submitting:", data);
    // 🔗 Your API call here
  };

  return (
    <Container className="pt-4">
      <Form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-end mb-3 gap-3">
          <Button type="submit" size='sm' variant="outline-primary">
            Submit
          </Button>
           <Button type="submit" size='sm' variant="outline-primary">
            Preview
          </Button>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Article Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter article name"
            value={articleName}
            onChange={(e) => setArticleName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            id="use-url-switch"
            label="Use Document URL Instead of Editor Content"
            checked={useUrl}
            onChange={() => setUseUrl(!useUrl)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Video URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="https://example.com/video.mp4"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>Document URL</Form.Label>
            <Form.Control
              readOnly={!useUrl}
              type="url"
              placeholder="https://example.com/article.pdf"
              value={documentUrl}
              onChange={(e) => setDocumentUrl(e.target.value)}
            />
          </Form.Group>
        

        <Form.Group className="mb-3">
          <Form.Label>Article Content</Form.Label>
          <Editor
            apiKey="fiob8xacvdtw1lt151pax9prz86sfai077p72ozgplu9zke1"
            onInit={(evt, editor) => {
              editorRef.current = editor;
              setEditorReady(true);
              if (article?.article_content && !useUrl) {
                editor.setContent(article.article_content);
              }
            }}
            initialValue=""
            init={{
              height: 700,
              menubar: 'file edit view insert format tools table',
              plugins: [
                'advlist autolink lists link image charmap preview anchor',
                'searchreplace visualblocks fullscreen',
                'insertdatetime media table paste wordcount'
              ],
              toolbar:
                'undo redo | blocks | bold italic underline strikethrough | ' +
                'bullist numlist outdent indent | link image table | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'removeformat | fullscreen',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
          {useUrl && (
            <Form.Text muted>
              Editor is read-only while using a document URL.
            </Form.Text>
          )}
        </Form.Group>
      </Form>
    </Container>
  );
}
