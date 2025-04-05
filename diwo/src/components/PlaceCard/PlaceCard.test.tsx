import { render, screen, fireEvent } from "@testing-library/react";
import { PlaceCard } from "./PlaceCard";
import { vi } from "vitest";

const mockPlace = {
  id: "1",
  country: "Brasil",
  countryCode: "BR",
  flag: "🇧🇷",
  local: "Rio de Janeiro",
  meta: "12/2025",
};

describe("PlaceCard", () => {
  it("deve renderizar as informações corretamente", () => {
    render(<PlaceCard place={mockPlace} />);
    expect(screen.getByText("Rio de Janeiro")).toBeInTheDocument();
  });

  it("deve clicar nos botões de ação", () => {
    const mockEdit = vi.fn();
    const mockDelete = vi.fn();

    render(
      <PlaceCard place={mockPlace} onEdit={mockEdit} onDelete={mockDelete} />
    );

    fireEvent.click(screen.getAllByRole("button")[0]);
    fireEvent.click(screen.getAllByRole("button")[1]);

    expect(mockEdit).toHaveBeenCalled();
    expect(mockDelete).toHaveBeenCalled();
  });
});
