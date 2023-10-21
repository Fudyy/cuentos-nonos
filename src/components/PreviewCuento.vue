<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
    cuento: String,
    titulo: String,
    generando: Boolean
})

let parrafos = ref([]);

watch(() => props.cuento, (nuevoValor, valorAnterior) => {
    parrafos = nuevoValor.split('#');
});

</script>

<template>
    <div class="prose w-1/3 h-full bg-secondary overflow-y-auto scrollbar scrollbar-thumb-accent scrollbar-track-primary-content scrollbar-thumb-rounded-lg border-8 border-neutral rounded-xl p-8">
        <span v-if="props.generando" class="loading loading-spinner loading-lg self-center justify-self-center"></span>
        <div v-else>
            <h1 class="text-2xl text-center">{{ props.titulo }}</h1>
            <div v-for="item in parrafos" :key="item.id">
                <p>{{ item }}</p>
            </div>
        </div>
    </div>
</template>

