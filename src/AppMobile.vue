<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Ref } from 'vue'
import MainProcessMobile from './components/MainProcessMobile.vue'
import { useUserStore } from "./stores/user";
import { useHmStore } from './stores/homework';
import { storeToRefs } from 'pinia'

const store = useUserStore();
const labelPosition = ref('top')
const dialogFormVisible = ref(false)
const hmTargetVisible = ref(false)
const formLabelWidth = '5rem'
const { name, avatar } = storeToRefs(store)

const { hmStore } = storeToRefs(useHmStore())
const data = reactive({ name: name.value, avatar: avatar.value })
const changeName = () => {
  store.name = data.name;
  store.avatar = data.avatar;
}

const current_subject: Ref<string> = ref('')
</script>

<template>
  <header>

    <MainProcessMobile />
    <div class="elbtn">
        <el-button type="primary" plain @click="hmTargetVisible = true">
          更新作业配置
        </el-button>
        <el-button type="primary" plain @click="dialogFormVisible = true">
          更新用户配置
        </el-button>
      </div>

    <el-dialog v-model="dialogFormVisible" title="更新用户配置">
      <el-form :model="data">
        <el-form-item label="你的名字: " :label-width="formLabelWidth">
          <el-input v-model="data.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false, changeName()">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="hmTargetVisible" title="更新作业配置">
      <el-select v-model="current_subject" class="m-2" placeholder="Select">
        <el-option v-for="(value, key) in hmStore" :key="key" :label="key" :value="key" />
      </el-select>
      <br /><br />
      <el-form :model="hmStore.value" :label-position="labelPosition">
        <el-form-item v-for="(value, key) of hmStore[current_subject]" :key="key" :label="key"
          :label-width="formLabelWidth">
          <el-input v-model.number="hmStore[current_subject][key].t" autocomplete="off">
            <template #append>
              权重<el-input v-model.number="hmStore[current_subject][key].r" autocomplete="off"
                style="width: 1rem; left: 32.5%" />
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="hmTargetVisible = false">Cancel</el-button>
          <el-button type="primary" @click="hmTargetVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </header>
</template>


<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 0.3rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 0.2rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

header {
  display: flex;
  place-items: center;
  padding-right: calc(var(--section-gap) / 2);
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.logo {
  margin: 0 0.3rem 0 0;
}

header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}

.elbtn {
  margin-top: 0.25rem;
}

nav {
  text-align: left;
  margin-left: -0.1rem;
  font-size: 0.2rem;

  padding: 0.1rem 0;
  margin-top: 0.06rem;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
