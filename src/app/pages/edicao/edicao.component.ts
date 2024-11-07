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

  editarTarefa(tarefa: Tarefa){
    this.tarefaService.editar(tarefa).subscribe({
      next: (res) => {
        this.toastr.success('Tarefa editada com sucesso', 'Sucesso', {
          timeOut: 3000,
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao editar tarefa', 'Error', {
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

}
