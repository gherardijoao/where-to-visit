import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { CountrySelect } from "./CountrySelect";
import { getCountries } from "../../services/countriesService";

vi.mock("../../services/countriesService", () => ({
  getCountries: vi.fn(() =>
    Promise.resolve([
      {
        cca2: "BR",
        translations: { por: { common: "Brasil" } },
        flags: { png: "", svg: "", alt: "" },
      },
    ])
  ),
}));

describe("CountrySelect", () => {
  it("deve renderizar o componente corretamente", async () => {
    render(<CountrySelect value="" onChange={() => {}} />);
    expect(await screen.findByText("Selecione um país...")).toBeInTheDocument();
  });

  it("deve selecionar um país", async () => {
    const mockOnChange = vi.fn();
    render(<CountrySelect value="" onChange={mockOnChange} />);

    fireEvent.click(await screen.findByText("Selecione um país..."));
    fireEvent.click(await screen.findByText("Brasil"));

    expect(mockOnChange).toHaveBeenCalledWith(
      "BR",
      "Brasil",
      expect.any(String)
    );
  });
});
