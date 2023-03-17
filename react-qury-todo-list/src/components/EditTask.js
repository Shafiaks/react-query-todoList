import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodos } from '../utils/axiosApi';
import { editTodo } from '../utils/axiosApi';

function EditTask() {

    const { id } = useParams();

    const [editedValue, setEditedValue] = useState('');
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { isLoading, isError, error, data } = useQuery({ queryKey: ['todos'], queryFn: getTodos });

    //editing 
    const editMutation = useMutation({
        mutationFn: editTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })



    if (isLoading) {
        return <h1>Loading ... </h1>
    }
    else if (isError) {
        return <h1> {error.message} </h1>
    }
    else {
        const taskToEdit = data?.find(todo => (todo.id == id));



        return (
            <div  className='edit-input'>
                <input
                    type="text"
                    key={taskToEdit.id}
                    value={editedValue || taskToEdit.todo}
                    name='todo'
                    onChange={(e) => setEditedValue(e.target.value)}
                >
                </input>

                <button type='submit' className='btn' onClick={() => { editMutation.mutate({ ...taskToEdit, todo: editedValue }); navigate('/') }}>Save</button>
                <button type='submit' className='btn' onClick={() => navigate('/')} >Cancel</button>

            </div>
        )
    }




}

export default EditTask
