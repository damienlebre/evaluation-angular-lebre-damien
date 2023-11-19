import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private internalToken$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(
    undefined
  );

  token$ = this.internalToken$.asObservable();

  private baseUrlApi: string = environment.API_URL;
  private ressourceName: string = 'auth';

  private fullBaseUrlApi: string;

  constructor() {
    this.fullBaseUrlApi = `${this.baseUrlApi}/${this.ressourceName}`;
  }

  get token(): string | undefined {
    return this.internalToken$.value;
  }

  signIn(email: string, password: string, keepConnection: boolean): Promise<void | undefined> {
    return new Promise((resolve, reject) => {
      if (email === 'admin@admin.fr' && password === 'P@ssw0rd2023') {
        if (keepConnection) {
          localStorage.setItem('token', 'MonsterHunt.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.SECRETJWTTOKEN');
        }
        this.internalToken$.next('MonsterHunt.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.SECRETJWTTOKEN');
        resolve();
      } else {
        reject(Error('bad credentials !'));
      }
    });
  }


  signOut(): void {
    // Simulate deletion of token from localStorage
    localStorage.removeItem('token');
    // Simulate updating the BehaviorSubject to indicate that the user is logged out
    this.internalToken$.next(undefined);
  }
}
