import { useEffect, useState } from "react";
import { axiosBaseURL, getConfig } from "../../https";
import { sessionManager } from "../../utils/session-manager";
import { BouncingDotsLoader } from "../../components/bouncy-loader";

export const Home = () => {
    const [homeContent, setHomeContent] = useState<string | null>(null)
    const [alertMsg, setAlertMsg] = useState<string>('')

    useEffect(() => {
        axiosBaseURL
            .get(`organization_api/news_letter/member_news_letter/?chapter_id=${sessionManager.getChapterID()}`,
                getConfig())
            .then((response) => {
                setHomeContent(response.data.news_letter)
            })
            .catch((error) => {
                setAlertMsg('There was an issue retrieving your content')
            }).finally(() => {
                //..
            });
    }, []);

    return (
        <div>
            {alertMsg &&
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {alertMsg}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }
            {homeContent ? (<iframe
                title="GoogleDoc"
                sandbox=""
                style={{ border: 'none', width: '100%', height: '100vh',}}
                srcDoc={homeContent} />
            ) : (
                !alertMsg && <BouncingDotsLoader />
            )}
        </div>
    )
}

/*
since we are coming from gDocs well say safe enough - hope that doesnt bite.
  const cleanHTML = DOMPurify.sanitize(response.data.news_letter, {
      USE_PROFILES: { html: true },
      ALLOWED_ATTR: ['class', 'style'],
  });
   */