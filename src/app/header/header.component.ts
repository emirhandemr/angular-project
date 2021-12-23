import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  constructor(private dataSS: DataStorageService) {}

  onSaveData() {
    this.dataSS.storeRecipes();
  }

  onFetchData() {
    this.dataSS.fetchRecipes().subscribe();
  }
}
