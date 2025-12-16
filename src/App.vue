<script setup>
import { ref } from 'vue'
import ReactivityBasic from './components/ReactivityBasic.vue'
import DirectiveLoop from './components/DirectiveLoop.vue'
import LifecycleTest from './components/LifecycleTest.vue'
import PropsParent from './components/PropsParent.vue'
import UserList from './components/UserList.vue'
import UserForm from './components/UserForm.vue'

const activeTab = ref('day1')
</script>

<template>
  <div class="container">
    <header>
      <h1>Vue.js Fast Track</h1>
      <p>React to Vue Migration Guide</p>
    </header>

    <nav>
      <button 
        :class="{ active: activeTab === 'day1' }" 
        @click="activeTab = 'day1'"
      >
        Day 1: Core Concepts
      </button>
      <button 
        :class="{ active: activeTab === 'day2' }" 
        @click="activeTab = 'day2'"
      >
        Day 2: Components & Store
      </button>
    </nav>

    <main>
      <div v-if="activeTab === 'day1'" class="day-content">
        <div class="grid">
          <ReactivityBasic />
          <DirectiveLoop />
          <LifecycleTest />
          <PropsParent />
        </div>
      </div>

      <div v-if="activeTab === 'day2'" class="day-content">
        <div class="two-col">
          <div class="col">
            <UserForm />
            <div class="info-box">
              <h3>State Management (Pinia)</h3>
              <p>The form above adds data to the global Pinia store. The list on the right observes that store.</p>
              <p>Pinia is the standard state management library for Vue (successor to Vuex).</p>
            </div>
          </div>
          <div class="col">
            <UserList />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.container { 
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 2rem; 
}

header { 
  text-align: center; 
  margin-bottom: 3rem; 
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--color-border);
}

h1 { 
  font-size: 2.5rem;
  color: var(--color-primary); 
  margin-bottom: 0.5rem;
}

p {
  color: #64748b;
  font-size: 1.1rem;
}

nav { 
  display: flex; 
  justify-content: center; 
  gap: 1rem; 
  margin-bottom: 3rem; 
}

nav button { 
  padding: 0.8rem 2rem; 
  background: white; 
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  font-size: 1rem;
  color: var(--color-text);
}

nav button:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: white;
}

nav button.active { 
  background: var(--color-primary); 
  color: white; 
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}

.grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); 
  gap: 2rem; 
}

.two-col { 
  display: grid; 
  grid-template-columns: 350px 1fr; 
  gap: 2rem; 
  align-items: start;
}

@media (max-width: 850px) {
  .two-col { grid-template-columns: 1fr; }
}

.info-box { 
  background: #e0f2f1; 
  padding: 1.5rem; 
  border-radius: 12px; 
  margin-top: 1.5rem; 
  color: #00695c;
  border: 1px solid #b2dfdb;
}

.info-box h3 {
  color: #004d40;
  margin-bottom: 0.5rem;
}
</style>
