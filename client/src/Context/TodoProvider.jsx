import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const todoContext = createContext();

const TodoProvider = ({children}) => {
    const [user, setUser] = useState();
    const [selectedTask, setSelectedTask] = useState();
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo);
        if (!userInfo) {
            navigate('/');
        }
    }, [navigate]);
    return (
        <todoContext.Provider value={
            {
                user,
                setUser,
                selectedTask,
                setSelectedTask,
                tasks,
                setTasks,
            }
        }
        >
            {children}
        </todoContext.Provider>
    )
}

export const TodoState = () => {
    return useContext(todoContext);
}

export default TodoProvider;