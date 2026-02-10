import React, { useState } from "react";
import {View, Text, StyleSheet, TextInput, Button, FlatList, Pressable,} from "react-native";

import { useTodos } from "./hooks/useTodo";

export default function App() {
  const { items, addItem, toggleItem } = useTodos();
  const [input, setInput] = useState("");

  const handleAdd = () => {
    addItem(input);
    setInput("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Add item"
        />
        <Button title="Add" onPress={handleAdd} />
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => toggleItem(item.id)}>
            <View style={styles.rowFront}>
              <Text style={[item.completed && styles.completed]}>
                {item.name}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  rowFront: {
    borderBottomWidth: 1,
    borderColor: "#eee",
    padding: 16,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "red",
  },
});