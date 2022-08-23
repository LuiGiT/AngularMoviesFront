import { GenerosService } from './../generos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { generoCreacionDTO } from '../genero';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css']
})
export class CrearGeneroComponent {
  errores: string[] = [];

  constructor(private router: Router, private generosService: GenerosService) { }

  guardarCambios(genero: generoCreacionDTO){
    this.generosService.crear(genero).subscribe(
      () => {
      this.router.navigate(['/generos']);
    },
    (error) => this.errores = parsearErroresAPI(error)
    );
  }
}
