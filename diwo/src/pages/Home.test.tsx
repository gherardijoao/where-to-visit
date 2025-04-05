import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { Home } from "./Home";
import { getPlaces, addPlace, deletePlace } from "../services/countriesService";

vi.mock("../services/countriesService", () => ({
  getPlaces: vi.fn(() => Promise.resolve([])),
  addPlace: vi.fn(() =>
    Promise.resolve({
      id: "2",
      local: "Teste",
      country: "Brasil",
      countryCode: "BR",
      flag: "🇧🇷",
      meta: "12/2025",
    })
  ),
  deletePlace: vi.fn(() => Promise.resolve()),
}));

vi.mock("../components/CountrySelect/CountrySelect", () => ({
  CountrySelect: ({ onChange }: any) => (
    <button onClick={() => onChange("BR", "Brasil", "🇧🇷")}>
      Selecionar País
    </button>
  ),
}));

describe("Home", () => {
  beforeEach(() => vi.clearAllMocks());

  it("deve renderizar corretamente", async () => {
    render(<Home />);
    expect(await screen.findByText("Adicionar")).toBeInTheDocument();
  });

  it("deve adicionar um lugar", async () => {
    render(<Home />);

    fireEvent.click(screen.getByText("Selecionar País"));

    fireEvent.change(
      screen.getByPlaceholderText("Digite o local que deseja conhecer"),
      {
        target: { value: "Teste" },
      }
    );

    fireEvent.change(screen.getByPlaceholderText("mês/ano"), {
      target: { value: "12/2025" },
    });

    fireEvent.click(screen.getByText("Adicionar"));

    await waitFor(() => {
      expect(addPlace).toHaveBeenCalled();
    });
  });

  it("deve deletar um lugar", async () => {
    (getPlaces as any).mockResolvedValueOnce([
      {
        id: "1",
        local: "Teste",
        country: "Brasil",
        countryCode: "BR",
        flag: "🇧🇷",
        meta: "12/2025",
      },
    ]);

    render(<Home />);

    await screen.findByText("Teste");

    fireEvent.click(screen.getByTestId("delete-button"));

    await waitFor(() => {
      expect(deletePlace).toHaveBeenCalledWith("1");
    });
  });
});
