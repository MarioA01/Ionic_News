import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../componentes/login/login.component';
import { ModalController } from '@ionic/angular';
import { RegisterComponent } from '../componentes/register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private modal: ModalController) {
    
  }

  ngOnInit() {
    localStorage.clear();
  }
          
  async presentlogin() {
    const login = await this.modal.create({
      component: LoginComponent
    });
    return await login.present();
  }

  async presentregister() {
    const register = await this.modal.create({
      component: RegisterComponent
    });
    return await register.present();
  }

}
