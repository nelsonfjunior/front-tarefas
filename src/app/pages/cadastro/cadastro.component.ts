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

  constructor(private tarefaService: TarefaService, private router: Router, private toastr: ToastrService) {}

  criarUsuario(tarefa: Tarefa){
    this.tarefaService.salvar(tarefa).subscribe({
      next: (res) => {
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
  }

}
