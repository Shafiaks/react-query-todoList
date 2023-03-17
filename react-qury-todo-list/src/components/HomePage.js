import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodos, postTodo, editTodo, deleteTodo } from '../utils/axiosApi';
import { useNavigate } from 'react-router-dom';
import EditTask from './EditTask';

function HomePage() {

	const [newTodo, setNewTodo] = useState('');
	const [editValue, setEditValue] = useState('');
	const [editable, setEditable] = useState(false);
	const [showEditableBox, setShowEditableBox] = useState(false);


	const queryClient = useQueryClient();
	const navigate = useNavigate();

	//  get all todos
	const { isLoading, isError, error, data } = useQuery({ queryKey: ['todos'], queryFn: getTodos });
	console.log("todos ", data)

	//posting new todo
	const postMutation = useMutation({
		mutationFn: postTodo,
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		},
	})

	//editing 
	const editMutation = useMutation({
		mutationFn: editTodo,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
			//queryClient.setQueryData(['todo', { id: data.id }], data)
		}
	})

	//deleting 
	const deleteMutation = useMutation({
		mutationFn: deleteTodo,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		}
	})


	if (isLoading) {
		return <div className='container'><h1>Loading ... </h1></div>
	}
	else if (isError) {
		return <div className='container'><h1> {error.message} </h1></div>
	}
	else if (data) {

		return (
			<div className='container'>
				<form className='form'>
					<input className='new-entry-field'
						value={newTodo}
						type='text'
						placeholder='Enter new task'
						onChange={(e) => setNewTodo(e.target.value)} >
					</input>
					<button
						type='submit'
						className='btn'
						onClick={() => { postMutation.mutate({ todo: newTodo, status: false }) }}>
						Add
					</button>
				</form>
				<div >
					<ul className='list' >
						{data?.map((todo) => (
							<li>
								<input
									type="checkbox"
									className='checkbox'
									checked={todo.status}
									id={todo.id}
									onChange={() => editMutation.mutate({
										...todo,
										status: !todo.status
									})}
								>
								</input>

								<input
									type="text"
									key={todo.id}
									className='list-todos'
									value={editable ? editValue : todo.todo}
									name='todo'
									onChange={(e) => { setEditValue(e.target.value) }}
								  //navigate (`/edit/${todo.id}`) 
								>
								</input>



								<button className='btn'
									onClick={() => { navigate(`/edit/${todo.id}`) }}
								//	 onClick={()=>{ editMutation.mutate({...todo, todo : todo })}}
								>
									Edit
								</button>
								<button className='btn'
									onClick={() => { deleteMutation.mutate({ id: todo.id }) }}>
									Delete
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		)
	}


}

export default HomePage
