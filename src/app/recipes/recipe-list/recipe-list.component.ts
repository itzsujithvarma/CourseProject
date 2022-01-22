import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Test','Test desc','https://picturetherecipe.com/wp-content/uploads/2020/07/Butter-Chicken-PTR-Featured-395x500.jpg'),
    new Recipe('Another Test','Another Test desc','https://picturetherecipe.com/wp-content/uploads/2020/07/Butter-Chicken-PTR-Featured-395x500.jpg')
  ];
  @Output() recipeGotSelected = new EventEmitter<Recipe>();
    constructor() { }

  ngOnInit(): void {
  }
  onrecipeGotSelected(recipe:Recipe){
    this.recipeGotSelected.emit(recipe);
  }
}
