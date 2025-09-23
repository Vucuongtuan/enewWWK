<template>
    <div class="flex h-screen transition-all duration-500">
        <div class="flex-1 size-full transition-all duration-500">
            <FormChange />
        </div>
        <div class="w-[100px] absolute bottom-2 justify-center">
            <button
                @click="handelEp"
                class="w-full py-1 bg-red-400 text-white mt-4"
            >
                Export
            </button>
        </div>
        <Preview />
    </div>
</template>

<script setup>
import FormChange from "../components/FormChange.vue";
import Preview from "../components/preview.vue";
import { useDataStore } from "@/stores/DataStore";
import { storeToRefs } from "pinia";
import { handleFileUpload } from "@/utils/file";
import { templateFunc } from "@/utils/template";

const store = useDataStore();

const { view, file, data, nameFol } = storeToRefs(store);

const handelEp = async () => {
    const temp = await templateFunc(nameFol.value, data);
    await handleFileUpload(file.value, nameFol.value, temp);
};
</script>
