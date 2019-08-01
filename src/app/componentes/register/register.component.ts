import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public myForm: FormGroup;

  constructor(private modalCtrl: ModalController,
              private formBuilder: FormBuilder,
              public alertController: AlertController,
              private api: UserService) { 
                this.myForm = this.formBuilder.group({
                  first_name: ["", Validators.required],
                  last_name: ["", Validators.required],
                  email: ["",Validators.compose([
                      Validators.required,
                      Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
                    ])],
                  password: ["", Validators.required],
                  tipo: ["", Validators.required]
                });
              }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["",Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])],
      password: ["", Validators.required],
      tipo: ["", Validators.required]
    });
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  register() {
    if (this.myForm.invalid) {
      this.presentAlertError();
      console.log("Campos vacios o correo erroneo");
      return;
    }
    this.api.createuser(this.myForm.value).subscribe(response => {
      this.presentAlertExitoso(response);
      console.log("ID de usuario: " + response);
      console.table(this.myForm.value);
      this.ngOnInit();
    })
    //this.ngOnInit();
    //console.table(this.myForm.value);
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

  async presentAlertExitoso(response) {
    const alert = await this.alertController.create({
      header: "Mensaje",
      message: response.message,
      buttons: ["OK"]
    });
    await alert.present();
  }


}
