import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {environment} from './../../environments/environment';
import { CreateUserDTO, User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public apiURL = `${environment.API_URL}/api/users`;

  constructor(private http: HttpClient) { }

  create(dto: CreateUserDTO){
    return this.http.post<User>(this.apiURL, dto);
  }

  getAll(){
    return this.http.get<User>(this.apiURL);
  }
}
