import { SeguridadService } from './../seguridad.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-autorizado',
  templateUrl: './autorizado.component.html',
  styleUrls: ['./autorizado.component.css']
})
export class AutorizadoComponent implements OnInit {

  constructor(private SeguridadService: SeguridadService) { }

  ngOnInit(): void {
  }
  @Input()
  rol: string;

  estaAutorizado(): boolean{
    if(this.rol){
      return this.SeguridadService.obtenerRol() === this.rol;
    }
    return this.SeguridadService.estaLogueado();
  }

}
