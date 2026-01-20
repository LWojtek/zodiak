import { ref, onMounted, onUnmounted } from "vue";

export function useScrollOpacity(options) {
  const start = options?.start ?? 0;
  const end = options?.end ?? window.innerHeight * 0.6;
  const min = options?.min ?? 0;

  const opacity = ref(1);

  const update = () => {
    const y = window.scrollY;

    if (y <= start) {
      opacity.value = 1;
    } else if (y >= end) {
      opacity.value = min;
    } else {
      const progress = (y - start) / (end - start);
      opacity.value = 1 - progress * (1 - min);
    }
  };

  onMounted(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", update);
  });

  return { opacity };
}
