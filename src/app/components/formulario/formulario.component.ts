import { Component, EventEmitter, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
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

  tarefaForm!: FormGroup;

  ngOnInit(): void {
    this.tarefaForm = new FormGroup({
      nome: new FormControl(this.tarefa ? this.tarefa.nome : ''),
      custo: new FormControl(this.tarefa ? this.tarefa.custo : ''),
      dataLimite: new FormControl(this.tarefa ? this.tarefa.dataLimite : ''),
      ordemApresentacao: new FormControl(this.tarefa ? this.tarefa.ordemApresentacao : '')
    });
  }

  submit(){
    this.onSubmit.emit(this.tarefaForm.value);
  }

}
