import { MultiSelectOption } from "../../../common/interfaces";
import { axiosBaseURL, getConfig } from "../../../https";
import { sessionManager } from "../../../utils/session-manager";

class MemberPermissionUtil {
    private groupOptions: MultiSelectOption[] | null = null;
    private fulfillerOptions: MultiSelectOption[] | null = null;
    private loaded: boolean = false;
    private loading: Promise<void> | null = null;

    private async loadOptions(): Promise<void> {
        if (this.loaded || this.loading) return this.loading ?? Promise.resolve();

        this.loading = axiosBaseURL
            .get('organization_api/member_management/chapter_role_opts/', getConfig())
            .then((response) => {
                const { group_options, available_fullfillment_types } = response.data;
                this.groupOptions = this.mapGroupOpts(group_options)
                this.fulfillerOptions = this.mapFullfillerOpts(available_fullfillment_types)
                this.loaded = true;
            })
            .catch((err) => {
                console.error("Failed to load member permissions", err);
                throw err;
            })
            .finally(() => {
                this.loading = null;
            });

        return this.loading;
    }

    async getGroupOptions(): Promise<MultiSelectOption[]> {
        await this.loadOptions();
        return this.groupOptions || [];
    }

    async getFulfillerOptions(): Promise<MultiSelectOption[]> {
        await this.loadOptions();
        return this.fulfillerOptions || [];
    }

    mapGroupOpts(arr: any[]): MultiSelectOption[] {
        return arr.filter((g: any) => {
            if (g.name === 'chapter_manager' && sessionManager.hasGroupExactly('chapter_manager')) {
                return false;
            }
            if (g.name === 'chapter_member' || g.name === 'report_view') {
                return false;
            }
            return true;
        }).map((g: any): MultiSelectOption => ({
            value: g.name,
            label: this.snakeToTitle(g.name),
        }));
    }

    mapFullfillerOpts(arr: any[]): MultiSelectOption[] {
        return arr.map((f: any): MultiSelectOption => ({
            value: f.type_value,
            label: f.type
        }));
    }

    mapFullfillmentObjectToOpts(arr:any[]):MultiSelectOption[]{
        return arr.map((f:any):MultiSelectOption =>({
            value:f.fullfilemt_role_type,
            label:f.fullfillment_role
        }))
    }
    snakeToTitle = (text: string): string =>
        text
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');


    invalidateCache() {
        this.loaded = false;
        this.groupOptions = null;
        this.fulfillerOptions = null;
    }
}

export const memberPermissionUtil = new MemberPermissionUtil();
