import React, { useState } from 'react';
import { Button, StyleSheet, View, FlatList } from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    setIsAddMode(false);
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { uid: Math.random().toString(), value: goalTitle }
    ]);
  };

  const deleteGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.uid !== goalId)
    );
  };

  return (
    <View style={styles.screen}>
      <Button title="Add new goal" onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} />
      <FlatList
        keyExtractor={(item) => item.uid}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem onDelete={() => deleteGoalHandler(itemData.item.uid)}>
            {itemData.item.value}
          </GoalItem>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
