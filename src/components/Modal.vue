<script setup>
defineProps({
    isOpen: Boolean,
    title: String
})

const emit = defineEmits(['close'])
</script>

<template>
    <Teleport to="body">
        <div v-if="isOpen" class="modal-overlay" @click.self="emit('close')">
            <div class="modal-content">
                <header>
                    <h3>{{ title }}</h3>
                    <button class="close-btn" @click="emit('close')">&times;</button>
                </header>

                <div class="modal-body">
                    <slot></slot>
                </div>

                <footer>
                    <slot name="footer">
                        <button @click="emit('close')">Close</button>
                    </slot>
                </footer>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(2px);
}

.modal-content {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.2s ease-out;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
}

h3 {
    margin: 0;
    color: #2c3e50;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    color: #666;
    width: auto;
}

.close-btn:hover {
    color: #000;
    background: none;
}

footer {
    margin-top: 1.5rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    border-top: 1px solid #eee;
    padding-top: 1rem;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
