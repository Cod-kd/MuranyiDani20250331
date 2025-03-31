import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../models/Recipes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-recipe',
  standalone: false,
  templateUrl: './update-recipe.component.html',
  styleUrl: './update-recipe.component.css'
})
export class UpdateRecipeComponent implements OnInit, OnDestroy {
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
      name: ['', Validators.required],
      prepTimeMinutes: [0, [Validators.required, Validators.min(5)]],
      cookTimeMinutes: [0, [Validators.required, Validators.min(5)]],
      cuisine: ['', Validators.required]
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

  onSubmit(): void {
    if (this.recipeForm.valid) {
      console.log(this.recipeForm.value);
      // Mentés implementáció
    }
  }
}