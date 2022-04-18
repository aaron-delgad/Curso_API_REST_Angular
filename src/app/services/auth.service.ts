import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { environment} from './../../environments/environment';
import { tap } from 'rxjs/operators';
import { Auth } from '../models/auth.model';
import { User } from '../models/users.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiURL = `${environment.API_URL}/api/auth`;

  constructor(private http: HttpClient,
    private tokenService: TokenService) { }

  login(email: string, password: string){
    return this.http.post<Auth>(`${this.apiURL}/login`,{email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  getProfile(){
    return this.http.get<User>(`${this.apiURL}/profile`,{
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    })
  }
}
