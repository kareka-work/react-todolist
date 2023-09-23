import {useState, useContext} from 'react';
import { AppContext } from '../context/AppContext';

const AddTodo = () => {
    const [content, setContent] = useState("");
    const [deadline, setDeadline] = useState("");

    const {dispatch} = useContext(AppContext)

    function handleSubmit(event) {
        if (!content) {
            alert("Title must not be empty");
            return;
        }
        if (!deadline) {
            alert("Date for task deadline must be given");
            return;
        }
        dispatch({
            type: "ADD_TODO",
            payload: {
                content: content,
                deadline: deadline
            }
        });
        setContent("");
        setDeadline("");
    };

    return (
        <div className='bottom bg-info-subtle input-group p-4'>
            <div className="form-control input-group-text" id="basic-addon-1">
                <h4>Add New Task</h4>
            </div>
            <input 
                type="text" className="form-control" 
                placeholder="Task title/description"
                value={content}
                onChange={(event) => setContent(event.target.value)}
            ></input>
            <input 
                type="date" className="form-control" 
                placeholder="Deadline"
                value={deadline}
                onChange={(event) => setDeadline(event.target.value)}
            ></input>
            <button 
                className="form-control btn btn-info"
                type="button"
                onClick={handleSubmit}
            >ADD</button>
        </div>
    );
}

export default AddTodo;