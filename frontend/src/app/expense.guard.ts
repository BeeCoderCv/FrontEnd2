import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ExpenseGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
          route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
                {
                  let url: string = state.url;

            return this.checkLogin(url);

               }

                  checkLogin(url: string): true | UrlTree 
                  {
                  console.log("Url: " + url)
                   let val: any =  localStorage.getItem('isUserLoggedIn');
                  if(val != null && val == "true")
                      {
                                if(url == "/login")
                                      return  this.router.parseUrl('/landingPage');
                                else 
                                      return true;
                      } 
                  
                  else 
                        {
                        return this.router.parseUrl('/login');
                        }
                  }

  

}
