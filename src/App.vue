<script setup>
// No imports needed here, views are handled by router
</script>

<template>
  <div class="container">
    <header>
      <h1>Vue.js Fast Track</h1>
      <p>React to Vue Migration Guide</p>
    </header>

    <nav>
      <router-link to="/day1" class="nav-link">Day 1: Core Concepts</router-link>
      <router-link to="/day2" class="nav-link">Day 2: Components & Store</router-link>
      <router-link to="/day3" class="nav-link">Day 3: API & Lifecycle</router-link>
    </nav>

    <main>
      <!-- The current view will be rendered here -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <!-- INI KALAU DITULIS LENGKAPNYA -->
      <!-- <router-view v-slot="slotProps">
        <transition name="fade" mode="out-in">
          <component :is="slotProps.Component" />
        </transition>
      </router-view> -->
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

/* Router Link Styles */
.nav-link {
  padding: 0.8rem 2rem;
  background: white;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  font-size: 1rem;
  color: var(--color-text);
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-link:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.nav-link.router-link-active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}

/* Transition Effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
