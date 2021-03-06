import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const findTaskByName = tasks.find((item) => item.title === newTaskTitle);

    if (findTaskByName) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    } else {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      };

      setTasks((oldTasks) => [...oldTasks, newTask]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const taskUpdate = tasks.map((task) => ({ ...task }));

    const itemFound = taskUpdate.find((item) => item.id === id);

    if (!itemFound) {
      return;
    } else {
      itemFound.done = !itemFound.done;
    }
    setTasks(taskUpdate);
    console.log(tasks);
  }

  function handleRemoveTask(id: number) {
    const removeTask = tasks.filter((task) => task.id !== id);
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => {
            return;
          },
        },
        { text: "Sim", onPress: () => setTasks(removeTask) },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const taskUpdated = tasks.map((task) => ({ ...task }));

    const taskFound = taskUpdated.find((item) => item.id === taskId);

    if (!taskFound) {
      return;
    } else {
      taskFound.title = taskNewTitle;
      setTasks(taskUpdated);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
