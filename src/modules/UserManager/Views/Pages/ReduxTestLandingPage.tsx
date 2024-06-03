import UserCreateForm from "@/modules/UserManager/Views/Components/UserCreateForm";
import TableUsersList from "@/modules/UserManager/Views/Components/TableUsersList";

export default function ReduxTestLandingPage(){
    return (
        <div>

            <h1>Redux Test Landing Page</h1>

            <UserCreateForm />

            <TableUsersList />

        </div>
    )
}
