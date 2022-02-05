import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';
import { taggedTemplate } from '@angular/compiler/src/output/output_ast';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private recipesService: RecipeService){

    }

    storeRecipes(){
        const recipes = this.recipesService.getRecipes();
        this.http.put('https://ng-course-recipe-book-39d7e-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(()=>{
            console.log("Recipes saved");
        });
    }

    fetchRecipes(){
        const recipes = this.recipesService.getRecipes();
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-39d7e-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes =>{
            return recipes.map(recipe => {
                return {
                    ...recipe,
                    ingredients:  recipe.ingredients? recipe.ingredients : []
                }
            })
        }),
        tap(recipes=>{
            this.recipesService.setRecipes(recipes);
        }));
    }
}