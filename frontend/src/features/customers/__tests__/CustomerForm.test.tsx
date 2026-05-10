import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CustomerForm } from "../CustomerForm";
import * as customerApi from "../api";
import { renderWithProviders } from "../../../test/test-utils";

// Mock the API module
vi.mock("../api");

// const createTestQueryClient = () =>
//     new QueryClient({
//         defaultOptions: {
//             queries: {
//                 retry: false,
//             },
//             mutations: {
//                 retry: false,
//             },
//         },
//     });

// const renderWithProviders = (component: React.ReactElement) => {
//     const testQueryClient = createTestQueryClient();

//     return render(
//         <QueryClientProvider client={testQueryClient}>
//             {component}
//         </QueryClientProvider>
//     );
// };

describe("CustomerForm", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the form with all required fields", () => {
        renderWithProviders(<CustomerForm />);

        expect(screen.getByRole("heading", { name: /Create Customer/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/First name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Last name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Date of birth/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Create customer/i })).toBeInTheDocument();
    });

    it("displays validation error for empty first name", async () => {
        const user = userEvent.setup();
        renderWithProviders(<CustomerForm />);

        const submitButton = screen.getByRole("button", { name: /Create customer/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
        });
    });

    it("displays validation error for empty last name", async () => {
        const user = userEvent.setup();
        renderWithProviders(<CustomerForm />);

        const firstNameInput = screen.getByLabelText(/First name/i);
        await user.type(firstNameInput, "Rajat");

        const submitButton = screen.getByRole("button", { name: /Create customer/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
        });
    });

    it("displays validation error for empty date of birth", async () => {
        const user = userEvent.setup();
        renderWithProviders(<CustomerForm />);

        const firstNameInput = screen.getByLabelText(/First name/i);
        const lastNameInput = screen.getByLabelText(/Last name/i);

        await user.type(firstNameInput, "Rajat");
        await user.type(lastNameInput, "Singh");

        const submitButton = screen.getByRole("button", { name: /Create customer/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Date of birth is required/i)).toBeInTheDocument();
        });
    });

    it("displays validation error for max length exceeded", async () => {
        const user = userEvent.setup();
        renderWithProviders(<CustomerForm />);

        const firstNameInput = screen.getByLabelText(/First name/i);
        const longName = "a".repeat(101);

        await user.type(firstNameInput, longName);

        const submitButton = screen.getByRole("button", { name: /Create customer/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Max 100 characters/i)).toBeInTheDocument();
        });
    });

    it("submits form with valid data and shows success message", async () => {
        const user = userEvent.setup();
        const mockResponse = {
            id: 1,
            firstName: "Rajat",
            lastName: "Singh",
            dateOfBirth: "1990-01-15",
            createdAt: "2024-05-10T10:00:00",
        };

        vi.mocked(customerApi.createCustomer).mockResolvedValue(mockResponse);

        renderWithProviders(<CustomerForm />);

        const firstNameInput = screen.getByLabelText(/First name/i);
        const lastNameInput = screen.getByLabelText(/Last name/i);
        const dateOfBirthInput = screen.getByLabelText(/Date of birth/i);
        const submitButton = screen.getByRole("button", { name: /Create customer/i });

        await user.type(firstNameInput, "Rajat");
        await user.type(lastNameInput, "Singh");
        await user.type(dateOfBirthInput, "1990-01-15");
        await user.click(submitButton);

        await waitFor(() => {
            expect(
                screen.getByText(/Customer created successfully \(ID: 1\)/i)
            ).toBeInTheDocument();
        });

        expect(vi.mocked(customerApi.createCustomer)).toHaveBeenCalledTimes(1);

        expect(
            vi.mocked(customerApi.createCustomer).mock.calls[0][0]
        ).toEqual({
            firstName: "Rajat",
            lastName: "Singh",
            dateOfBirth: "1990-01-15",
        });
    });

    it("clears form after successful submission", async () => {
        const user = userEvent.setup();
        const mockResponse = {
            id: 1,
            firstName: "Rajat",
            lastName: "Singh",
            dateOfBirth: "1990-01-15",
            createdAt: "2024-05-10T10:00:00",
        };

        vi.mocked(customerApi.createCustomer).mockResolvedValue(mockResponse);

        renderWithProviders(<CustomerForm />);

        const firstNameInput = screen.getByLabelText(/First name/i) as HTMLInputElement;
        const lastNameInput = screen.getByLabelText(/Last name/i) as HTMLInputElement;
        const dateOfBirthInput = screen.getByLabelText(/Date of birth/i) as HTMLInputElement;
        const submitButton = screen.getByRole("button", { name: /Create customer/i });

        await user.type(firstNameInput, "Rajat");
        await user.type(lastNameInput, "Singh");
        await user.type(dateOfBirthInput, "1990-01-15");
        await user.click(submitButton);

        await waitFor(() => {
            expect(
                screen.getByText(/Customer created successfully \(ID: 1\)/i)
            ).toBeInTheDocument();
        });

        // Form fields should be cleared
        expect(firstNameInput.value).toBe("");
        expect(lastNameInput.value).toBe("");
        expect(dateOfBirthInput.value).toBe("");
    });

    it("displays error message on API failure", async () => {
        const user = userEvent.setup();
        const mockError = {
            response: {
                data: {
                    message: "Failed to create customer",
                    validationErrors: [
                        {
                            field: "firstName",
                            message: "First name already exists",
                        },
                    ],
                },
            },
        };

        vi.mocked(customerApi.createCustomer).mockRejectedValue(mockError);

        renderWithProviders(<CustomerForm />);

        const firstNameInput = screen.getByLabelText(/First name/i);
        const lastNameInput = screen.getByLabelText(/Last name/i);
        const dateOfBirthInput = screen.getByLabelText(/Date of birth/i);
        const submitButton = screen.getByRole("button", { name: /Create customer/i });

        await user.type(firstNameInput, "Rajat");
        await user.type(lastNameInput, "Singh");
        await user.type(dateOfBirthInput, "1990-01-15");
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Failed to create customer/i)).toBeInTheDocument();
            expect(screen.getByText(/firstName: First name already exists/i)).toBeInTheDocument();
        });
    });

    it("disables submit button while creating customer", async () => {
        const user = userEvent.setup();
        vi.mocked(customerApi.createCustomer).mockImplementationOnce(
            () => new Promise(() => { }) // Never resolves
        );

        renderWithProviders(<CustomerForm />);

        const firstNameInput = screen.getByLabelText(/First name/i);
        const lastNameInput = screen.getByLabelText(/Last name/i);
        const dateOfBirthInput = screen.getByLabelText(/Date of birth/i);
        const submitButton = screen.getByRole("button", { name: /Create customer/i });

        await user.type(firstNameInput, "Rajat");
        await user.type(lastNameInput, "Singh");
        await user.type(dateOfBirthInput, "1990-01-15");
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByRole("button", { name: /Creating\.\.\./i })).toBeDisabled();
        });
    });
});
