export { };

class SessionManager {
  private key = 'session';
  private _session: Record<string, any> | null = null;

  //lazy load since this instance is created when our app loads and before session creation
  //this should always exist post login but just in case
  private loadSession() {
    if (this._session !== null) return;
    try {
      const raw = sessionStorage.getItem(this.key);
      this._session = raw ? JSON.parse(raw) : null;
    } catch {
      this._session = null;
    }
  }

  getSession(): Record<string, any> | null {
    this.loadSession();
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

  getFullfillmentRoles(): { [key: string]: any }[] {
    return this.getSession()?.chapter_data.fullfillment_roles || [];
  }

  hasFullfillmentRole(key: string): boolean {
    const roleArr = this.getFullfillmentRoles() as { [key: string]: any }[];
    return roleArr.some(role => role.fullfilemt_role_type === key);
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
