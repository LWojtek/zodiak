import {
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
  computed,
  watch,
} from "vue";
import { throttle } from "@/utilities/throttle";

export const useNavigation = () => {
  const links = [
    { id: "home", label: "Home" },
    { id: "przyjecia", label: "Przyjęcia i catering" },
    { id: "pub", label: "Pub i kręgielnia" },
    { id: "kontakt", label: "Kontakt" },
  ];

  const sections = links.map((l) => l.id);

  // ✅ IMPORTANT: do NOT start as null
  const activeSection = ref(links[0].id);

  const linkRefs = ref([]);
  const underline = ref({ left: 0, width: 0 });
  const isScrolled = ref(false);

  let observer = null;

  const setLinkRef = (el, index) => {
    if (el) {
      linkRefs.value[index] = el.$el || el;
    }
  };

  const updateUnderline = () => {
    const index = links.findIndex((l) => l.id === activeSection.value);

    const el = linkRefs.value[index];
    const container = document.querySelector("#nav-container");

    if (!el || !container) return;

    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    underline.value = {
      left: elRect.left - containerRect.left,
      width: elRect.width,
    };
  };

  const underlineStyle = computed(() => ({
    transform: `translateX(${underline.value.left}px)`,
    width: `${underline.value.width}px`,
  }));

  const throttledUpdateUnderline = throttle(updateUnderline, 50);

  const onResize = throttledUpdateUnderline;

  const onScroll = throttle(() => {
    isScrolled.value = window.scrollY > 300;
  }, 100);

  onMounted(async () => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id;
            throttledUpdateUnderline();
            break;
          }
        }
      },
      {
        // ✅ More reliable than threshold
        rootMargin: "-40% 0px -40% 0px",
      },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    await nextTick();

    // ✅ force first underline render
    updateUnderline();

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
  });

  watch(activeSection, async () => {
    await nextTick();
    throttledUpdateUnderline();
  });

  onBeforeUnmount(() => {
    observer && observer.disconnect();
    window.removeEventListener("resize", onResize);
    window.removeEventListener("scroll", onScroll);

    throttledUpdateUnderline.cancel();
    onScroll.cancel();
  });

  return {
    links,
    activeSection,
    isScrolled,
    underlineStyle,
    setLinkRef,
  };
};
