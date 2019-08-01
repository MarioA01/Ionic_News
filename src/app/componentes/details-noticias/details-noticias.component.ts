import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details-noticias',
  templateUrl: './details-noticias.component.html',
  styleUrls: ['./details-noticias.component.scss'],
})
export class DetailsNoticiasComponent implements OnInit {
  modalNombre:string;
  modalDescripcion:number;
  modalDate:string;
  modalUrl:string;

  constructor(private navParams: NavParams,
              private modalCtrl: ModalController,) { }

  ngOnInit() {
    this.modalNombre = this.navParams.data.nombre;
    this.modalDescripcion = this.navParams.data.descripcion;
    this.modalDate = this.navParams.data.date_time;
    this.modalUrl = this.navParams.data.urlportada;
  }

  regresar(){
    this.modalCtrl.dismiss();
  }


}
