import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BuscarPaisService } from '../services/buscar-pais.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-buscar-pais-europeu',
  templateUrl: './buscar-pais-europeu.component.html',
  styleUrl: './buscar-pais-europeu.component.css'
})
export class BuscarPaisEuropeuComponent {

  formPesquisarPais: FormGroup;

  constructor(private http: HttpClient, private bp: BuscarPaisService, private fb: FormBuilder) {
    this.formPesquisarPais = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  buscar() {
    const nome = this.formPesquisarPais.value.nome
    this.bp.buscarPais(nome).subscribe(res => {
      
      console.log(res);
    })
  }
}
