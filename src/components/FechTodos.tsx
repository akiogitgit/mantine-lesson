// import { ExclamationTcon } from "@heroicons/react/solid"

import { ExclamationIcon } from "@heroicons/react/solid"
import { Alert, Center, Loader } from "@mantine/core"
import { useQueryTodos } from "../hooks/useQueryTodos"
import { Todo } from "../types/todo"

export const FetchTodos = () => {
  const { data: todos, status } = useQueryTodos()

  if (status === "loading")
    return (
      <Center>
        <Loader />
      </Center>
    )
  if (status === "error")
    return (
      <Center>
        <Alert
          icon={<ExclamationIcon />}
          title='Fetch Error'
          color='red'
          radius='md'
        >
          Something wrong happend !
        </Alert>
      </Center>
    )

  return (
    <div>
      {JSON.stringify(todos)}

      <Center>
        <ul>
          {todos?.map(todo => (
            <li key={todo.id}>
              <p>
                {todo.id}:{todo.title}
              </p>
            </li>
          ))}
        </ul>
      </Center>
    </div>
  )
}
