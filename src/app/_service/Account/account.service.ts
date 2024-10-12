import {Injectable} from '@angular/core';
import {BehaviorSubject, map, take} from "rxjs";
import {User} from "../../_model/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserProfile} from "../../_model/User/UserProfile";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'Account/register', model).pipe(
      map(user => {
        return user;
      })
    )
  }

  login(model: any) {
    return this.http.post<any>(this.baseUrl + 'Account/login', model).pipe(
      map(response => {
        if (response && response.statusCode === 200) {
          const email = response.message;

          this.setEmail(email);

          return email;
        }
        return null;
      })
    );
  }

  verifyOtp(otpCode: string) {
    const email = sessionStorage.getItem('email');

    // Create a model that includes both the email and the OTP code
    const model = {
      email: email,
      otp: otpCode
    };

    return this.http.post<User>(this.baseUrl + 'Account/verify-otp', model).pipe(map(user => {
      if (user) {
        this.setCurrentUser(user)
      }
      return user;
    }))
  }

  signout() {
    localStorage.removeItem('user')
  }

  GetAccountDetail() {
    return this.http.get<UserProfile>(this.baseUrl + 'Account/detail')
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  setEmail(email: string) {
    // You can use sessionStorage or a service property to store the email
    sessionStorage.setItem('email', email);
  }

  isLoggedIn(): boolean {
    let token = '';
    this.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          token = user.token;
        }
      }
    })
    return !!token;  // Or use sessionStorage
  }
}
