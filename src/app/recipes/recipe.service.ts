import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
    public recipesChanged = new Subject<Recipe[]>();
    // recipes: Recipe[] = [
    //     new Recipe('Test','Test desc','https://picturetherecipe.com/wp-content/uploads/2020/07/Butter-Chicken-PTR-Featured-395x500.jpg',[
    //         new Ingredient("Eggs",5),
    //         new Ingredient("Onions",2)
    //     ]),
    //     new Recipe('Another Test','Another Test desc','https://picturetherecipe.com/wp-content/uploads/2020/07/Butter-Chicken-PTR-Featured-395x500.jpg',[
    //         new Ingredient("Meat",8),
    //         new Ingredient("Cream",3)
    //     ]),
    //   ];

    recipes: Recipe[] = [];
    public getRecipes(){
        return this.recipes.slice();
    }

    constructor(private slService: ShoppingListService){

    }
    public addIngredients(ingredients: Ingredient[]){
        this.slService.addItems(ingredients);
    }

    public getRecipe(index: number){
        return this.recipes[index];
    }

    public setRecipes(recipes: Recipe[]){
       this.recipes = recipes;
       this.recipesChanged.next(this.recipes.slice());
    }
    public addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    public updateRecipe(index: number, recipe: Recipe){
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    public deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}