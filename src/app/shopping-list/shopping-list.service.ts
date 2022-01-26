import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
   ingredientsChanged = new EventEmitter<Ingredient[]>();
   private ingredients :Ingredient[] =[
        new Ingredient('Apple',5),
        new Ingredient('Orange',1)
      ];
    public getIngredients(){
        return this.ingredients.slice();
    }
    addItem(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice())
      }
      addItems(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice())
      }
}