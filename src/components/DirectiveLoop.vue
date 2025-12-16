<script setup>
import { ref } from 'vue'

const techStack = ref([
  { id: 1, name: 'Vue.js', difficulty: 'Easy' },
  { id: 2, name: 'React', difficulty: 'Moderate' },
  { id: 3, name: 'Angular', difficulty: 'Hard' }
])

const newItem = ref('')

const addItem = () => {
  if (!newItem.value) return
  const id = techStack.value.length + 1
  techStack.value.push({ id, name: newItem.value, difficulty: 'Unknown' })
  newItem.value = ''
}

const removeItem = (index) => {
  techStack.value.splice(index, 1)
}
</script>

<template>
  <div class="card">
    <h2>2. Lists & Events (v-for, v-on, v-bind)</h2>

    <div class="input-group">
      <!-- v-bind example (shorthand :) -->
      <input 
        v-model="newItem" 
        placeholder="Add tech..." 
        :style="{ borderColor: newItem.length > 5 ? 'green' : 'gray' }"
        @keyup.enter="addItem"
      />
      <!-- v-on example (shorthand @) -->
      <button @click="addItem">Add</button>
    </div>

    <ul>
      <!-- v-for loop with :key (CRITICAL) -->
      <li v-for="(tech, index) in techStack" :key="tech.id">
        <strong>{{ index + 1 }}. {{ tech.name }}</strong> 
        <span class="badge" :class="tech.difficulty.toLowerCase()">{{ tech.difficulty }}</span>
        <button class="sm" @click="removeItem(index)">x</button>
      </li>
    </ul>
    
    <p v-if="techStack.length === 0">No items left!</p>
  </div>
</template>

<style scoped>
/* Inherits .card */

.input-group { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
.input-group input { flex: 1; }
.input-group button { background: var(--color-primary); color: white; }

ul { list-style: none; padding: 0; margin: 0; }

li { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 0.8rem; 
  border-bottom: 1px solid var(--color-border);
  background: #f8fafc;
  margin-bottom: 0.5rem;
  border-radius: 6px;
}
li:last-child { margin-bottom: 0; }

.badge { 
  padding: 0.25rem 0.75rem; 
  border-radius: 20px; 
  font-size: 0.75rem; 
  font-weight: 600;
  color: white; 
  text-transform: uppercase;
  margin-left: auto; 
  margin-right: 1rem; 
  letter-spacing: 0.5px;
}

.easy { background-color: #4caf50; }
.moderate { background-color: #ff9800; }
.hard { background-color: #f44336; }
.unknown { background-color: #9e9e9e; }

.sm { 
  padding: 0.4rem 0.8rem; 
  font-size: 0.9rem; 
  background: #fee2e2; 
  color: #ef4444; 
  border: 1px solid #fecaca;
}
.sm:hover {
  background: #fecaca;
}
</style>
