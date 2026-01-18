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
      base: "w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8",
    },
    button: {
      slots: {
        base: "cursor-pointer",
      },
      variants: {
        size: {
          md: {
            base: "px-4 py-2.5 text-base rounded-xl",
          },
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
            "bg-white/10 backdrop-blur-sm text-inverted  focus-visible:ring-white/100  ring-white/30 hover:bg-primary/0 active:bg-primary/50 ",
        },
      ],
    },
    badge: {
      slots: {
        base: "",
      },
      variants: {
        size: {
          md: {
            base: "!text-xs",
          },
        },
      },
      compoundVariants: [
        {
          color: "secondary",
          variant: "subtle",
          class: "bg-almond-100  rounded-full text-almond-700",
        },
        {
          color: "secondary",
          variant: "ghost",
          class:
            "bg-white/10 backdrop-blur-xs rounded-full text-white ring-none",
        },
      ],
    },
    modal: {
      variants: {
        overlay: {
          true: {
            overlay: "bg-black/85 backdrop-blur-xs",
          },
        },
      },
    },
  },
});
