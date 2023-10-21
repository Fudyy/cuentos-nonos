<script setup>
import { ref } from 'vue'

const props = defineProps({
    botonRegistrar: Boolean
})
let nombre = ref('');
let caracteristicas = ref('');
let tematica = ref('');
let titulo = ref('');

const emit = defineEmits(['generarCuento'])

function btnRegistrarHandler() {

    const inputData = {
        nombre: nombre.value,
        caracteristicas: caracteristicas.value,
        tematica: tematica.value,
        titulo: titulo.value
    };

    emit('generarCuento', inputData);
}
</script>

<template>
    <div class="prose flex flex-col bg-primary-content w-1/4 p-12 h-full rounded-xl">
        <h1 class="flex text-white bg-primary justify-center items-center rounded-lg h-12 text-xl mb-4">Crea tu nono</h1>
        <label class="label">
            <span class="label-text text-neutral-content">Nombre:</span>
        </label>
        <input v-model="nombre" type="text" placeholder='Monrique' class="input input-bordered w-full" />
        <label class="label">
            <span class="label-text text-neutral-content">Caracteristicas del nono:</span>
        </label>
        <input v-model="caracteristicas" type="text" placeholder='Hecho con tela cuadrille, minero...' class="input input-bordered w-full" />
        <label class="label">
            <span class="label-text text-neutral-content">Titulo del cuento:</span>
        </label>
        <input v-model="titulo" type="text" placeholder='"La aventura de..."' class="input input-bordered w-full" />
        <label class="label">
            <span class="label-text text-neutral-content">Tematica del cuento:</span>
        </label>
        <input v-model="tematica" type="text" placeholder='Reciclaje...' class="input input-bordered w-full" />
        <button @click="btnRegistrarHandler" class="mt-12 btn">Generar cuento</button>
        <button v-if="props.botonRegistrar" @click="$emit('registrarCuento', inputData)" class="btn mt-4">Registrar cuento</button>
    </div>
</template>
