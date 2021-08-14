import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "@env/environment";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  fetchRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(`${environment.firebaseUrl}/recipes.json`)
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map(recipes => {
        return new RecipesActions.SetRecipes(recipes)
      })
    );
  });

  storeRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([_, recipesState]) => {
        return this.http.put(
          `${environment.firebaseUrl}/recipes.json`,
          recipesState.recipes
        );
      })
    );
  }, { dispatch: false})

  constructor(private actions$: Actions, private http: HttpClient,
              private store: Store<fromApp.AppState>) {}
}
