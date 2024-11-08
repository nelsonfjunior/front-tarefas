import { TarefaService } from './../../service/tarefa.service';
import { Component, LOCALE_ID } from '@angular/core';
import { FormularioComponent } from "../../components/formulario/formulario.component";
import { Tarefa } from '../../interface/Tarefa';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormularioComponent, CommonModule],
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent {
  btnAcao = 'Cadastrar';
  descTitulo = 'Cadastro de Tarefas';
  tarefas: Tarefa[] = [];

  constructor(private tarefaService: TarefaService, private router: Router, private toastr: ToastrService) {}

  criarTarefa(tarefa: Tarefa) {
    this.tarefaService.listar().subscribe({
      next: (res) => {
        this.tarefas = res;

        if(tarefa.nome === '' || tarefa.dataLimite === '' || tarefa.custo === null || tarefa.custo <= 0) {
          this.toastr.warning('Campos obrigatórios não preenchidos', 'Error', {
            timeOut: 3000,
          });
          return;
        }

        if (this.tarefas.some(t => t.nome === tarefa.nome)) {
          this.toastr.warning('Tarefa já cadastrada', 'Error', {
            timeOut: 3000,
          });
          return;
        }
        tarefa.ordemApresentacao = this.tarefas.length + 1;
        this.tarefaService.salvar(tarefa).subscribe({
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
