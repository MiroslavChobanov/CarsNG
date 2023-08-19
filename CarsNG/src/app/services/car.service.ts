import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Car } from '../models/car';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { EMPTY, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private url = "Car";
  private cars: Car[] = [];
  constructor(private http: HttpClient) {
    this.fetchCars().subscribe(() => {
    });
  }

  private fetchCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${environment.apiUrl}/${this.url}`).pipe(
      tap((cars: Car[]) => {
        this.cars = cars;
        console.log(cars);
      }),
      catchError((error) => {
        console.error('Error fetching car data:', error);
        return EMPTY;
      })
    );
  }
  

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

  public getCarDetails(carId: number): Observable<Car | undefined> {
    return this.http.get<Car>(`${environment.apiUrl}/${this.url}/${carId}`).pipe(
      catchError((error) => {
        console.error('Error fetching car details:', error);
        return of(undefined);
      })
    );
  }

  getCarsByUserName(username: string | null): Observable<Car[]> {
    if (username !== null) {
      return this.http.get<Car[]>(`${environment.apiUrl}/car/user/${username}`);
    } else {
      return of([]); 
    }
  }
  
  
}
