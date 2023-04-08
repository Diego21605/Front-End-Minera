import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
                private router : Router) {
    this.formLogin = this.frmBuilder.group({
      User : [null, Validators.required],
      Pass : [null, Validators.required],
    })
  }

  ngOnInit(): void {
  }

  // Funcion que va a validar los datos de inicio de sesion
  iniciarSesion() {
    this.router.navigate(['/Home']);
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
