import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { MetaInput } from "./MetaInput";

describe("MetaInput", () => {
  it("deve renderizar o componente corretamente", () => {
    render(<MetaInput value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText("mês/ano")).toBeInTheDocument();
  });

  it("deve permitir apenas meses válidos (01-12)", () => {
    const mockOnChange = vi.fn();
    render(<MetaInput value="" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText("mês/ano");

    // Teste com mês válido
    fireEvent.change(input, { target: { value: "12/2023" } });
    expect(mockOnChange).toHaveBeenCalledWith("12/2023");

    // Teste com mês inválido
    mockOnChange.mockClear();
    fireEvent.change(input, { target: { value: "13/2023" } });
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("deve mostrar o valor atual corretamente", () => {
    render(<MetaInput value="05/2025" onChange={() => {}} />);
    expect(screen.getByDisplayValue("05/2025")).toBeInTheDocument();
  });
});
