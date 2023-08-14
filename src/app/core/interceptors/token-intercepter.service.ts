import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenIntercepterService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newRequest = req; // Declare the newRequest variable outside the if block
    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dyujj6zhw"
    if (req.url !== `${cloudinaryUrl}/image/upload` && req.url !== `${cloudinaryUrl}/video/upload`) {
      newRequest = req.clone({
        setHeaders: { authorization: 'Bearer ' + localStorage.getItem('token') },
      });
    }

    return next.handle(newRequest);
  }
}
