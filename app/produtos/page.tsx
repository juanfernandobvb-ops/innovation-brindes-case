"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getProductsWithFilter,
  type Product,
} from "@/services/products";
import { useState, useEffect } from "react";
import { useFavoritesStore } from "@/store/favorites.store";

export default function ProdutosPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [sortBy, setSortBy] = useState("default");
  const { favorites, loadFavorites, toggleFavorite, isFavorite } =
    useFavoritesStore();
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const ITEMS_PER_PAGE = 8;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedProduct(null);
      }
    }

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // useEffect(() => {
  //   setVisibleCount(ITEMS_PER_PAGE);
  // }, [debouncedSearch, sortBy, showFavoritesOnly]);

  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products", debouncedSearch],
    queryFn: () =>
      debouncedSearch.trim()
        ? getProductsWithFilter(debouncedSearch.trim())
        : getProducts(),
  });

  const sortedProducts = [...(products || [])].sort((a, b) => {
    if (sortBy === "name-asc") {
      return a.nome.localeCompare(b.nome);
    }

    if (sortBy === "name-desc") {
      return b.nome.localeCompare(a.nome);
    }

    if (sortBy === "price-asc") {
      return Number(a.preco) - Number(b.preco);
    }

    if (sortBy === "price-desc") {
      return Number(b.preco) - Number(a.preco);
    }

    return 0;
  });

  const filteredProducts = showFavoritesOnly
    ? sortedProducts.filter((p) => favorites.includes(p.codigo))
    : sortedProducts;

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMoreProducts = visibleCount < filteredProducts.length;

  function handleLoadMore() {
    setIsLoadingMore(true);

    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
      setIsLoadingMore(false);
    }, 500);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    router.replace("/login");
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setVisibleCount(ITEMS_PER_PAGE);
  }

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSortBy(e.target.value);
    setVisibleCount(ITEMS_PER_PAGE);
  }

  function handleToggleFavoritesOnly() {
    setShowFavoritesOnly((prev) => !prev);
    setVisibleCount(ITEMS_PER_PAGE);
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />
            <div className="h-10 w-24 animate-pulse rounded-full bg-gray-200" />
          </div>

          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="h-10 w-full max-w-md animate-pulse rounded-full bg-gray-200" />
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="h-10 w-40 animate-pulse rounded-full bg-gray-200" />
              <div className="h-10 w-32 animate-pulse rounded-full bg-gray-200" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl bg-white p-4 shadow-md"
              >
                <div className="mb-4 h-56 animate-pulse rounded-xl bg-gray-200" />
                <div className="space-y-3">
                  <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
                  <div className="h-6 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                  <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
                  <div className="h-10 w-full animate-pulse rounded-full bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100 px-4">
        <p className="text-center text-red-600">
          {error instanceof Error
            ? error.message
            : "Erro ao carregar produtos."}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => refetch()}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Tentar novamente
          </button>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Sair
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Sair
          </button>
        </div>

        {/* 🔍 INPUT DE BUSCA AQUI */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Buscar produto..."
            value={search}
            onChange={handleSearchChange}
            className="w-full max-w-md rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-800 placeholder:text-gray-400 outline-none shadow-sm focus:ring-2 focus:ring-lime-500"
          />

          <select
            value={sortBy}
            onChange={handleSortChange}
            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-800 outline-none shadow-sm focus:ring-2 focus:ring-lime-500"
          >
            <option value="default">Ordenar por</option>
            <option value="name-asc">Nome A → Z</option>
            <option value="name-desc">Nome Z → A</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
          </select>
          {/* ⭐ FILTRO FAVORITOS */}
          <button
            onClick={handleToggleFavoritesOnly}
            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm hover:bg-gray-100"
          >
            {showFavoritesOnly ? "Mostrar todos" : "Só favoritos"}
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white">
            <p className="text-center text-gray-500">
              Nenhum produto encontrado para sua busca.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <article
                key={product.codigo}
                className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md"
              >
                <button
                  onClick={() => toggleFavorite(product.codigo)}
                  className="absolute right-3 top-3 rounded-full bg-white/90 p-1 text-xl shadow-sm"
                >
                  {isFavorite(product.codigo) ? "❤️" : "🤍"}
                </button>

                <img
                  src={product.imagem}
                  alt={product.nome}
                  className="h-56 w-full object-contain bg-gray-50 p-4"
                />

                <div className="flex flex-1 flex-col gap-3 p-4">
                  <span className="inline-flex w-fit rounded-full bg-lime-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    EXCLUSIVO!
                  </span>

                  <h2 className="line-clamp-2 min-h-[60px] text-lg font-semibold text-gray-800">
                    {product.nome}
                  </h2>

                  <p className="text-sm text-gray-500">
                    Código: {product.codigo}
                  </p>

                  <p className="pt-1 text-lg font-bold text-lime-600">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(product.preco))}
                  </p>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="mt-auto w-full rounded-full bg-lime-600 px-4 py-2 font-semibold text-white shadow-sm transition hover:scale-[1.02] active:scale-[0.98]"
                  >
                    CONFIRA
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      {hasMoreProducts && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="rounded-full bg-lime-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoadingMore ? "Carregando..." : "Carregar mais"}
          </button>
        </div>
      )}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2
                id="product-modal-title"
                className="text-2xl font-bold text-gray-800"
              >
                {selectedProduct.nome}
              </h2>

              <button
                onClick={() => setSelectedProduct(null)}
                className="rounded-full px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-100"
              >
                Fechar
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center justify-center rounded-2xl bg-gray-50 p-4">
                <img
                  src={selectedProduct.imagem}
                  alt={selectedProduct.nome}
                  className="max-h-72 w-full object-contain"
                />
              </div>

              <div className="space-y-3">
                <span className="inline-block rounded-full bg-lime-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  EXCLUSIVO!
                </span>

                <p className="text-sm text-gray-500">
                  Código: {selectedProduct.codigo}
                </p>

                <p className="text-sm text-gray-500">
                  Referência: {selectedProduct.referencia}
                </p>

                <p className="text-sm text-gray-500">
                  Categoria: {selectedProduct.codigo_categoria}
                </p>

                <p className="text-2xl font-bold text-lime-600">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(selectedProduct.preco))}
                </p>

                <div>
                  <h3 className="mb-1 text-sm font-semibold text-gray-700">
                    Descrição
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {selectedProduct.descricao || "Sem descrição disponível."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
