<template>
    <div class="demo-progress">
        <el-progress type="circle" :percentage="percentage" :width="fontSize*3" :stroke-width="fontSize*0.15" :color="colors">
            <template #default="{ percentage }">
                <span class="percentage-value">{{ percentage.toFixed(2) }}%</span>
                <span class="percentage-label">{{ percentage == 100 ? "Done!" : "Progressing..." }}</span>
                <el-button type="primary" plain @click="hmChangeVisible = true" style="margin-top: 0.1rem;">
                    更新进度
                </el-button>
            </template>
        </el-progress>
    </div>
    <el-dialog v-model="hmChangeVisible" title="更新作业进度">
        <el-select v-model="current_subject" class="m-2" placeholder="Select">
            <el-option v-for="(value, key) in hmStore" :key="key" :label="key" :value="key" />
        </el-select>
        <br /><br />
        <el-form :model="hmStore" :label-position="labelPosition">
            <el-form-item v-for="(value, key) of hmStore[current_subject]" :key="key" :label="key"
                :label-width="formLabelWidth">
                <el-slider v-model.number="hmStore[current_subject][key].c" show-input
                    :max="hmStore[current_subject][key].t" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="hmChangeVisible = false">Cancel</el-button>
                <el-button type="primary" @click="hmChangeVisible = false, dataToStore()">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useHmStore } from '../stores/homework';

const labelPosition = ref('top')
const hmChangeVisible = ref(false)
const formLabelWidth = '5rem'
const current_subject = ref('')
const { hmStore } = storeToRefs(useHmStore())

const colors = [
    { color: '#f56c6c', percentage: 20 },
    { color: '#e6a23c', percentage: 40 },
    { color: '#1989fa', percentage: 60 },
    { color: '#6f7ad3', percentage: 80 },
    { color: '#5cb87a', percentage: 100 },
]

const countHm = () => {
    let allRight = 0
    let currentRight = 0
    for (let sub in hmStore.value) {
        for (let item in hmStore.value[sub]) {
            allRight += hmStore.value[sub][item].t * hmStore.value[sub][item].r
            currentRight += hmStore.value[sub][item].c * hmStore.value[sub][item].r
        }
    }
    return currentRight / allRight * 100
}
const percentage = computed(() => { return countHm() })

const fontSize = computed(()=>{
  return window.innerWidth / 10 
})
</script>

<style scoped>
@media (min-width: 1024px) {
    .percentage-value {
        display: block;
        margin-top: 10px;
        font-size: 48px;
    }

    .percentage-label {
        display: block;
        margin-top: 10px;
        font-size: 36px;
    }

    .demo-progress .el-progress--line {
        margin-bottom: 15px;
        width: 350px;
    }

    .demo-progress .el-progress--circle {
        margin-right: 15px;
    }
}
</style>