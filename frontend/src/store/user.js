import { defineStore } from "pinia";
import { ref } from "vue";

const useUserStore = defineStore("user", () => {
  const user = ref(null);

  const setUser = (payload) => {
    user.value = payload;
  };

  return { user, setUser };
});

export default useUserStore;
