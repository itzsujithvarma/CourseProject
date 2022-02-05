import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  constructor(private dSService: DataStorageService) { }

  ngOnInit(): void {
  }
  
  saveRecipes(){
    this.dSService.storeRecipes();
  }

  getRecipes(){
    this.dSService.fetchRecipes().subscribe();
  }
}
