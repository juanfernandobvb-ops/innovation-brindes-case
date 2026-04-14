"use client";
import { useState } from "react";
import { loginRequest } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await loginRequest({
        email,
        senha,
      });

      if (response.status === 0 || !response.token_de_acesso) {
        alert(response.message || "Erro ao fazer login");
        return;
      }

      const token = response.token_de_acesso;

      // 👉 salva o token primeiro
      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      document.cookie = `token=${token}; path=/; max-age=86400`;

      // 👉 DEPOIS redireciona
      router.replace("/produtos");
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com a API");
    }
  }

  return (
    <main
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/login-bg.jpg')" }}
    >
      {/* overlay melhorado */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-3xl">
          {/* título corrigido */}
          <h1 className="mb-8 text-center text-3xl font-bold text-white drop-shadow-md md:text-4xl">
            Bem-vindo a Innovation Brindes
          </h1>

          {/* card ajustado */}
          <div className="mx-auto w-full max-w-2xl rounded-2xl bg-lime-500/95 px-6 py-8 shadow-xl md:px-10 md:py-10">
            <form
              onSubmit={handleSubmit}
              className="mx-auto w-full max-w-lg space-y-5"
            >
              <div>
                <label htmlFor="email" className="sr-only">
                  Usuário
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="Usuário"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full bg-white px-5 py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-white/80"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full rounded-full bg-white px-5 py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-white/80"
                />
              </div>

              {/* aqui removemos o drop-shadow */}
              <div className="flex items-center justify-between gap-4 text-xs text-white md:text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-white"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Manter logado</span>
                </label>

                <a href="#" className="transition hover:underline">
                  Esqueceu a senha?
                </a>
              </div>

              {/* botão melhorado */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="min-w-44 rounded-full bg-white px-8 py-3 font-semibold text-lime-600 shadow-md transition hover:bg-lime-50"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
