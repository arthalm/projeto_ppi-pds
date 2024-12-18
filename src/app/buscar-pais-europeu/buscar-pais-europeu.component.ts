import { Component } from '@angular/core';
import { BuscarPaisService } from '../services/buscar-pais.service';
import { PesquisarPais, InformacoesDoPais } from '../../model/pais';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-buscar-pais-europeu',
  templateUrl: './buscar-pais-europeu.component.html',
  styleUrl: './buscar-pais-europeu.component.css'
})

export class BuscarPaisEuropeuComponent {

  formPesquisarPais: FormGroup;
  pesquisarPais: PesquisarPais[] | undefined;
  infoPais: InformacoesDoPais | undefined;
  simbMoeda: string | undefined;
  codMoeda: string | undefined;
  nomeMoeda: string | undefined;
  paisInexistente: boolean = false;

  constructor(private bp: BuscarPaisService, private fb: FormBuilder) {
    this.formPesquisarPais = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.pesquisarPais = undefined;
    this.infoPais = undefined;
    this.simbMoeda = undefined;
    this.codMoeda = undefined;
    this.nomeMoeda = undefined;
  };

  buscar() {
    const nome = this.formPesquisarPais.value.nome.toLowerCase();
    const nomesMapeados = {
      'irlanda': 'Republic of Ireland',
      'reino unido': 'United Kingdom of Great Britain and Northern Ireland',
      'frança': 'French Republic',
      'estônia': 'Estonia',
      'letônia': 'Latvia',
      'mônaco': 'Monaco',
      'eslovênia': 'Slovenia',
      'países baixos': 'Netherlands',
      'polônia': 'Poland',
      'tchéquia': 'Czech'
    };
    const nomeIng = nomesMapeados[nome] || nome;
    this.bp.buscarPais(nomeIng).pipe(catchError(erro => {
      if (erro.status === 404) {
        this.paisInexistente = true;
        this.pesquisarPais = undefined;
        this.infoPais = undefined;
      };
      return of([]);
    })).subscribe(res => {
      if (!res || res.length === 0) {
        this.paisInexistente = true;
        this.pesquisarPais = undefined;
        this.infoPais = undefined;
      } else {
        const paisEuropeu = res.filter(pais => pais.region === 'Europe');
        if (paisEuropeu.length > 0) {
          this.paisInexistente = false;
          const paisFiltrado = paisEuropeu.filter(pais => {
            const paisNomeComum = pais.name.common.toLowerCase();
            const paisNomeOficial = pais.name.official.toLowerCase();
            return paisNomeComum === nomeIng.toLowerCase() || paisNomeOficial === nomeIng.toLowerCase();
          });
          if (paisFiltrado.length > 0) {
            this.pesquisarPais = paisFiltrado;
            const symb = paisFiltrado[0]?.currencies;
            if (symb && Object.keys(symb).length > 0) {
              this.simbMoeda = symb[Object.keys(symb)[0]].symbol;
            };
            const iso = paisFiltrado[0]?.cca2;
            if (iso) {
              this.bp.buscarInformacoesDoPais(iso).subscribe(res2 => {
                if (!res2 || res2.length === 0) {
                  this.paisInexistente = true;
                  this.infoPais = undefined;
                } else {
                  this.infoPais = res2[0];
                  const unidMonet = res2[0]?.["unidades-monetarias"];
                  if (unidMonet && unidMonet.length > 0) {
                    this.codMoeda = unidMonet[0]?.id["ISO-4217-ALPHA"];
                    this.nomeMoeda = unidMonet[0]?.nome;
                  };
                };
              });
            };
          } else {
            this.pesquisarPais = res;
            const symb = res[0]?.currencies;
            if (symb && Object.keys(symb).length > 0) {
              this.simbMoeda = symb[Object.keys(symb)[0]].symbol;
            };
            const iso = res[0]?.cca2;
            if (iso) {
              this.bp.buscarInformacoesDoPais(iso).subscribe(res2 => {
                if (!res2 || res2.length === 0) {
                  this.paisInexistente = true
                  this.infoPais = undefined;
                } else {
                  this.infoPais = res2[0];
                  const unidMonet = res2[0]?.["unidades-monetarias"];
                  if (unidMonet && unidMonet.length > 0) {
                    this.codMoeda = unidMonet[0]?.id["ISO-4217-ALPHA"];
                    this.nomeMoeda = unidMonet[0]?.nome;
                  };
                };
              });
            } else {
              this.paisInexistente = true;
              this.pesquisarPais = undefined;
              this.infoPais = undefined;
            };
          };
        } else {
          this.paisInexistente = true;
          this.pesquisarPais = undefined;
          this.infoPais = undefined;
        };
      };
    });
  };
};