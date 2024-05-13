<script setup lang="ts">
    import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
    <div class="app">
        <HelloWorld :msg="$t('global.greeting')" />
    </div>
</template>

<style scoped></style>
