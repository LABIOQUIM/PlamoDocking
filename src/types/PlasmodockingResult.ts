interface Ligante {
    ligante_name: string;
    ligante_energia: string;
    run: string;
  }
  
  interface Resultado {
    receptor_name: string;
    ligante_original: string;
    grid_center: string;
    grid_size: string;
    energia_original: string;
    rmsd_redocking: string;
    ligantes: Ligante[];
  }
  
  interface Dados {
    id: number;
    nome: string;
    user: string;
    ligante: string;
    data: string;
    redocking: boolean;
    status: string;
    type: string;
    formatted_data: string;
    resultado_final: Resultado[];
  }
  
  export interface PlasmodockingResult {
    dados: Dados;
  }
  