import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { generoDTO, generoCreacionDTO } from './genero';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'generos';

  public obtenerPaginado(pagina: number, cantidadRegistrosAMostrar: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString());
    return this.http.get<generoDTO[]>(this.apiURL, {observe: 'response', params});
  }

  public obtenerTodos(){
    return this.http.get<generoDTO[]>(`${this.apiURL}/todos`);
  }

  public obtenerPorId(id: number): Observable<generoDTO>{
    return this.http.get<generoDTO>(`${this.apiURL}/${id}`);
  }

  public crear(genero: generoCreacionDTO){
    return this.http.post(this.apiURL, genero);
  }

  public editar(id: number, genero: generoCreacionDTO){
    return this.http.put(`${this.apiURL}/${id}`, genero);
  }

  public borrar(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

}




