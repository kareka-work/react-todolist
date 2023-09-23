import {AppContext} from '../context/AppContext.js';
import DeleteIcon from '@mui/icons-material/Delete';
import {useContext} from 'react';

const Item = (props) => {
    const {dispatch} = useContext(AppContext);
    function handleDelete(event) {
        dispatch({
            type: "DEL_COMP",
            payload: props.id
        });
    };
    return (
        <div className="row p-2 m-3 bg-success-subtle rounded shadow">
            <h3 className='col-10'>{props.content}</h3>
            <div className='col-1'>
                <button className="btn btn-danger" onClick={handleDelete}><DeleteIcon /></button>
            </div>
        </div>
    )
};

const Completed = () => {
    const {completed} = useContext(AppContext);
    return (
        <div className="col middle bg-dark-secondary overflow-auto">
            <div className='row bg-white'>
                <h2 className='display-4 text-center'>Completed Tasks</h2>
            </div>
            {completed.map((todo) => (
                <Item id={todo.id} key={todo.id} content={todo.content}/>
            ))}
        </div>
    )
};

export default Completed;