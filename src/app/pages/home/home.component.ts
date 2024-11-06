import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../../interface/Tarefa';
import { TarefaService } from '../../service/tarefa.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  tarefas: Tarefa[] = [];

  constructor(private tarefaService: TarefaService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.listarTarefas();
  }

  listarTarefas(){
    this.tarefaService.listar().subscribe({
      next: (res) => {
        this.tarefas = res;
      },
      error: () => {
        this.toastr.error('Erro ao listar tarefas', 'Error', {
          timeOut: 3000,
          });
        }
      }
    );
  }


}
