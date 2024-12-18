import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FazerConversaoService } from '../services/fazer-conversao.service';

@Component({
  selector: 'app-converter-moedas',
  templateUrl: './converter-moedas.component.html',
  styleUrl: './converter-moedas.component.css'
})

export class ConverterMoedasComponent implements OnChanges {
  @Input() codigoMoeda: string | undefined;
  @Input() nomeMoeda: string | undefined;
  valorConvertido: string | undefined;
  conversaoFeita: boolean = false;
  moedaInexistente: boolean = false;

  constructor(private fc: FazerConversaoService) {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['codigoMoeda'] && !changes['codigoMoeda'].firstChange) {
      this.valorConvertido = undefined;
      this.conversaoFeita = false;
      this.moedaInexistente = false;
    };
  };

  fazerConversao() {
    this.conversaoFeita = true;
    this.realizarConversao();
  };

  realizarConversao() {
    if (this.codigoMoeda) {
      this.fc.fazerConversaoMoeda(this.codigoMoeda).subscribe({
        next: (res) => {
          const moedas = `${this.codigoMoeda}_BRL`;
          if (!res || !res[moedas]) {
            this.moedaInexistente = true;
            this.valorConvertido = undefined;
          } else {
            if (res[moedas]) {
              const valor = parseFloat(res[moedas].price);
              this.valorConvertido = valor.toFixed(2);
              this.moedaInexistente = false;
            };
          };
        }, error: () => {
          this.moedaInexistente = true;
          this.valorConvertido = undefined;
        }
      });
    };
  };
};