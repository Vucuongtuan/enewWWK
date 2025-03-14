

<template>

<iframe :srcdoc="temp" frameborder="0" class="h-full w-full"></iframe>

</template>


<script setup>
import { useDataStore } from '@/stores/DataStore';
import { templateFunc } from '@/utils/template';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';


const dataStore = useDataStore();
const { view, data, nameFol, file } = storeToRefs(dataStore);
const temp =   templateFunc(nameFol.value,data)
const template = ref('')
watch((view,data), ()=>{
 
  template.value = temp
})


</script>