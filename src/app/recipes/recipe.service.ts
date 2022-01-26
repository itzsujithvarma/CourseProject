import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
    recipes: Recipe[] = [
        new Recipe('Test','Test desc','https://picturetherecipe.com/wp-content/uploads/2020/07/Butter-Chicken-PTR-Featured-395x500.jpg',[
            new Ingredient("Eggs",5),
            new Ingredient("Onions",2)
        ]),
        new Recipe('Another Test','Another Test desc','https://picturetherecipe.com/wp-content/uploads/2020/07/Butter-Chicken-PTR-Featured-395x500.jpg',[
            new Ingredient("Meat",8),
            new Ingredient("Cream",3)
        ]),
      ];
   recipeSelected = new EventEmitter<Recipe>();
    public getRecipes(){
        return this.recipes.slice();
    }

    constructor(private slService: ShoppingListService){

    }
    public addIngredients(ingredients: Ingredient[]){
        this.slService.addItems(ingredients);
    }
}