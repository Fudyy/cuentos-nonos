<script setup>
import CreadorCuento from '../components/CreadorCuento.vue';
import { createClient} from '@supabase/supabase-js';
import { ref } from 'vue';
import vueQr from 'vue-qr/src/packages/vue-qr.vue';

let supaurl = import.meta.env.VITE_SUPABASE_URL
let supakey = import.meta.env.VITE_SUPABASE_KEY
let url = import.meta.env.BASE_URL

let qrText = ref('')

const supabase = createClient(supaurl, supakey)

async function registrarCuento(cuento) {
    qrText.value = ''
    const { data, error } = await supabase.from("cuentos")
    .insert({titulo: cuento.titulo, cuento: cuento.cuento})
    .select()

    if (error) {
        console.log(error)
    }

    qrText.value = `https://cuentos-nonos.vercel.app/${data[0].id}`
}
</script>

<template>
    <CreadorCuento @registrarCuento="registrarCuento"/>
    <div class="flex justify-center">
        <vueQr v-if="qrText != ''" :text="qrText"/>
    </div>
</template>
