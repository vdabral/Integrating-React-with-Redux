import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, deleteTodo } from "./redux/actions";
import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const App = () => {
  const [title, setTitle] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (title.trim() !== "") {
      dispatch(addTodo(title));
      setTitle("");
    }
  };

  return (
    <Box maxW="400px" m="auto" mt="50px" p="20px" boxShadow="md" borderRadius="lg">
      <Text fontSize="2xl" fontWeight="bold" textAlign="center">Todo List</Text>
      <Box display="flex" gap="2">
        <Input
          placeholder="Enter todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleAddTodo}>
          Add
        </Button>
      </Box>

      <List mt="4">
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="2"
            borderBottom="1px solid gray"
          >
            <Text
              onClick={() => dispatch(toggleTodo(todo.id))}
              textDecoration={todo.status ? "line-through" : "none"}
              cursor="pointer"
            >
              {todo.title}
            </Text>
            <IconButton
              icon={<FaTrash />}
              colorScheme="red"
              onClick={() => dispatch(deleteTodo(todo.id))}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default App;
