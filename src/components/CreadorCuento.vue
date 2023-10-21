<script setup>
import PreviewCuento from './PreviewCuento.vue';
import FormularioCuento from './FormularioCuento.vue';
import { ref } from 'vue';

const emit = defineEmits(['generarCuento'])

let cuentoPreview = ref()
let botonRegistrar = ref(false)
let tituloPreview = ref('')
let generando = ref(false)
let cuento = {
  nombre: '',
  caracteristicas: '',
  titulo: '',
  tematica: '',
  cuento: ''
}

async function generarCuento({nombre, caracteristicas, tematica, titulo}) {

  cuento.nombre = nombre;
  cuento.caracteristicas = caracteristicas;
  cuento.tematica = tematica;
  cuento.titulo = titulo;
  botonRegistrar.value = false;

  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_APIKEY;

  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: 'Eres un contador de cuentos para niños sobre los "nonos", estos son muñecos hechos de telas recicladas los cuales promueven la resiliencia, valoración de lo simple, diversidad, inclusión y cuidado del medio ambiente. En el cuento intenta agregar siempre una moraleja o enseñanza. Ademas que si ocupas nombres en los cuentos estos deben ser de fantasía, no nombres reales. Al final de cada parrafo agrega un # para que el sistema sepa que es un nuevo parrafo'
      },
      {
        role: "user",
        content: `haz un cuento sobre 1 nono que se llama ${nombre}, las caracteristicas de este nono son: ${caracteristicas}. Quiero que el titulo del cuento sea: ${titulo} (este no lo debes agregar a la respuesta, tan solo es para entregar contexto) y la tematica del cuento es: ${tematica}`
      }
    ]
  };

  generando.value = true;

  try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }

      const respuesta = await response.json();
      cuentoPreview.value = respuesta.choices[0].message.content;
      cuento.cuento = respuesta.choices[0].message.content;
    } catch (error) {
      // Manejar errores de red o del servidor
      console.error('Hubo un error:', error);
    } finally {
      generando.value = false;
      tituloPreview.value = titulo;
      botonRegistrar.value = true;
    }
}

function registrarCuento() {
  emit('registrarCuento', cuento)
}
</script>

<template>
    <div class="relative h-[600px] flex justify-center gap-x-24">
        <FormularioCuento @generarCuento="generarCuento" @registrarCuento="registrarCuento" :botonRegistrar="botonRegistrar"/>
        <PreviewCuento :cuento="cuentoPreview" :generando="generando" :titulo="tituloPreview"/>
    </div>
</template>
