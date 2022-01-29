import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
   ingredientsChanged = new Subject<Ingredient[]>();
   private ingredients :Ingredient[] =[
        new Ingredient('Apple',5),
        new Ingredient('Orange',1)
      ];
    public getIngredients(){
        return this.ingredients.slice();
    }
    addItem(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice())
      }
      addItems(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice())
      }
}