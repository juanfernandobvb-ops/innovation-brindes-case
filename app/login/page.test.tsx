import { render, screen } from "@testing-library/react";
import LoginPage from "./page";
import { vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

vi.mock("@/services/auth", () => ({
  loginRequest: vi.fn(),
}));

describe("LoginPage", () => {
  it("renderiza os campos e o botão de login", () => {
    render(<LoginPage />);

    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /login/i }),
    ).toBeInTheDocument();
  });
});