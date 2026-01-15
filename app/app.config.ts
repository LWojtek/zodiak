export default defineAppConfig({
  ui: {
    colors: {
      primary: "burgundy",
      secondary: "yellow",
    },
    separator: {
      slots: {
        border: "border-red-900",
      },
    },
    container: {
      base: "w-full max-w-(--ui-container) mx-auto px-2 sm:px-4 lg:px-6",
    },
    button: {
      slots: {
        base: "cursor-pointer",
      },
      variants: {
        size: {
          lg: {
            base: "px-6 py-3 sm:py-4 sm:px-8 text-lg rounded-xl",
          },
        },
      },
      compoundVariants: [
        {
          color: "secondary",
          variant: "solid",
          class: " bg-secondary text-black hover:bg-secondary/80 ",
        },
        {
          color: "neutral",
          variant: "outline",
          class:
            "bg-white/5 backdrop-blur-xs text-inverted  focus-visible:ring-white/100  ring-white/30 hover:bg-primary/0 active:bg-primary/50 ",
        },
      ],
    },
  },
});
