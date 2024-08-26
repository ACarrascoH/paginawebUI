import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  usuarios: any=[];

  APIURL = 'http://localhost:5240/';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.get_tasks();
  }

  get_tasks(){
    this.http.get(this.APIURL+"api/usuario").subscribe((res)=>{
      this.usuarios=res;
    })
  }
}
