import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ReadRecipeComponent } from './read-recipe/read-recipe.component';
import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';
import { RecipeResolver } from '../services/recipe.resolver';

const routes: Routes = [
  { path: 'recipes', component: RecipesComponent, children: [
    { path: 'read/:id', component: ReadRecipeComponent, resolve: { recipe: RecipeResolver } },
    { path: 'update/:id', component: UpdateRecipeComponent, resolve: { recipe: RecipeResolver } }
  ]},
  { path: '', redirectTo: 'recipes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }