


<template>
    {{file}}
    <div class="flex h-screen transition-all duration-500">
        
        <div class="flex-1 size-full transition-all duration-500">
            <FormChange/>
        </div>
        <div class="w-[100px] absolute bottom-2 justify-center"><button @click="handelEp" class="w-full py-1 bg-red-400 text-white mt-4">Export</button></div>
        <div class="w-1/2 h-full px-4 transition-all duration-500" v-if="view === true">
            <Preview/>
            <!-- <div v-html="contentHtml"></div> -->
        </div>
    </div>
</template>

<script setup>
    import FormChange from '../components/FormChange.vue';
import { useDataStore } from '@/stores/DataStore';
import { storeToRefs } from 'pinia';
import Preview from '../components/Preview.vue';
import {handleFileUpload} from '@/utils/file'
import { templateFunc } from '@/utils/template';

const store = useDataStore();

const {view,file,data,nameFol} = storeToRefs(store);



const handelEp =async ()=>{
    const temp = await  templateFunc(nameFol.value,data)
    await handleFileUpload(file.value,nameFol.value,temp)
}



</script>