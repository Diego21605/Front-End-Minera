import { Component, Inject, OnInit } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  display : boolean = false;
  nombreUsuario : string = '';
  subir1 : boolean = true;

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,) {
  }

  ngOnInit(): void {
    this.lecturaStorage();
  }

  lecturaStorage() {
    this.nombreUsuario = this.storage.get('User');
  }

  clickIcon1(){
    if (this.subir1) this.subir1 = false;
    else this.subir1 = true;
  }

}
