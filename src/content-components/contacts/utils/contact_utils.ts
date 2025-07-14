import { MultiSelectOption } from "../../../common/interfaces";
import { axiosBaseURL, getConfig } from "../../../https";

class ContactUtils {
    private contactOptions: MultiSelectOption[] | null = null;
    private loaded: boolean = false;
    private loading: Promise<void> | null = null;

    private async loadOptions(): Promise<void> {
        if (this.loaded || this.loading) return this.loading ?? Promise.resolve();

        this.loading = axiosBaseURL
            .get('contact_api/chapter_contacts/contact_types/', getConfig())
            .then((response) => {
                this.contactOptions = this.mapContactOpts(response.data)
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

    async getContactTypes(): Promise<MultiSelectOption[]> {
        await this.loadOptions();
        return this.contactOptions || [];
    }

    mapContactOpts(arr: any[]): MultiSelectOption[] {
        return arr.map((f: any): MultiSelectOption => ({
            value: f.type_value,
            label: f.type
        }));
    }
}

export const contactUtils = new ContactUtils();
