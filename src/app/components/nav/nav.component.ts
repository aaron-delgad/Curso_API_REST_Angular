import { Component, Input, OnInit,OnChanges } from '@angular/core';

import { StoreService } from '../../services/store.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit,OnChanges {

  @Input() correo: string = '';
  correo1='';
  activeMenu = false;
  counter = 0;

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  ngOnChanges(){
    this.correo1 = this.correo
  }
}
