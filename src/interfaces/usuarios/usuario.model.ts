export interface Usuario {
  id_usuarios?: number;
  email?: string;
  telefone?: string;
  nome_completo?: string;
  cpf?: string;
  senha?: string;
  admin?: 0 | 1;
  pergunta_secreta?: string
  resposta_secreta?: string;

  id_usuarios_endereco?: number;
  id_endereco_atual?: number;

  cep?: string;
  pais?: string;
  estado?: string;
  cidade?: string;
  bairro?: string;
  tipo_logradouro?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  ponto_referencia?: string;
}
