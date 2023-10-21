<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { reactive, ref } from 'vue'
import type { Ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { useUserStore } from "./stores/user";
import { useHmStore } from './stores/homework';
import { storeToRefs } from 'pinia'

const store = useUserStore();
const fit = "cover";
const labelPosition = ref('top')
const dialogFormVisible = ref(false)
const hmTargetVisible = ref(false)
const formLabelWidth = '10rem'
const { name, avatar } = storeToRefs(store)

const { hmStore } = storeToRefs(useHmStore())
const data = reactive({ name: name.value, avatar: avatar.value })
const changeName = () => {
  store.name = data.name;
  store.avatar = data.avatar;
}
const _isMobile = () => {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return !flag;
}

const current_subject: Ref<string> = ref('')
</script>

<template>
  <header>
    <div class="avatar">
      <el-avatar shape="square" :size="180" :fit="fit" :src="avatar" v-if="_isMobile()"/>
    </div>
    <div class="wrapper">
      <HelloWorld :msg="name" />
      <nav v-if="_isMobile()">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/homework">Homework</RouterLink>
      </nav>
      <div class="elbtn">
      <el-button type="primary" plain @click="hmTargetVisible = true">
        更新作业配置
      </el-button>
      <el-button type="primary" plain @click="dialogFormVisible = true">
        更新用户配置
      </el-button>
      </div>
    </div>

    <el-dialog v-model="dialogFormVisible" title="更新用户配置">
      <el-form :model="data">
        <el-form-item label="你的名字: " :label-width="formLabelWidth">
          <el-input v-model="data.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="头像地址: " :label-width="formLabelWidth">
          <el-input v-model="data.avatar" autocomplete="off" />
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
                style="width: 8rem; left: 15%" />
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

  <router-view v-slot="{ Component }" v-if="_isMobile()">
    <component :is="Component" />
  </router-view>
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
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
@media (max-width: 1024px){
  .elbtn {
    margin-left: 2rem;
  }
}
@media (min-width: 1024px) {
  .avatar {
    width: 12rem;
    margin-left: 0.1rem;
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
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .elbtn {
    margin-top: 1.5rem;
  }

  nav {
    text-align: left;
    margin-left: -0.6rem;
    font-size: 1rem;

    padding: 0.5rem 0;
    margin-top: 0.3rem;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
}
</style>
