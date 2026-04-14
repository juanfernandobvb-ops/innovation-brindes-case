const BASE_URL =
  "https://apihomolog.innovationbrindes.com.br/api/innova-dinamica";

export type LoginPayload = {
  email: string;
  senha: string;
};

export type LoginResponse = {
  status: number;
  message: string;
  token_de_acesso?: string;
  dados_usuario?: {
    codigo_usuario: string;
    nome_usuario: string;
    codigo_grupo: string;
    nome_grupo: string;
  };
};

export async function loginRequest(
  payload: LoginPayload
): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/login/acessar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Não foi possível realizar o login.");
  }

  const data: LoginResponse = await response.json();
  return data;
}