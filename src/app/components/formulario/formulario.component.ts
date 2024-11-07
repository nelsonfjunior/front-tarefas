import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tarefa } from '../../interface/Tarefa';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [RouterModule,  FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './formulario.component.html',
})
export class FormularioComponent implements OnInit{
  @Output() onSubmit = new EventEmitter<Tarefa>();
  @Input() tarefa: Tarefa | null = null;
  @Input() descTitulo!: string;
  @Input() btnAcao!: string;
  @Input() habilitado: boolean = false;

  tarefaForm!: FormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tarefa'] && this.tarefa && this.tarefaForm) {
      this.tarefaForm.patchValue({
        id: this.tarefa.id,
        nome: this.tarefa.nome,
        custo: this.tarefa.custo,
        dataLimite: this.tarefa.dataLimite,
        ordemApresentacao: this.tarefa.ordemApresentacao
      });
    }
  }

  ngOnInit(): void {
    this.tarefaForm = new FormGroup({
      nome: new FormControl(''),
      custo: new FormControl(''),
      dataLimite: new FormControl(''),
      ordemApresentacao: new FormControl({value: '', disabled: this.habilitado})
    });

    if (this.tarefa) {
      this.tarefaForm.patchValue({
        nome: this.tarefa.nome,
        custo: this.tarefa.custo,
        dataLimite: this.tarefa.dataLimite,
        ordemApresentacao: this.tarefa.ordemApresentacao
      });
    }
  }

  submit(){
    const tarefa = {...this.tarefa, ...this.tarefaForm.value};
    this.onSubmit.emit(tarefa);
  }

}
