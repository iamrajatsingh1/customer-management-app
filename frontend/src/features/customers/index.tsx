import { CustomerForm } from "./CustomerForm"
import { CustomerList } from "./CustomerList"

export const CustomersModule = () => {
    return (
        <div>
            <CustomerForm />
            <CustomerList />
        </div>
    );
}