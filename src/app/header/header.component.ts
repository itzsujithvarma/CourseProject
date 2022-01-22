import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  constructor() { }

  @Output() selectedFeature = new EventEmitter<string>();
  ngOnInit(): void {
  }
  onSelected(feature: string){
    this.selectedFeature.emit(feature);
  }
}
