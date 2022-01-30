import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  public id;
  public editMode=false;
  public recipeForm:FormGroup;
  constructor(public route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.id = +params['id'];
      this.editMode = params['id'] != null? true : false;
      this.initForm();
    });
  }

  initForm(){
    
  let name = '';
  let imgPath = '';
  let description = '';
  let recipeIngredients = new FormArray([]);
    
    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      name = recipe.name;
      description = recipe.description;
      imgPath = recipe.imagePath;
      if(recipe['ingredients']){
        for(let i of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(i.name,Validators.required),
            'amount': new FormControl(i.amount,[
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name' : new FormControl(name,Validators.required),
      'description': new FormControl(description,Validators.required),
      'imagePath' : new FormControl(imgPath,Validators.required),
      'ingredients': recipeIngredients
    });
  }
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
onSubmit(){
  if(this.editMode){
    this.recipeService.updateRecipe(this.id,this.recipeForm.value);
  }
  else{
    this.recipeService.addRecipe(this.recipeForm.value);
  }
  this.clear()
}

deleteItem(){
  this.recipeService.deleteRecipe(this.id);
}

clear(){
  this.router.navigate(['../'],{relativeTo: this.route});
}

addIngredient(){
  (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
    'name': new FormControl(null, Validators.required),
    'amount': new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[1-9]+[0-9]*$/)
    ])
  }))
}

deleteIng(index: number){
  (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
}
}
