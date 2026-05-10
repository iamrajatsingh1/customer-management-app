import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen } from "@testing-library/react";
import { CustomerList } from "../CustomerList";
import * as customerApi from "../api";
import { renderWithProviders } from "../../../test/test-utils";

// Mock the API module
vi.mock("../api");

const mockCustomers = [
    {
        id: 1,
        firstName: "Rajat",
        lastName: "Singh",
        dateOfBirth: "1990-01-15",
        createdAt: "2024-05-10T10:00:00",
    },
    {
        id: 2,
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1985-03-20",
        createdAt: "2024-05-10T11:00:00",
    },
];

describe("CustomerList", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the customers section with title", () => {
        vi.mocked(customerApi.getCustomers).mockResolvedValue(
            mockCustomers as any
        );

        renderWithProviders(<CustomerList />);

        expect(screen.getByRole("heading", { name: /Customers/i })).toBeInTheDocument();
        expect(screen.getByText(/All registered customers/i)).toBeInTheDocument();
    });

    it("displays loading state while fetching data", () => {
        // Mock with a never-resolving promise to simulate loading
        vi.mocked(customerApi.getCustomers).mockImplementationOnce(
            () => new Promise(() => { })
        );

        renderWithProviders(<CustomerList />);

        expect(document.querySelector(".animate-pulse"))
            .toBeInTheDocument();
    });

    it("displays error state when API fails", async () => {
        vi.mocked(customerApi.getCustomers).mockRejectedValue(
            new Error("API Error")
        );

        renderWithProviders(<CustomerList />);

        // Wait for error state to appear
        expect(
            await screen.findByText(/failed to load customers/i)
        ).toBeInTheDocument();
    });

    it("displays empty state when no customers exist", async () => {
        vi.mocked(customerApi.getCustomers).mockResolvedValue(
            [] as any
        );

        renderWithProviders(<CustomerList />);

        expect(
            await screen.findByText(/no customers yet/i)
        ).toBeInTheDocument();
    });

    it("displays customer data in the table", async () => {
        vi.mocked(customerApi.getCustomers).mockResolvedValue(
            mockCustomers as any
        );

        renderWithProviders(<CustomerList />);

        // Check for customer names
        expect(await screen.findByText("Rajat Singh"))
            .toBeInTheDocument();

        expect(await screen.findByText("John Doe"))
            .toBeInTheDocument();

        // Check for date of birth (formatted)
        expect(screen.getByText("15/01/1990")).toBeInTheDocument();
        expect(screen.getByText("20/03/1985")).toBeInTheDocument();
    });
});
