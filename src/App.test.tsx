import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "./App";

describe("App Form Submission", () => {
  it("submit form on holiday", async () => {
    const mockDate = new Date(2025, 4, 1);
    vi.setSystemTime(mockDate);

    render(<App />);
    const submitButton = screen.getByText("Send Application");
    expect(submitButton).toBeDisabled();

    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "John" } });

    const lastNameInput = screen.getByLabelText("Last Name");
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "johndoe@email.com" } });

    const fileInput = screen.getByLabelText("Photo") as HTMLInputElement;
    const file = new File(["test content"], "test.png", {
      type: "image/png",
    });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText("Date")).toBeInTheDocument();
      expect(screen.getByText("May 2025")).toBeInTheDocument();
    });

    const may1Button = screen.getByText("1", {
      selector: 'button[name="day"]',
    });
    expect(may1Button).toBeInTheDocument();
    fireEvent.click(may1Button);
    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("Error")).toBeInTheDocument();
    });
  });

  it("submit form on normal day", async () => {
    const mockDate = new Date(2025, 4, 1);
    vi.setSystemTime(mockDate);

    render(<App />);
    const submitButton = screen.getByText("Send Application");
    expect(submitButton).toBeDisabled();

    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "Jane" } });

    const lastNameInput = screen.getByLabelText("Last Name");
    fireEvent.change(lastNameInput, { target: { value: "Smith" } });

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "janesmith@email.com" } });

    const fileInput = screen.getByLabelText("Photo") as HTMLInputElement;
    const file = new File(["profile photo"], "profile.jpg", {
      type: "image/jpeg",
    });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText("Date")).toBeInTheDocument();
      expect(screen.getByText("May 2025")).toBeInTheDocument();
    });

    const may7Button = screen.getByText("7", {
      selector: 'button[name="day"]',
    });
    expect(may7Button).toBeInTheDocument();
    fireEvent.click(may7Button);

    await waitFor(() => {
      expect(screen.getByText("Time")).toBeInTheDocument();
    });

    const timeOption = screen.getByLabelText("14:00");
    fireEvent.click(timeOption);

    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Error")).toBeInTheDocument();
    });
  });
});
