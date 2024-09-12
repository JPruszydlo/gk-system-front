import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { ApiService } from './api.service'
import { environment } from '../../environments/environment'
import { catchError, delay, Subject, switchMap, throwError } from 'rxjs'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let apiService = inject(ApiService)

  if (req.url.includes('home/authorizeclient')) {
    let authReq = req.clone({
      headers: req.headers.set('Authorization', `Basic ${btoa(`${environment.apiUser}:${environment.apikey}`)}`),
    })
    return next(authReq)
  }

  if (req.url.includes('geolocation')) return next(req)
  let modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${apiService.getToken().token}`),
  })
  return next(modifiedReq)
}

export const unauthErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const apiService = inject(ApiService)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse && !req.url.includes('home/authorizeclient') && error.status === 401) {
        return apiService.refreshToken().pipe(
          switchMap((refreshResult) => {
            apiService.setToken(refreshResult)
            return next(
              req.clone({
                headers: req.headers.set('Authorization', `Bearer ${apiService.getToken().token}`),
              })
            )
          }),
          catchError((error) => {
            return throwError(() => error)
          })
        )
      }
      return throwError(() => new Error('Unauthorized Exception'))
    })
  )
}
