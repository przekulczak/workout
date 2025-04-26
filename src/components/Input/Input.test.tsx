import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Input } from "./index";

describe("Input Component", () => {
  it("renders with the correct label", () => {
    render(<Input label="Email" id="email" name="email" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders with email type", () => {
    render(
      <Input label="Email Address" id="email" name="email" type="email" />
    );
    const input = screen.getByLabelText("Email Address");
    expect(input).toHaveAttribute("type", "email");
  });

  it("passes value to input", () => {
    render(
      <Input label="Username" id="username" name="username" value="testuser" />
    );
    const input = screen.getByLabelText("Username");
    expect(input).toHaveValue("testuser");
  });
});
