import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public myForm: FormGroup;

  constructor(private modalCtrl: ModalController,
              private formBuilder: FormBuilder,
              public alertController: AlertController,
              private api: UserService,
              private route: Router) 
    {
    this.myForm = this.formBuilder.group({
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {}

  closeWindow(){
    this.modalCtrl.dismiss();
  }
 
  login() {
    if (this.myForm.invalid) {
      this.presentAlertError();
      console.log("Campos vacios o correo erroneo");
      return;
    }
    this.api.create(this.myForm.value).subscribe(response => {
      this.route.navigate(['noticiaslector']);
      console.log("ID de usuario: " + response);
      console.log(response.id);
      console.log(response.tipo)

      localStorage.setItem("id", response.id);
      localStorage.setItem("tipo",response.tipo);

      console.table(this.myForm.value);
      this.closeWindow();
    })
    
  }

  async presentAlertError() {
    const alert = await this.alertController.create({
      header: "Alerta",
      subHeader: "Campos erroneos o vacios",
      message: "Favor de llenar los campos requeridos.",
      buttons: ["OK"]
    });
    await alert.present();
  }

  async presentAlertExitoso() {
    const alert = await this.alertController.create({
      header: "Alerta",
      subHeader: "Se logio de forma exitosa",
      message: "Login exitoso5.",
      buttons: ["OK"]
    });
    await alert.present();
  }
}
