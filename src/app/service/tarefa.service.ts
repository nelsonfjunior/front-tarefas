import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Tarefa } from '../interface/Tarefa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  ApiUrl = environment.UrlApi;

  constructor(private http: HttpClient) { }


  salvar(tarefa: Tarefa) : Observable<Tarefa> {
    return this.http.post<Tarefa>(`${this.ApiUrl}/salvar`, tarefa);
  }

  editar(tarefa: Tarefa) : Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.ApiUrl}/${tarefa.id}`, tarefa);
  }

  deletar(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.ApiUrl}/${id}`);
  }

  listar(): Observable<Tarefa[]>{
    return this.http.get<Tarefa[]>(`${this.ApiUrl}/listar`);
  }

  listarPorId(id: number): Observable<Tarefa>{
    return this.http.get<Tarefa>(`${this.ApiUrl}/${id}`);
  }


}
