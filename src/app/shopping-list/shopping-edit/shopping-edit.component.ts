import { Component,OnDestroy,OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  
  public editMode = false;
  public editItem: Ingredient;
  private editIndex: number;
  @ViewChild("f",{static:false}) seform:NgForm;
  private subscription: Subscription;
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.editIngredient.subscribe(index=>{
      this.editMode = true;
      this.editIndex = index;
      this.editItem = this.slService.getItem(index);
      this.seform.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount
      });
    })
  }
  onAddItem(form: NgForm){
    const newIngredient = new Ingredient(form.value.name,form.value.amount);
    if(this.editMode){
      this.slService.updateItem(this.editIndex,newIngredient);
    }
    else{
    this.slService.addItem(newIngredient);
    }
    form.reset();
    this.editMode = false;
  }

  deleteItem(){
    this.slService.deleteIngredient(this.editIndex);
    this.clearForm();
  }

  clearForm(){
    this.seform.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
