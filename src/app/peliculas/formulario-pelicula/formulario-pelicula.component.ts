import { MultiPleSelectorModel } from './../../utilidades/selector-multiple/selectorMultiple';
import { PeliculaCreacionDTO, PeliculaDTO } from './../pelicula';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;

  @Input()
  modelo: PeliculaDTO

  @Output()
  OnSubmit: EventEmitter<PeliculaCreacionDTO> = new EventEmitter<PeliculaCreacionDTO>();

  generosNoSeleccionados: MultiPleSelectorModel[] = [
    {llave: 1, valor: 'Drama'},
    {llave: 2, valor: 'Accion'},
    {llave: 3, valor: 'Comedia'},
  ];

  generosSeleccionados: MultiPleSelectorModel[] = [];

  cinesNoSeleccionados: MultiPleSelectorModel[] = [
    {llave: 1, valor: 'Sambil'},
    {llave: 2, valor: 'Agora'},
    {llave: 3, valor: 'Acropolis'},
  ];

  cinesSeleccionados: MultiPleSelectorModel[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      generosId: '',
      cinesId: ''
    });

    if(this.modelo != undefined){
      this.form.patchValue(this.modelo);
    }
  }
  archivoSeleccionado(archivo: File){
    this.form.get('poster').setValue(archivo);
  }
  changeMarkdown(texto){
    this.form.get('resumen').setValue(texto);
  }
  guardarCambios(){
    const generosIds = this.generosSeleccionados.map(val => val.llave);
    this.form.get('generosId').setValue(generosIds);

    const cinesIds = this.cinesSeleccionados.map(val => val.llave);
    this.form.get('cinesId').setValue(cinesIds);

    this.OnSubmit.emit(this.form.value);
  }
}
