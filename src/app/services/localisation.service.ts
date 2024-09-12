import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Visitor } from '../models/visitor'
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class LocalisationService {
  private URL: string = 'https://api.gk-system.myshort.pl/'
  constructor(private http: HttpClient) {}

  getLocationData(callback: any) {
    this.http.get<any>(environment.geolocation).subscribe({
      next: (res: any) => {
        let visitor: Visitor = {
          fingerprint: this.getFingerprint() as string,
          localisation: res,
        }
        callback(visitor)
      },
      error: () => {
        let visitor: Visitor = {
          fingerprint: this.getFingerprint() as string,
          localisation: undefined,
        }
        callback(visitor)
      },
    })
  }

  private getFingerprint(): string | undefined {
    let canvas = document.createElement('canvas')
    canvas.width = 200
    canvas.height = 20
    canvas.style.border = '1px solid black'

    let ctx = canvas.getContext('2d')
    if (ctx == undefined) return
    ctx.fillStyle = 'rgb(255,0,255)'
    ctx.beginPath()
    ctx.rect(20, 20, 150, 100)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    ctx.fillStyle = 'rgb(0,255,255)'
    ctx.arc(50, 50, 50, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()

    let txt = 'abz190#$%^@£éú'
    ctx.textBaseline = 'top'
    ctx.font = '17px "Arial 17"'
    ctx.textBaseline = 'alphabetic'
    ctx.fillStyle = 'rgb(255,5,5)'
    ctx.rotate(0.03)
    ctx.fillText(txt, 4, 17)
    ctx.fillStyle = 'rgb(155,255,5)'
    ctx.shadowBlur = 8
    ctx.shadowColor = 'red'
    ctx.fillRect(20, 12, 100, 5)

    let src = canvas.toDataURL()

    let hash = 0
    for (let i = 0; i < src.length; i++) {
      let char = src.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return hash.toString()
  }
}
