import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute) { }

  form: FormGroup;

  generos = [
    { id: 1, nombre: 'Drama' },
    { id: 2, nombre: 'Accion' },
    { id: 3, nombre: 'Comedia' }
  ];

  peliculas = [
    {titulo: "Spider-Man Far From Home", enCines: true, proximoEstrenos: false, generos: [1,2], poster: 'data:image/jpeg;base64,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' },
    {titulo: "Spider-Man No Way Home", enCines: false, proximoEstrenos: true, generos: [3], poster: 'data:image/jpeg;base64,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'}
  ]

  peliculasOriginal = this.peliculas;

  formularioOriginal = {
    titulo: '',
    generoId: 0,
    proximoEstrenos: false,
    enCines: false,
  };

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formularioOriginal);
    this.leerValoresURL();
    this.buscarPeliculas(this.form.value);

    this.form.valueChanges
      .subscribe(valores => {
        this.peliculas = this.peliculasOriginal;
        this.buscarPeliculas(valores);
        this.escribirParametrosBusquedaEnURL();
      })
  }

  private leerValoresURL(){
    this.activatedRoute.queryParams.subscribe((params) =>
    {
      var objeto: any = {};

      if(params.titulo){
        objeto.titulo = params.titulo;
      }
      if(params.generoId){
        objeto.generoId = Number(params.generoId);
      }
      if(params.proximoEstrenos){
        objeto.proximoEstrenos = params.proximoEstrenos;
      }
      if(params.enCines){
        objeto.enCines = params.enCines;
      }

      this.form.patchValue(objeto);
    });
  }

  private escribirParametrosBusquedaEnURL(){
    var queryStrings = [];
    var valoresFormulario = this.form.value;

    if(valoresFormulario.titulo){
      queryStrings.push(`titulo=${valoresFormulario.titulo}`);
    }
    if(valoresFormulario.generoId != '0'){
      queryStrings.push(`generoId=${valoresFormulario.generoId}`);
    }
    if(valoresFormulario.proximoEstrenos){
      queryStrings.push(`proximoEstrenos=${valoresFormulario.proximoEstrenos}`);
    }
    if(valoresFormulario.enCines){
      queryStrings.push(`enCines=${valoresFormulario.enCines}`);
    }

    this.location.replaceState('peliculas/buscar', queryStrings.join('&'));
  }

  buscarPeliculas(valores: any){
    if(valores.titulo){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.indexOf(valores.titulo) !== -1);
    }
    if(valores.generoId !== 0){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(valores.generoId) !== -1);
    }
    if(valores.proximoEstrenos){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.proximoEstrenos);
    }
    if(valores.enCines){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.enCines);
    }
  }

  limpiar(){
    this.form.patchValue(this.formularioOriginal);
  }
}