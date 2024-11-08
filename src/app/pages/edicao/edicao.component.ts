import { Component, OnInit } from '@angular/core';
import { TarefaService } from '../../service/tarefa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tarefa } from '../../interface/Tarefa';
import { FormularioComponent } from "../../components/formulario/formulario.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edicao',
  standalone: true,
  imports: [FormularioComponent, CommonModule],
  templateUrl: './edicao.component.html',
})
export class EdicaoComponent implements OnInit{
  btnAcao = 'Editar';
  descTitulo = 'Edição de Tarefas';
  tarefa!: Tarefa;
  tarefas: Tarefa[] = [];
  id!: number;

  constructor(private tarefaService: TarefaService, private router: Router, private toastr: ToastrService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.listarPorId(this.id);
    }else{
      this.toastr.error('Erro ao listar tarefa', 'Error');
    }
  }

  editarTarefa(tarefa: Tarefa) {
    this.tarefaService.listar().subscribe({
      next: (res) => {
        this.tarefas = res;

        if(tarefa.nome === '' || tarefa.dataLimite === '' || tarefa.custo === null || tarefa.custo <= 0) {
          this.toastr.warning('Campos obrigatórios não preenchidos', 'Error', {
            timeOut: 3000,
          });
          return;
        }

        if (this.tarefas.some(t => t.nome === tarefa.nome && t.id !== tarefa.id)) {
          this.toastr.warning('Tarefa já cadastrada', 'Error', {
            timeOut: 3000,
          });
          return;
        }
        this.tarefaService.editar(tarefa).subscribe({
          next: () => {
            console.log(tarefa)
            this.toastr.success('Tarefa cadastrada com sucesso', 'Sucesso', {
              timeOut: 3000,
            });
            this.router.navigate(['/']);
          },
          error: () => {
            this.toastr.error('Erro ao cadastrar tarefa', 'Error', {
              timeOut: 3000,
            });
          }
        });
      },
      error: () => {
        this.toastr.error('Erro ao listar tarefas', 'Error', {
          timeOut: 3000,
        });
      }
    });
  }

  listarPorId(id: number){
    this.tarefaService.listarPorId(id).subscribe({
      next: (res) => {
        this.tarefa = res;
      },
      error: () => {
        this.toastr.error('Erro ao listar tarefa', 'Error', {
          timeOut: 3000,
        });
      }
    });
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
    });
  }

}
