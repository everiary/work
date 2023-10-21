import { defineStore } from "pinia";
import { reactive } from "vue";

interface HmStore {
    [propName:string]:{[propName:string]:{t:number,c:number,r:number}}
}
export const useHmStore = defineStore(
  "homeworkStore",
  () => {
    const default_hm = {
        语文: {练习册:{t:20,c:1,r:0.5}, 试卷:{t:10,c:1,r:1}},
        数学: {练习册:{t:20,c:1,r:0.5}, 试卷:{t:10,c:1,r:1}},
        英语: {练习册:{t:20,c:1,r:0.5}, 试卷:{t:10,c:1,r:1}},
    }
    const hmStore:HmStore = reactive(default_hm)
    return { hmStore };
  },
  {
    persist: true,
  }
);