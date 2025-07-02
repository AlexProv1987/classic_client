export {}; 

class SessionManager {
  private key = 'session';
  private _session: Record<string, any> | null = null;

  //lazy load since this instance is created when our app loads and before session creation
  private loadSession() {
    if (this._session !== null) return; // already loaded
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

  getUser(): Record<string, any> | null {
    return this.getSession()?.user || null;
  }

  setSession(data: Record<string, any>) {
    this._session = data;
    sessionStorage.setItem(this.key, JSON.stringify(data));
  }

  clear() {
    this._session = null;
    sessionStorage.removeItem(this.key);
  }

  hasSession(): boolean {
    return !!this.getToken();
  }
}


export const sessionManager = new SessionManager();
