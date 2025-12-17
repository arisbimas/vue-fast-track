<script setup>
import UserList from '../components/UserList.vue'
import UserForm from '../components/UserForm.vue'
</script>

<template>
    <div class="day-content">
        <div class="two-col">
            <div class="col">
                <UserForm />
                <div class="info-box">
                    <h3>State Management (Pinia)</h3>
                    <p>The form above adds data to the global Pinia store. The list on the right observes that store.
                    </p>
                    <p>Pinia is the standard state management library for Vue (successor to Vuex).</p>
                </div>
            </div>
            <div class="col">
                <UserList />
            </div>
        </div>
    </div>
</template>

<style scoped>
.two-col {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 2rem;
    align-items: start;
}

@media (max-width: 850px) {
    .two-col {
        grid-template-columns: 1fr;
    }
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
