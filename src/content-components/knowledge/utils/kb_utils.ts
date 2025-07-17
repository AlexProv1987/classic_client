import { MultiSelectOption } from "../../../common/interfaces";
import { axiosBaseURL, getConfig } from "../../../https";
import { sessionManager } from "../../../utils/session-manager";
import { KnowledgeBase } from "../ts/interfaces";

class KBUtils {
    private knowledeBases: KnowledgeBase[] | null = null;
    private loaded: boolean = false;
    private loading: Promise<void> | null = null;

    private async loadKnowledgeBases(): Promise<void> {
        if (this.loaded || this.loading) return this.loading ?? Promise.resolve();

        this.loading = axiosBaseURL
            .get(`knowledge_api/knowledge_base/get_chapter_kbs/?chapter_reltn=${sessionManager.getChapterID()}`, getConfig())
            .then((response) => {
                this.knowledeBases = response.data
                this.loaded = true;
            })
            .catch((err) => {
                console.error("Failed to load contact types", err);
                throw err;
            })
            .finally(() => {
                this.loading = null;
            });

        return this.loading;
    }

    async getKnowledgeBases(): Promise<KnowledgeBase[]> {
        await this.loadKnowledgeBases();
        return this.knowledeBases || [];
    }

}

export const kbUtils = new KBUtils();
