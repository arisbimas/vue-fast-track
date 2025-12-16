<script setup>
import { ref, reactive, computed } from 'vue'

// --- REFS ---
// Works for primitives (string, number, boolean)
const count = ref(0)
const increment = () => {
  count.value++
}

// --- REACTIVE ---
// Works best for objects/arrays
const state = reactive({
  name: 'Vue Learner',
  age: 1
})
const birthday = () => {
  state.age++
}

// --- COMPUTED ---
// Derived state, caches result until dependencies change
const doubleCount = computed(() => count.value * 2)
const message = computed(() => `${state.name} is ${state.age} days old`)

// --- DIRECTIVES (v-if) ---
const showSecret = ref(false)
</script>

<template>
  <div class="card">
    <h2>1. Reactivity Core (ref, reactive, computed)</h2>
    
    <div class="section">
      <h3>Ref (Primitives)</h3>
      <p>Count: {{ count }}</p>
      <p>Double Count (Computed): {{ doubleCount }}</p>
      <button @click="increment">Increment Ref</button>
    </div>

    <div class="section">
      <h3>Reactive (Objects)</h3>
      <p>{{ message }}</p>
      <button @click="birthday">Target Age +</button>
    </div>

    <div class="section">
      <h3>Directives (v-if / v-show)</h3>
      <label>
        <input type="checkbox" v-model="showSecret" />
        Show Secret
      </label>
      <p v-if="showSecret" class="secret">🚀 This is rendered conditionally with v-if!</p>
      <p v-show="showSecret" class="secret">👀 This is toggled with v-show (CSS display)</p>
    </div>
  </div>
</template>

<style scoped>
/* Inherits .card from global style.css */
.section { margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); padding-bottom: 1.5rem; }
.section:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }

h3 {
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  color: var(--color-secondary);
}

.secret { 
  background: #fff3e0; 
  color: #e65100; 
  padding: 0.8rem; 
  border-radius: 8px; 
  margin-top: 0.5rem;
  border-left: 4px solid #ff9800;
}

button {
  background: var(--color-primary);
  color: white;
}
button:hover {
  background: var(--color-primary-dark);
}
</style>
