import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DetailsNoticiasComponent } from '../details-noticias/details-noticias.component';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { FormularioNoticiaComponent } from 'src/app/formulario-noticia/formulario-noticia.component';

@Component({
  selector: 'app-noticias-lector',
  templateUrl: './noticias-lector.component.html',
  styleUrls: ['./noticias-lector.component.scss'],
})
export class NoticiasLectorComponent implements OnInit {
  tipo = null;
  user_id = null;

  myArray : any[] = [];

  constructor(private api: UserService,
              private route: Router,
              private modal: ModalController,
              public menu : ActionSheetController) { }

  ngOnInit() {
    //setInterval(()=> this.getListBooks(), 1000);
    console.log("vista de todas las noticias")
    this.getListBooks();
    this.tipo = localStorage.getItem("tipo");
    this.user_id = localStorage.getItem("id");
    console.log("el tipo de usuario es" + this.tipo);
    console.log("el id del usuario es" + this.user_id);
    
  }

  async modalMenu(){
    const action = await this.menu.create({
      header : 'Menú',
      buttons : [{
        text: 'Nueva noticia',
        icon: 'add',
        handler: () =>{
          console.log("add noticia");
          this.addNoticia(1);
          this.ngOnInit();
        }
      },{
        text: 'Mis noticias',
        icon: 'list',
        handler: () =>{
          console.log("Mis noticias");
          this.route.navigateByUrl('/misnoticias', {skipLocationChange: true}).then(()=> this.route.navigate(["/misnoticias"]));

          this.ngOnInit();
        }
      },{
        text: 'Cancelar',
        icon: 'close',
        handler: () =>{
          console.log("cancelado");
          this.ngOnInit();
        }
      }]
    });

    await action.present();
  }

  getListBooks(): void {
    this.api.getAll().subscribe(response => {
      console.log(response);
      this.myArray = response;
    })
  }

  

  cerrar(){
    localStorage.clear();
    this.route.navigate(['']);
  }

  async details(item) {
    const detailsNoticias = await this.modal.create({
      component: DetailsNoticiasComponent,
      componentProps: {
        "nombre": item.nombre,
        "descripcion": item.descripcion,
        "date_time": item.date_time,
        "urlportada": item.urlportada
      }
    });
    return await detailsNoticias.present();
  }
  
  async addNoticia(tipo){
    const addNew = await this.modal.create({
      component: FormularioNoticiaComponent,
      componentProps:{
        "tipo": tipo,
        "usuarioid": this.user_id,
        "date_time": "fecha y hora"
      }
    });

    addNew.onDidDismiss().then(()=>{
        this.ngOnInit();
    })
    return await addNew.present();
  }

}
