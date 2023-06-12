import Todo from "../Components/TodoForm.jsx";
import {TodoState} from "../Context/TodoProvider.jsx";

const TodoPage = () => {
    const {user} = TodoState();

    if(user){
        return (
            <>
                <Todo/>
            </>
        )
    }
}

export default TodoPage;