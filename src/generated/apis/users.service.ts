import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetUsersResponseInterface } from '../models/getUsersResponse.interface';
import { GetUserNamesResponseInterface } from '../models/getUserNamesResponse.interface';
import { GetRolesResponseInterface } from '../models/getRolesResponse.interface';
import { GetEmailsResponseInterface } from '../models/getEmailsResponse.interface';
import { UserInterface } from '../models/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUsers(urlParams: string): Observable<GetUsersResponseInterface> {
    return this.http.get<GetUsersResponseInterface>(this.apiUrl + urlParams)
  }

  getUserNames(): Observable<GetUserNamesResponseInterface> {
    return this.http.get<GetUserNamesResponseInterface>(this.apiUrl + '?select=username&skip=0&limit=208')
  }

  getRoles(): Observable<GetRolesResponseInterface> {
    return this.http.get<GetRolesResponseInterface>(this.apiUrl + '?select=role&skip=0&limit=208')
  }

  getEmails(): Observable<GetEmailsResponseInterface> {
    return this.http.get<GetEmailsResponseInterface>(this.apiUrl + '?select=email&skip=0&limit=208')
  }

  getUserDetails(userId: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(this.apiUrl + `/${userId}`);
  }

  updateUserDetails(userId: string,userDetails: UserInterface):Observable<UserInterface> {
    return this.http.put<UserInterface>(this.apiUrl + `/${userId}`, userDetails);
  }
}
