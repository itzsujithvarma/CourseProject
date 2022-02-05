import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id: number;
  constructor(private recipeService: RecipeService, public activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params)=>{
      this.id = +params['id']
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  public addIngredientsToList(){
    this.recipeService.addIngredients(this.recipe.ingredients);
  }

  public deleteItem(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../recipes']);
  }

}
