import axios from "axios";

const todoApi =axios.create({ 
     baseURL : 'http://localhost:4000' 
    });

export const getTodos = async() => {
   const response = await todoApi.get('/todos');
   return response.data;
}

export const postTodo = async(todo) => {
  return await todoApi.post('/todos',todo);
}

export const editTodo = async(todo) => {
    return await todoApi.put(`/todos/${todo.id}`,todo);
}

export const deleteTodo = async({id}) => {
    return await todoApi.delete(`/todos/${id}`,id);
}