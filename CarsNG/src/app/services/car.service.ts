import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Car } from '../models/car';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private url = "Car";
  constructor(private http: HttpClient) { }

  public getCars() : Observable<Car[]> {

    return this.http.get<Car[]>(`${environment.apiUrl}/${this.url}`);
  }

  public updateCar(car: Car) : Observable<Car[]> {

    return this.http.put<Car[]>(`${environment.apiUrl}/${this.url}`, car);
  }

  public createCar(car: Car) : Observable<Car[]> {

    return this.http.post<Car[]>(`${environment.apiUrl}/${this.url}`, car);
  }

  public deleteCar(car: Car) : Observable<Car[]> {

    return this.http.delete<Car[]>(`${environment.apiUrl}/${this.url}/${car.id}`);
  }
}
