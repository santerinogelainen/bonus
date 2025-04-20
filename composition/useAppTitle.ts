import type { ComputedGetter } from "vue";

export const useAppTitle = (getter: ComputedGetter<string>) => {
  const title = inject('app-title') as Ref<string>;
  const value = computed(getter);

  const update = () => {
    title.value = value.value;
  }

  onMounted(update);
  watch(value, update);
  return title;
};
