const storagekey = 'walid=&éé"';
export function setJwt(token: string): void {
    localStorage.setItem(storagekey, token)
}
export function getJwt(): string | null {
    return localStorage.getItem(storagekey);
}
