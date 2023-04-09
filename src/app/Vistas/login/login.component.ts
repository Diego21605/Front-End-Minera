import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { MessageService } from 'primeng/api';
import { UsuariosService } from 'src/app/Servicios/Usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cargando : boolean = false;
  formLogin !: FormGroup;
  mostrarPass : boolean = false;

  constructor(private frmBuilder : FormBuilder,
                private router : Router,
                  @Inject(SESSION_STORAGE) private storage: WebStorageService,
                    private usuarioService : UsuariosService,
                      private messageService: MessageService,) {
    this.formLogin = this.frmBuilder.group({
      User : [null, Validators.required],
      Pass : [null, Validators.required],
    })
  }

  ngOnInit(): void {
  }

  // Funcion que va a validar los datos de inicio de sesion
  iniciarSesion() {
    let user : string = this.formLogin.value.User;
    let pass : string = this.formLogin.value.Pass;

    this.usuarioService.GetUsuariologin(user, pass).subscribe(datos => {      
      for (let i = 0; i < datos.length; i++) {
        if (datos[i].USERNAME == user && datos[i].PASSWORD == pass) {
          this.storage.set('User', this.formLogin.value.User);
          this.router.navigate(['/Home']);
        } else this.messageService.add({ severity: 'error', summary: '¡Ha ocurrido un error!', detail: '¡El usuario y la contraseña son incorrectos!' });
      }
    }, error => { this.messageService.add({ severity: 'error', summary: '¡Ha ocurrido un error!', detail: '¡El usuario y la contraseña son incorrectos!' }); });
  }

  // Funcin que va a mostrar o no la contraseña del usuario
  mostrarPassword(){
    let password : any = document.getElementById('pass');
    if(password.type == 'password') {
      password.type = 'text';
      this.mostrarPass = true;
    } else {
      password.type = 'password';
      this.mostrarPass = false;
    }
  }
}
