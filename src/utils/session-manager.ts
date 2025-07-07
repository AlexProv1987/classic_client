import { Fullfiller } from "../content-components/requests/ts/interface";

export { };

class SessionManager {
  private key = 'session';
  private _session: Record<string, any> | null = null;

  //lazy load since this instance is created when our app loads and before session creation
  //this should always exist post login but just in case
  private _loadSession() {
    if (this._session !== null) return;
    try {
      const raw = sessionStorage.getItem(this.key);
      this._session = raw ? JSON.parse(raw) : null;
    } catch {
      this._session = null;
    }
  }

  getSession(): Record<string, any> | null {
    this._loadSession();
    return this._session;
  }

  getToken(): string | null {
    return this.getSession()?.token || null;
  }

  getChapterID(): string | null {
    return this.getSession()?.chapter_data?.chapter?.chapter_reltn
  }

  getMemberID(): string | null {
    return this.getSession()?.chapter_data?.chapter?.id
  }

  getUser(): Record<string, any> | null {
    return this.getSession()?.user || null;
  }

  getGroups(): string[] {
    return this.getSession()?.user?.groups || []
  }

  getFullfillmentRoles(): Fullfiller[] {
    return this.getSession()?.chapter_data.fullfillment_roles || [];
  }

  getFullfillerIDbyType(roleType: string): string | null {
    const match = this.getFullfillmentRoles().find(f => f.fullfilemt_role_type === roleType);
    return match ? match.id : null;
  }

  hasGroupExactly(key:string):boolean {
      return this.getSession()?.user?.groups.includes(key) || false
  }

  hasFullfillmentRole(key: string): boolean {
    const roleArr: Fullfiller[] = this.getFullfillmentRoles();;
    return roleArr.some(role => role.fullfilemt_role_type === key);
  }

  getLogo(): string {
    return this.getSession()?.chapter_data?.chapter?.chapter_logo ||
      this.getSession()?.organization?.org_logo || ''
  }

  hasSession(): boolean {
    return !!this.getToken();
  }

  setSession(data: Record<string, any>) {
    this._session = data;
  }

  clear() {
    this._session = null;
    sessionStorage.removeItem(this.key);
  }

}


export const sessionManager = new SessionManager();
