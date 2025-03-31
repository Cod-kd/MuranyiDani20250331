import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../models/Recipes';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipes',
  standalone: false,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe(response => {
      this.recipes = response.recipes;
    });
  }

  viewRecipe(id: number): void {
    this.router.navigate(['/recipes/read', id]);
  }

  updateRecipe(id: number): void {
    this.router.navigate(['/recipes/update', id]);
  }
}