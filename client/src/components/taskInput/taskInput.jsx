 import { useState, useEffect } from "react";
// import { taskCreate, inputLoad, completedAll } from "../../redux/actions";
// import { addTask } from "../../services/taskServices";
import { useDispatch, useSelector } from "react-redux";
import { taskLoad } from "../../store/todoSlice"
import TaskItem from "../taskItem/taskItem"

import './taskinput.css'



function TaskInput() {
    // const addTask = () => dispatch(inputLoad())
    const todos = useSelector((state) => state.todos.todos) 
    const dispatch = useDispatch()
    console.log(todos)
    useEffect(()=>{dispatch(taskLoad())},[]);
    const [text, setText] = useState('');

    // const dispatch = useDispatch(),
    // const filter = useSelector(state => {
    //     const { itemsReducer } = state;
    //     return itemsReducer.filter;
    // })


    // const tasks = useSelector(state => {
    //     const { itemsReducer } = state;
    //     if (filter === "compleated") {
    //         return itemsReducer.tasks.filter((items) => items.done);
    //     }
    //     else if (filter === "active") {
    //         return itemsReducer.tasks.filter(items => !items.done);
    //     }
    //     else {
    //         return itemsReducer.tasks
    //     }
    // })

    // ввод текста
    // const handleChange = (e) => { setText(e.target.value = e.target.value.replace(/ +/g, ' ')) }

    // добавление таски
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (text === "" || text === " ") {
    //         alert('Заполните поле')
    //     }
    //     else {
    //         try {
    //             const { data } = await addTask({ text: text.trim()});
    //             console.log(data)
    //             dispatch(taskCreate(data))
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     setText(e.target.value = "")
    // };

    // const allCompleated = async (e) => {
    //     e.preventDefault();
    //     dispatch(completedAll(tasks.every(items => items.done)))
    // }

    // рендер
    // useEffect(() => {
    //     dispatch(inputLoad())
    // }, [dispatch]);

    
    // взаимодействие с css 
    let classArrow, classCheck;
    if (true) {
        classArrow = "to-do__list-btn-arrow to-do__list-btn-arrow-active";
        classCheck = "to-do__list-btn to-do__list-btn-active";
    } else {
        classArrow = "to-do__list-btn-arrow";
        classCheck = "to-do__list-btn";
    }

    // if (tasks.every(item => item.done)) { classArrow += " to-do__fading" }

    return (
        <div className="App flex">
            <form
                className="add"
                // onSubmit={handleSubmit}
            >
                <input
                    className={classCheck}
                    // onClick={allCompleated}
                    type="checkbox">
                </input>
                <img
                    className={classArrow}
                    src="/img/arrow.svg"
                    alt="arrow"
                />
                <input
                    className="to-do__task"
                    type="text"
                    required={true}
                    value={text}
                    // onChange={handleChange}
                    placeholder="What needs to be done?">
                </input>
            </form>
            <ul >
                {todos.map((task) => (
                    <TaskItem
                        _id={task._id}
                        desc={task.desc}
                        done={task.done}
                        text={task.text}
                        date={task.date}
                        key={task._id}
                    />
                ))}
            </ul>
        </div>
    );
}

export default TaskInput;
