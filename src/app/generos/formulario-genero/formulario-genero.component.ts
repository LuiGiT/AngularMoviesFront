import { generoCreacionDTO } from './../genero';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrls: ['./formulario-genero.component.css']
})
export class FormularioGeneroComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;

  @Input()
  errores: string[] = [];

  @Input()
  modelo: generoCreacionDTO;

  @Output()
  onSubmit: EventEmitter<generoCreacionDTO> = new EventEmitter<generoCreacionDTO>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', {
        validators: [Validators.required, Validators.minLength(3), primeraLetraMayuscula()]
      }]
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  guardarCambios(){
    this.onSubmit.emit(this.form.value)
  }

  obtenerErrorCampoNombre(){
   var campo = this.form.get('nombre');
   if(campo.hasError('required')){
      return 'El campo nombre es requerido';
   }

   if(campo.hasError('primeraLetraMayuscula')){
    return campo.getError('primeraLetraMayuscula').mensaje;
   }
   return '';
  }

}
