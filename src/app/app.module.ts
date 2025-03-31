// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ReadRecipeComponent } from './read-recipe/read-recipe.component';
import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

class CustomRouteReuseStrategy implements RouteReuseStrategy {
  shouldDetach() { return false; }
  store() {}
  shouldAttach() { return false; }
  retrieve() { return null; }
  shouldReuseRoute(future: any, curr: any) {
    // Ha az útvonal azoanos, de a paraméterek változtak, akkor ne használja újra
    return future.routeConfig === curr.routeConfig && 
           JSON.stringify(future.params) === JSON.stringify(curr.params);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    ReadRecipeComponent,
    UpdateRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }