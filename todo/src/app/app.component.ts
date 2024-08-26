import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo';
  APIURL = 'http://localhost:5240/';
  usuarios: any=[];
  
  nuevoUsuarioForm!: FormGroup;


  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.get_usuarios();
    this.nuevoUsuarioForm= this.formBuilder.group({
      Rut:['',[Validators.required]],  
      Nombre:['',[Validators.required]],
      Edad:['',[Validators.required]]
    })
  }

  get_usuarios(){
    this.http.get(this.APIURL+"api/usuario").subscribe((res)=>{
      this.usuarios=res;
    })
  }

  agregarUsuario(){
    const data={
      Rut: this.nuevoUsuarioForm.value.Rut,
      Nombre: this.nuevoUsuarioForm.value.Nombre,
      Edad: this.nuevoUsuarioForm.value.Edad,
    }
    this.http.post(this.APIURL+"api/usuario",data).subscribe({
      next: (res:any) => {
          alert("Creación de usuario exitoso");
          this.get_usuarios();
          this.nuevoUsuarioForm.reset();
      },
      error: (e) => {
        console.error(e);
      }
    });

  }

  eliminarUsuario(usuarioPK:any){
    this.http.delete(this.APIURL+"api/usuario/"+usuarioPK).subscribe((res)=>{
      this.get_usuarios();
    
    });

  }
}
