export class PesquisarPais {
    cca2: string;
    flag: string;
};

export class InformacoesDoPais {
    id: {
        "ISO-3166-1-ALPHA-2": string;
    };
    nome: {
        abreviado: string;
    };
    localizacao: {
        regiao: {
            nome: string;
        };
        "sub-regiao": {
            nome: string;
        };
    };
    linguas: [{
        nome: string;
    }];
    "unidades-monetarias": [{
        id: {
            "ISO-4217-ALPHA": string;
        }
        nome: string;
    }]
}