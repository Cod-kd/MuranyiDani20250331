import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe, RecipeResponse } from '../models/Recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'https://dummyjson.com/recipes';

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<RecipeResponse> {
    return this.http.get<RecipeResponse>(this.apiUrl);
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }
}