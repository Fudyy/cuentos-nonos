<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { createClient } from '@supabase/supabase-js';

const route = useRoute();
const id = route.params.id;
let supaurl = import.meta.env.VITE_SUPABASE_URL
let supakey = import.meta.env.VITE_SUPABASE_KEY

let titulo = ref('')
let cuento = ref('')

onMounted(() => {
    cuento.value = dbcall()
})

async function dbcall(params) {
    const supabase = createClient(supaurl, supakey)
    const { data, error } = await supabase.from("cuentos")
        .select("*")
        .eq("id", id)
        .limit(1)

    if (error) {
        console.log(error)
    }
    console.log(data[0])

    titulo.value = data[0].titulo
    cuento.value = data[0].cuento
}

</script>

<template>
    <div class="flex justify-center w-full p-12">
        <div class="prose flex flex-col bg-primary p-8 border-accent border-4 rounded-2xl">
            <h1 class="text-center">{{ titulo }}</h1>
            <p v-for="parrafo in cuento.split('#')">{{ parrafo }}</p>
        </div>
    </div>
</template>