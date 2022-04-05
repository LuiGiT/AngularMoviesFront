import { cineCreacionDTO, cineDTO } from './../cine';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  constructor() { }

  modelo: cineDTO = {nombre : "Agora Mall", latitud:  18.483531076477608, longitud: -69.9392330646515};

  ngOnInit(): void {
  }

  guardarCambios(cine: cineCreacionDTO){
    console.log(cine);
  }
}
