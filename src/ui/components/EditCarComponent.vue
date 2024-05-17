<template>
    <div class="edit-car-form">
        <div>
            <label for="car-make">Edit Car Brand:</label>
            <input id="car-make" v-model="make" />
        </div>

        <button @click="updateCar">Update Brand</button>
    </div>
</template>

<script setup lang="ts">
    import { CarProperties } from '@/domain/car/types';
    import { defineProps, defineEmits, ref, watch } from 'vue';

    const emit = defineEmits(['update:car']);

    const props = defineProps<{
        car: CarProperties;
    }>();

    const make = ref(props.car.make);

    watch(
        () => props.car.make,
        (newBrand) => {
            make.value = newBrand;
        }
    );

    const updateCar = () => {
        const carToUpdate = Object.assign({ ...props.car }, { make: make.value }) as CarProperties;
        emit('update:car', carToUpdate);
    };
</script>

<style scoped>
    /* Add any specific styles for your component here */
    .edit-car-form {
        display: flex;
        gap: 8px;
        justify-content: flex-start;
        flex-direction: column;
    }

    .edit-car-form label {
        display: block;
        margin-bottom: 4px;
        font-weight: bold;
    }

    .edit-car-form input {
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px;
    }

    .edit-car-form button {
        cursor: pointer;
        align-self: flex-start;
    }
</style>
