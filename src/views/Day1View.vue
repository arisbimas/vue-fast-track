<script setup>
import ReactivityBasic from '../components/ReactivityBasic.vue'
import DirectiveLoop from '../components/DirectiveLoop.vue'
import LifecycleTest from '../components/LifecycleTest.vue'
import PropsParent from '../components/PropsParent.vue'
</script>

<template>
    <div class="day-content">
        <div class="grid">
            <ReactivityBasic />
            <DirectiveLoop />
            <LifecycleTest />
            <PropsParent />
        </div>
    </div>
</template>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}
</style>
