import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../models/Recipes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-read-recipe',
  standalone: false,
  templateUrl: './read-recipe.component.html',
  styleUrl: './read-recipe.component.css'
})
export class ReadRecipeComponent implements OnInit, OnDestroy {
  recipeForm!: FormGroup;
  recipe!: Recipe;
  private routeSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.routeSubscription = this.route.data.subscribe(data => {
      this.recipe = data['recipe'];
      this.updateForm();
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  private initForm(): void {
    this.recipeForm = this.fb.group({
      name: [{value: '', disabled: true}],
      prepTimeMinutes: [{value: 0, disabled: true}],
      cookTimeMinutes: [{value: 0, disabled: true}],
      cuisine: [{value: '', disabled: true}]
    });
  }

  private updateForm(): void {
    this.recipeForm.patchValue({
      name: this.recipe.name,
      prepTimeMinutes: this.recipe.prepTimeMinutes,
      cookTimeMinutes: this.recipe.cookTimeMinutes,
      cuisine: this.recipe.cuisine
    });
  }
}