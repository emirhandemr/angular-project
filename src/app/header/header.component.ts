import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuth = false;
  private userSub: Subscription;

  constructor(private dataSS: DataStorageService, 
              private AuthS: AuthService) {}

  ngOnInit() {
      this.userSub = this.AuthS.user.subscribe(user => {
        this.isAuth = !!user; // !user ? false : true;
        console.log(!user);
        console.log(!!user);
      });
  }
              
  onSaveData() {
    this.dataSS.storeRecipes();
  }

  onFetchData() {
    this.dataSS.fetchRecipes().subscribe();
  }

  onLogout() {
    this.AuthS.logout();
  }

  ngOnDestroy() {
      this.userSub.unsubscribe();
  }
}
