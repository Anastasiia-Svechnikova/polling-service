import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { IPokeApiResponse } from './types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getPokemon(): Observable<string> {
    const number = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    return this.http
      .get<IPokeApiResponse>(`https://pokeapi.co/api/v2/pokemon/${number}`)
      .pipe(map((data) => data.name));
  }
}
