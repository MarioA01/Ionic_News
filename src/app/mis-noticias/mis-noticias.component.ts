import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ModalController, AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormularioNoticiaComponent } from '../formulario-noticia/formulario-noticia.component';

@Component({
  selector: 'app-mis-noticias',
  templateUrl: './mis-noticias.component.html',
  styleUrls: ['./mis-noticias.component.scss'],
})
export class MisNoticiasComponent implements OnInit {

  myArray : any[] = [];
  user_id = null;

  constructor(private alert: AlertController, private route: Router, private api: UserService, private modal:ModalController, public actionsheet: ActionSheetController) { }

  getListBooksId(): void {
    this.api.getMyNotices(this.user_id).subscribe(response => {
      console.log("Por id: ")
      this.myArray = response;
      console.log(response);
    })
  }

  eleminarNoticias(id: string){
    this.api.deleteNotice(id).subscribe(response =>{
      console.log("eliminado con exito");
      this.ngOnInit();

    }, err=>{
      console.log("algo salio mal");
      console.log(err.err);
    })
  }

  ngOnInit() {
    console.log("vista de mis noticias")
    this.user_id = localStorage.getItem("id");
    this.getListBooksId();
  }

  async accion(item) {
    console.log("dimos click");

    const btn_accion = await this.actionsheet.create({
      header: 'Opciones',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: ()=>{
            console.log("eliminando");
            this.presentAlert(item._id)
          }
        },{
          text: 'Editar',
          icon: 'create',
          handler: ()=>{
            console.log("editando");
            this.editarNoticia(item, 2);
          }
        },{
            text: 'Cancelar',
            role: 'close',
            icon: 'close',
            handler:()=>{
              console.log("operacion cancelada")
            }
          }]
    });

    await btn_accion.present();
  }

  async editarNoticia(item, tipo){
    const edit_ventana = await this.modal.create({
      component: FormularioNoticiaComponent,
      componentProps:{
        'nombre' : item.nombre,
        'descripcion' : item.descripcion,
        'date_time' : item.date_time,
        'urlportada': item.urlportada,
        'usuarioid': item.usuarioid,
        'tipo': tipo,
        'id' : item._id
      }
    });

    edit_ventana.onDidDismiss().then((data) =>{
      console.log("edicion realizada");
      this.ngOnInit();
      //this.api.updateNoticia(item._id, data.data);
    });

    return await edit_ventana.present();
  }

  async presentAlert(id: string){
    console.log("este es el id " + id);
    const ventanaAlert = await this.alert.create({
      header: 'ALERTA',
      subHeader: 'Estas seguro de eliminar este elemento',
      buttons : [{
        text: 'Eliminar',
        handler: () =>{
          this.eleminarNoticias(id);
          console.log("ELIMINANDO VALOR");
          this.ngOnInit();
        }
      },{
        text: 'Cancelar',
        handler: () =>{
          console.log("operacion cancelada");
        }
      }]
    })

    await ventanaAlert.present();
  }
  
  cerrar(){
    this.route.navigate(['noticiaslector']);
  }

}
