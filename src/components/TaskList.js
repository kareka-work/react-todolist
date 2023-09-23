import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import DoneIcon from '@mui/icons-material/Done';

const Item = (props) => {
    const {dispatch} = useContext(AppContext);

    function handleComplete(event) {
        dispatch({
            type: "MARK_COMP",
            payload: props.id
        })
    };

    return (
        <div className="row p-2 m-3 bg-white rounded shadow">
            <h3 className="col-6">{props.content}</h3>
            <h3 className="col-4">{props.deadline}</h3>
            <div className="col-2">
                <button onClick={handleComplete} className="btn btn-success"><DoneIcon/></button>
            </div>
        </div>
    );
}

const TaskList = () => {
    const {todos} = useContext(AppContext);
    return (
        <>
            <div className="col middle bg-light overflow-auto">
                <div className="row bg-white">
                    <h2 className="display-4 text-center">Tasks todo</h2>
                </div>
                {todos.map((todo) => (
                    <Item id={todo.id} key={todo.id} content={todo.content} deadline={todo.deadline}/>
                ))}
            </div>
        </>
    );
}

export default TaskList;