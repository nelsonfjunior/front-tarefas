import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../../interface/Tarefa';
import { TarefaService } from '../../service/tarefa.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, DragDropModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  tarefas: Tarefa[] = [];
  tarefasGeral: Tarefa[] = [];
  showConfirmDialog: boolean = false;
  tarefaIdParaExcluir:number | null = null;
  isLoading: boolean = true;

  constructor(private tarefaService: TarefaService, private toastr: ToastrService, private router: Router){}

  ngOnInit(): void {
    this.listarTarefas();

  }

  editarTarefa(tarefa: Tarefa): void {
    this.router.navigate([`/edicao/${tarefa.id}`]);
  }

  solicitarConfirmacaoExclusao(id: number): void {
    this.tarefaIdParaExcluir = id;
    this.showConfirmDialog = true;
  }

  confirmDelete(): void {
    if (this.tarefaIdParaExcluir !== null) {
      this.tarefaService.deletar(this.tarefaIdParaExcluir).subscribe(
        () => {
          this.toastr.success('Tarefa excluída com sucesso!', 'Sucesso', {
            timeOut: 3000,
          });
          this.listarTarefas();
          this.cancelDelete();
        },
        (error) => {
          this.toastr.error('Erro ao excluir tarefa', 'Erro', {
            timeOut: 3000,
          });
          this.cancelDelete();
        }
      );
    }
  }

  cancelDelete(): void {
    this.showConfirmDialog = false;
    this.tarefaIdParaExcluir = null;
  }

  listarTarefas(){
    this.isLoading = true;
    this.tarefaService.listar().subscribe({
      next: (res) => {
        this.tarefas = res;
        this.tarefasGeral = res;
        this.isLoading = false;
      },
      error: (err) => {
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

  drop(event: CdkDragDrop<Tarefa[]>) {
    moveItemInArray(this.tarefas, event.previousIndex, event.currentIndex);
  }


}
