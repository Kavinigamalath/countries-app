// src/tests/DeleteAccount.integration.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeleteAccount from "../pages/DeleteAccount";
import { AuthContext } from "../contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";

//  Mocking the MUI Dialog to avoid transition warnings and simplify test rendering
jest.mock("@mui/material/Dialog", () => ({
  __esModule: true,
  default: ({ open, children }) => (open ? <div>{children}</div> : null),
}));

describe("DeleteAccount Integration", () => {
  const mockDeleteAccount = jest.fn(); // 🔧 Mocked function to simulate account deletion logic

  beforeEach(() => {
    //  Reset mock before each test to ensure isolation
    mockDeleteAccount.mockReset();
  });

  //  Utility function to render the component with context and routing
  const renderWithContext = () =>
    render(
      <AuthContext.Provider value={{ deleteAccount: mockDeleteAccount }}>
        <MemoryRouter>
          <DeleteAccount />
        </MemoryRouter>
      </AuthContext.Provider>
    );

  test("renders Delete Account page", () => {
    renderWithContext();

    //  Check static content is rendered properly
    expect(screen.getByText(/Delete Account/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Permanently delete your account/i)
    ).toBeInTheDocument();
  });

  test("opens confirmation dialog and cancels", () => {
    renderWithContext();

    //  Simulate user clicking the 'Delete My Account' button
    fireEvent.click(screen.getByRole("button", { name: /delete my account/i }));

    //  Confirmation dialog should appear
    expect(screen.getByText(/are you absolutely sure/i)).toBeInTheDocument();

    //  Simulate user canceling the deletion
    fireEvent.click(screen.getByText(/no, keep my account/i));

    //  The dialog should disappear after canceling
    expect(screen.queryByText(/are you absolutely sure/i)).not.toBeInTheDocument();
  });

  test("confirms account deletion", async () => {
    //  Mock successful deletion
    mockDeleteAccount.mockResolvedValueOnce();

    renderWithContext();

    //  Trigger confirmation dialog
    fireEvent.click(screen.getByRole("button", { name: /delete my account/i }));
    fireEvent.click(screen.getByText(/yes, delete/i));

    //  Expect the deletion function to be called once
    await waitFor(() => {
      expect(mockDeleteAccount).toHaveBeenCalledTimes(1);
    });
  });

  test("shows error on failed deletion", async () => {
    //  Mock a rejected promise (failed deletion)
    mockDeleteAccount.mockRejectedValueOnce(new Error("Failed"));

    renderWithContext();

    //  Simulate user confirming deletion
    fireEvent.click(screen.getByRole("button", { name: /delete my account/i }));
    fireEvent.click(screen.getByText(/yes, delete/i));

    //  Check if error message is shown
    await waitFor(() => {
      expect(screen.getByText(/failed to delete account/i)).toBeInTheDocument();
    });
  });
});
