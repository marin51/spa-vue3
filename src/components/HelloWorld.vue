<script setup lang="ts">
    import { CarView } from '@/primary/car/CarView';
    import { CarService } from '@/primary/car/use-case';
    import { UserService } from '@/primary/user/use-cases';
    import { ref, inject, onMounted } from 'vue';

    const userService = inject<UserService>('userService');
    const carService = inject<CarService>('carService');

    const loading = ref<boolean>(true);
    const username = ref<string>('');
    const cars = ref<CarView[]>([]);

    onMounted(async () => {
        const user = await userService?.getCurrentUser();
        const apicars = await carService?.getCars();
        cars.value = apicars || [];
        username.value = user?.name || '';
        loading.value = false;
    });

    defineProps<{ msg: string }>();
</script>

<template>
    <div v-if="!loading">
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
        <h3>{{ msg }}</h3>
    </div>
</template>

<style scoped>
    .read-the-docs {
        color: #888;
    }
</style>
