<script setup lang="ts">
    import { CarService } from '@/primary/car/CarService';
    import { UserService } from '@/primary/user/UserService';
    import { carStore } from '@/secondary/car/resources/CarStore';
    import { Timestamp } from 'firebase/firestore';
    import { ref, inject, onMounted, computed } from 'vue';

    const userService = inject<UserService>('userService');
    const carService = inject<CarService>('carService');

    const loading = ref<boolean>(true);
    const username = ref<string>('');
    const cars = computed(() => carStore.getters.getCars());

    onMounted(async () => {
        const user = await userService?.getCurrentUser();
        await carService?.getCars();
        username.value = user?.name || '';
        loading.value = false;

        setTimeout(() => {
            carService?.createCar({
                make: 'Opel Astra H ' + Date.now(),
                serviceActions: [],
                updatedAt: Timestamp.fromDate(new Date()),
            });
        }, 3000);
    });

    defineProps<{ msg: string }>();
</script>

<template>
    <h1>Hello {{ username }}</h1>
    <h2>These are your cars</h2>
    <div v-for="car in cars" :key="car.id">
        <h2>{{ car.make }}</h2>
        <div v-if="car.serviceActions.length">
            <h4>repair list:</h4>
            <p v-for="serviceAction in car.serviceActions">
                {{ serviceAction.repair }}
            </p>
        </div>
        <p v-else>There are no reported service actions</p>
    </div>
</template>

<style scoped>
    .read-the-docs {
        color: #888;
    }
</style>
