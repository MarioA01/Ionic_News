import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-formulario-noticia',
  templateUrl: './formulario-noticia.component.html',
  styleUrls: ['./formulario-noticia.component.scss'],
  providers: [DatePipe]
})
export class FormularioNoticiaComponent implements OnInit {
  noticia : FormGroup;
  myDate =  Date();
  usuario_id : string;
  tipo : any;
  btn_name: string;
  item_id : string;

  constructor(private service: UserService, private modalCtrl: ModalController, private fb: FormBuilder, private datepipe: DatePipe, private navegador: NavParams) {
      this.tipo = this.navegador.data.accion;
      this.item_id = this.navegador.data.id;
      console.log("entramos al constructor" + this.navegador.data.tipo);
      this.noticia = fb.group({
        nombre: [this.navegador.data.nombre],
        descripcion: [this.navegador.data.descripcion],
        date_time: [this.navegador.data.date_time],
        urlportada : [this.navegador.data.urlportada],
        usuarioid : [this.navegador.data.usuarioid]
      })
  }

  ngOnInit() {
    //this.tipo = this.navegador.data.accion;
    this.myDate = Date();
    this.myDate = this.datepipe.transform(this.myDate, 'dd-MM-yyyy hh:mm:ss a');
    this.usuario_id = localStorage.getItem("id");
    
    
    if (this.tipo == 1){
      this.btn_name = "Guardar";
    }else{
      this.btn_name = "Editar";
    }
    console.log("la accion es " + this.tipo);
    console.log("el nombres es " + this.btn_name);
  }

  cerrar(){
    this.modalCtrl.dismiss();
  } 

  save(formValue: any){
    console.log("este es el formulario " + this.tipo);
    console.log(formValue);
    console.log("el valor es" + this.tipo)
    if(this.tipo == 1){

      console.log("entramos a guardar")
      this.service.createNew(formValue).subscribe(response =>{
        this.ngOnInit();
        console.log("noticia creada con exito");
        this.cerrar();
      },err =>{
        console.log("error al registrar" + err.err);
      });

    }else{
      console.log("entramos a editar" + this.item_id);
      this.service.updateNoticia(this.item_id, formValue).subscribe(response =>{
        this.ngOnInit();
        console.log("noticia editada");
      })
    }

  
  }

}
