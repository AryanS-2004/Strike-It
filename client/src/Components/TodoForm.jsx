import React, {useEffect, useState} from 'react';
import {TodoState} from "../Context/TodoProvider.jsx";
import {
    Box,
    Checkbox,
    Container,
    Menu,
    MenuButton,
    MenuItem,
    MenuList, Tab, TabList,
    Tabs,
    Text,
    useToast,
    VStack
} from "@chakra-ui/react";
import axios from "axios";
import {ChevronDownIcon, HamburgerIcon} from "@chakra-ui/icons";

const Todo = () => {
    const [todo, setTodo] = useState('');
    const {user, tasks, setTasks} = TodoState();
    const [edit, setEdit] = useState(false);
    const toast = useToast();
    const [check, setCheck] = useState(true);
    const [selectedTask, setSelectedTask] = useState("");
    const [val, setVal] = useState('1');

    const handleSubmit = async () => {
        if (todo === "") {
            toast({
                title: "Please enter a task!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
        }
        try {

            const config = {
                headers: {
                    authorization: `Bearer ${user.token}`,
                    'Content-type': 'application/json'
                }
            }
            const newtask = await axios.post(`${import.meta.env.VITE_API_URL}/api/task/`, {
                task: todo
            }, config);
            setTodo("");
            setTasks([...tasks, newtask]);
            setCheck(!check);
        } catch (err) {
            toast({
                title: "Error Occured!",
                description: err.message,
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });

        }
    };
    const fetchTask = async () => {
        try {
            const config = {
                headers: {
                    authorization: `Bearer ${user.token}`,
                    'Content-type': 'application/json'
                }
            }
            const fetchedTask = await axios.get(`${import.meta.env.VITE_API_URL}/api/task/allTask`, config);
            console.log(fetchedTask.data);
            // console.log(user);
            setTasks([]);
            if(val==="1"){
                const pendingTask = fetchedTask.data.filter((task) => task.status ==="incomplete");
                console.log(pendingTask);
                setTasks(pendingTask);
            }else if(val==="2"){
                setTasks(fetchedTask.data);
            }else{
                const completedTask = fetchedTask.data.filter((task) => task.status === "completed");
                console.log(completedTask);
                setTasks(completedTask);
            }
            // setTasks(fetchedTask.data);

        } catch (err) {
            toast({
                title: "Error Occured!",
                description: err.message,
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
        }
    }


    useEffect(() => {
        fetchTask();
    }, [check, val]);


    const changeTask = (taskId) => {
        const getTask = tasks.find(task => task._id === taskId);
        setTodo(getTask.task);
        setSelectedTask(getTask);
        setEdit(true);
    }

    const editTask = async () => {
        if (todo === "") return;
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${user.token}`
                }
            }
            const editedTask = await axios.put(`${import.meta.env.VITE_API_URL}/api/task/edit`, {
                changedTask: todo,
                taskId: selectedTask._id,
                status: selectedTask.status
            }, config);
            setEdit(false);
            setCheck(!check);
            setTodo("");
            toast({
                title: "Task edited",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
        } catch (err) {
            toast({
                title: "Error Occured!",
                description: err.message,
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
        }
    }

    const handleAction = async () => {
        if (edit) {
            await editTask();
        } else {
            await handleSubmit();
        }
    };
    const deleteTask = async (taskId) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${user.token}`
                }
            }
            const deletedTask = await axios.put(`${import.meta.env.VITE_API_URL}/api/task/delete`, {
                taskId
            }, config);
            toast({
                title: "Task deleted",
                // description: err.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setCheck(!check);


        } catch (err) {
            toast({
                title: "Error Occured!",
                description: err.message,
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
        }
    }

    const changeStatus = async(taskId, val) =>{
        const getTask = tasks.find(task => task._id === taskId);
        try{
            const config = {
                headers: {
                    authorization: `Bearer ${user.token}`,
                    "Content-type": "application/json"
                }
            }
            const changeStatus = await axios.put(`${import.meta.env.VITE_API_URL}/api/task/edit`, {
                changedTask: getTask.task,
                taskId: getTask._id,
                status: val?"completed":"incomplete"
            }, config)

            setCheck(!check);
            const getTask2 = tasks.find(task => task._id === taskId);
            console.log(getTask2);
        }catch (err){
            toast({
                title: "Error Occured!",
                description: err.message,
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
        }
    }

    return (
        <>
            <Container centerContent className="flex text-['Josefin Sans'] w-96">
                <Box
                    d="flex"
                    textAlign='center'
                    p={3}
                    bg='white'
                    width='100%'
                    m='40px 0 15px 0'
                    borderRadius='lg'
                    borderWidth='1px'
                >
                    <Text fontSize='4xl' fontFamily='Josefin Sans'>
                        Strike It
                    </Text>
                </Box>
            </Container>
            <div className="w-96  mx-auto pt-20 text-['Josefin Sans']">
                <div className=" mb-4 mx-auto">
                    <input
                        style={{fontFamily: "Josefin Sans",}}
                        type="text"
                        placeholder="Enter a new todo item"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        className="rounded-l-lg p-4 border-t  w-2/3 mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                    />
                    <button
                        onClick={handleAction}
                        style={{fontFamily: "Josefin Sans",}}
                        className="px-4 w-1/3 rounded-r-lg bg-blue-500 text-white font-bold p-4 uppercase border-blue-500 border-t border-b border-r"
                    >
                        Add Task
                    </button>
                </div>
                <Tabs className="bg-white rounded-md" fontFamily="Josefin Sans" >
                    <TabList className="rounded-md" >
                        <Tab className="w-1/3" onClick={()=> setVal("1")}>Pending</Tab>
                        <Tab className="w-1/3" onClick={()=> setVal("2")}>All</Tab>
                        <Tab className="w-1/3" onClick={()=> setVal("3")}>Completed</Tab>
                    </TabList>
                </Tabs>
                <VStack spacing={4} align="stretch" overflowY="auto" maxH="400px" paddingTop={4}>
                    {tasks.map((singleTask) => (
                        <div className="flex font-['Josefin Sans']" key={singleTask._id}>
                            <Box key={singleTask._id} p={4} className="bg-white w-1/6 rounded-l-md">
                                <Checkbox
                                    size='md'
                                    colorScheme='green'
                                    isChecked={singleTask.status === 'completed'}
                                    onChange={(e) => changeStatus(singleTask._id, e.target.checked)}
                                ></Checkbox>
                            </Box>
                            <Box key={singleTask._id} p={4} fontFamily="Josefin Sans"
                                 className="bg-white w-4/6 font-['Josefin Sans']">
                                {singleTask.task}
                            </Box>
                            <Box key={singleTask._id} p={4} className="bg-white w-1/6 rounded-r-lg">
                                <Menu>
                                    <MenuButton as={HamburgerIcon} rightIcon={<ChevronDownIcon/>}>
                                        Actions
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem fontFamily="Josefin Sans"
                                                  onClick={() => changeTask(singleTask._id)}>Edit</MenuItem>
                                        <MenuItem fontFamily="Josefin Sans"
                                                  onClick={() => deleteTask(singleTask._id)}>Delete</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Box>

                        </div>
                    ))}
                </VStack>
            </div>
        </>
    );
};

export default Todo;