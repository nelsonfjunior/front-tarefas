import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../../interface/Tarefa';
import { TarefaService } from '../../service/tarefa.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  tarefas: Tarefa[] = [];
  tarefasGeral: Tarefa[] = [];

  constructor(private tarefaService: TarefaService, private toastr: ToastrService, private router: Router){}

  ngOnInit(): void {
    this.listarTarefas();
  }

  listarTarefas(){
    this.tarefaService.listar().subscribe({
      next: (res) => {
        this.tarefas = res;
        this.tarefasGeral = res;
      },
      error: () => {
        this.toastr.error('Erro ao listar tarefas', 'Error', {
          timeOut: 3000,
          });
        }
      }
    );
  }

  search(event: Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.tarefas = this.tarefasGeral.filter(tarefa => {
      return tarefa.nome.toLowerCase().includes(value);
    })
  }


}
