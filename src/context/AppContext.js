import React, {createContext, useReducer} from 'react';

// 1. Initial state when app loads
const initialState = {
    todos : [
        {id: 1, content: "Example Todo", deadline: "2023-09-23"}
    ],
    completed : [
        {id: 0, content: "This is completed", deadline: "2023-09-01"}
    ],
    used_ids : [0, 1]
};

// 2. Creates the context this is the thing
// componenets import use to get the state
export const AppContext = createContext();

// 3. Reducer - used to update the state
export const AppReducer = (state, action) => {
    const dateCheck = (date) => {
        const DATE = date.split('-');
        if (DATE[0].length !== 4 || DATE[1].length !== 2 || DATE[2].length !== 2) {
            return true;
        }
        const day = Number(DATE[2]);
        const month = Number(DATE[1]);
        if (day <= 0 || day > 31 || month <= 0 || month > 12) {
            return true;
        }
        return isNaN(new Date(date));
    };

    let n = 1;
    let marked = [];
    let left = [];
    let ids = [];
    switch (action.type) {
        case 'ADD_TODO':
            // checks
            if (!action.payload.content) {
                alert("Todo must contain a message/title");
                return state;
            }
            if (dateCheck(action.payload.deadline)) {
                alert("Please fill a valid date in the format yyyy-mm-dd");
                return state;
            }

            ids = [...state.used_ids];
            let i = 0;
            while (i < ids.length && ids[i] === i) {
                i++;
            }

            // Adding a new todo and updatind used_ids state
            const new_id = i;
            const new_todo = {
                id: new_id,
                content: action.payload.content,
                deadline: action.payload.deadline
            };

            // Updating the used_ids list and maintaining a sorted used_ids
            ids.push(new_id);
            ids.sort();
            console.log(ids);

            return {
                ...state,
                todos: [...state.todos, new_todo],
                used_ids: [...ids]
            };
        
        case 'MARK_COMP':
            n = state.todos.length;
            for (let i = 0; i < n; i++) {
                if (state.todos[i].id === action.payload) {
                    marked.push(state.todos[i]);
                } else {
                    left.push(state.todos[i]);
                }
            }
            
            return {
                ...state,
                completed: [...state.completed, ...marked],
                todos: [...left]
            };
        
        case 'DEL_COMP':
            left = [];
            n = state.completed.length;

            for (let i = 0; i < n; i++) {
                if (state.completed[i].id !== action.payload) {
                    left.push(state.completed[i]);
                }
            }

            ids = [];
            n = state.used_ids.length;
            for (let i = 0; i < n; i++) {
                if (state.used_ids[i] !== action.payload) {
                    ids.push(state.used_ids[i]);
                }
            }
            ids.sort();
            console.log(...left);
            console.log(ids);
            return {
                ...state,
                completed: [...left],
                used_ids: [...ids]
            };
        
        default:
            return state;
    }
};

// 4. Provider - component that incorporates store variables in context and
// provides the variables from context

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider value={{
            todos: state.todos,
            completed: state.completed,
            dispatch
        }}>
            {props.children}
        </AppContext.Provider>
    );
};