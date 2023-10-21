import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const name = ref("wemsx");
    const avatar = ref(
      "https://cravatar.cn/avatar/95d35c34b1302443c6b94a2aa74a2065"
    );

    return { name, avatar };
  },
  {
    persist: true,
  }
);
