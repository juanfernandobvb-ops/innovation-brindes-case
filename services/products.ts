const BASE_URL =
  "https://apihomolog.innovationbrindes.com.br/api/innova-dinamica";

export type Product = {
  codigo: string;
  nome: string;
  referencia: string;
  codigo_categoria: string;
  imagem: string;
  preco: string;
  descricao: string;
};

function getStoredToken() {
  if (typeof window === "undefined") return null;

  return (
    localStorage.getItem("token") || sessionStorage.getItem("token") || null
  );
}

export async function getProducts(): Promise<Product[]> {
  const token = getStoredToken();

  if (!token) {
    throw new Error("Token não encontrado.");
  }

  const response = await fetch(`${BASE_URL}/produtos/listar`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos.");
  }

  const data: Product[] = await response.json();
  return data;
}

export async function getProductsWithFilter(
  search: string
): Promise<Product[]> {
  const token = getStoredToken();

  if (!token) {
    throw new Error("Token não encontrado.");
  }

  const trimmedSearch = search.trim();
  const isNumericSearch = /^\d+$/.test(trimmedSearch);

  const response = await fetch(`${BASE_URL}/produtos/listar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nome_produto: isNumericSearch ? "" : trimmedSearch,
      codigo_produto: isNumericSearch ? trimmedSearch : "",
    }),
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao buscar produtos.");
  }

  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    const errorText = await response.text();
    throw new Error(errorText || "Resposta inválida da API.");
  }

  const data: Product[] = await response.json();
  return data;
}