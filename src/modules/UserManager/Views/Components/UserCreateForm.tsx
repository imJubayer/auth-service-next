import {useCreateNewUserMutation} from "@/modules/UserManager/Store/UserManagerApiSlice";
import Dump from "@/components/Dump";

export default function UserCreateForm() {

    const [
        createNewUser,
        {
            data: createdUserData,
            isLoading: userCreateIsLoading,
            isError: userCreateIsError,
            error: userCreateError,
            isSuccess: userCreateIsSuccess
        }
    ] = useCreateNewUserMutation()

    function handleSubmit(e) {
        e.preventDefault()

        const userFormData = {
            name: "hasan",
            email: 'saifur.dohs@gmail.com',
            password: 'password'
        }

        createNewUser(userFormData)
    }

    return (
        <div>
            User Create Form

            { userCreateIsSuccess && <div>User Is Created</div> }
            { userCreateIsError && <Dump data={userCreateError} /> }

            <form onSubmit={handleSubmit}>

                { userCreateIsLoading && (<div>Creating your user</div>) }

                <button type={'submit'} disabled={userCreateIsLoading}>Submit</button>
            </form>
        </div>
    )
}
