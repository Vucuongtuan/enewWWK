<template>
    <div className="max-w-screen w-full mx-auto p-6 space-y-8 ">
        <div className=" rounded-lg shadow-md p-6">
            <div className="flex flex-col space-y-2">
                <label
                    htmlFor="nameFol"
                    className="text-sm font-medium text-gray-700"
                >
                    Name Folder ->> 2025-09-20
                </label>
                <input
                    type="text"
                    id="nameFol"
                    className="border border-gray-300 rounded-md w-full sm:w-[300px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    placeholder="Enter folder name"
                    :defaultValue="timeSunday"
                    v-model="text.nameFol"
                />
                <a :href="urlValue">{{ urlValue }}</a>
            </div>
        </div>

        <div className="p-6 relative h-auto">
            <div className="flex flex-col space-y-4 ">
                <label
                    htmlFor="zipUpload"
                    className="text-sm font-medium text-gray-700"
                >
                    Upload Image ZIP File:
                </label>
                <div
                    className="border-2  border-dashed border-gray-300 rounded-lg p-6 text-center  transition cursor-pointer"
                >
                    <input
                        type="file"
                        id="zipUpload"
                        accept=".zip,.rar"
                        @change="changeFileUpload"
                    />
                </div>
                <div
                    id="processingStatus"
                    className="mt-2 text-sm p-3 rounded-md bg-red-50 text-red-600"
                    v-if="dataStore.error.status"
                >
                    {{ dataStore.error.message }}
                </div>
            </div>
        </div>

        <div className=" p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
                Content Blocks
            </h2>
            <textarea
                className="w-full h-32 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent "
                placeholder="Enter content here..."
                v-model="text.input"
            ></textarea>
        </div>
        <button @click="changeV">View {{ dataStore.view }}</button> 
    </div>
</template>

<script setup>
import { computed, reactive, ref,watch } from "vue";
import { stringToJson } from "../utils/stringToJson";
import { useDataStore } from "@/stores/DataStore";
import { storeToRefs } from "pinia";

const dataStore = useDataStore();
const { view, data, nameFol, file } = storeToRefs(dataStore);

const timeSunday = getSundayOfWeek(new Date());

const text = reactive({
    nameFol: timeSunday,
    input: "",
});

const urlValue = computed(
    () => `https://www.wowweekend.vn/email/2025/${text.nameFol}/vi/`,
);

const changeEnew = async () => {
    const result = await stringToJson(text.input);
    console.log(result);

    dataStore.addData(result);
};
// watch(text, () => {
//     dataStore.changeNameFol(text.nameFol);
//     dataStore.changeView();
//     changeEnew();
// });
const changeV = () => {
    dataStore.changeNameFol(text.nameFol);
    dataStore.changeView();
    changeEnew();
};

const changeFileUpload = (e) => {
    const filea = e.target.files[0];
    dataStore.changeFile(filea);
};
function getSundayOfWeek(date = new Date()) {
    const day = date.getDay(); // 0 = Sunday
    const diff = day === 0 ? 0 : 7 - day;
    const sunday = new Date(date);
    sunday.setDate(date.getDate() + diff);

    // format YYYY-MM-DD
    const year = sunday.getFullYear();
    const month = String(sunday.getMonth() + 1).padStart(2, "0");
    const dayOfMonth = String(sunday.getDate()).padStart(2, "0");

    return `${year}-${month}-${dayOfMonth}`;
}
</script>
