import "framer-motion";

declare module "framer-motion" {
  type OldEaseStrings = "easeIn" | "easeOut" | "easeInOut" | "linear";

  interface ValueAnimationTransition {
    ease?: OldEaseStrings | Easing | Easing[] | undefined;
  }

  interface Tween {
    ease?: OldEaseStrings | Easing | Easing[] | undefined;
  }

  interface Spring {
    ease?: OldEaseStrings | Easing | Easing[] | undefined;
  }
}

declare module "framer-motion" {
  type OldTransitionTypes = "tween" | "spring" | "inertia" | "keyframes";

  interface ValueAnimationTransition {
    type?: OldTransitionTypes | AnimationGeneratorType | undefined;
  }

  interface Tween {
    type?: OldTransitionTypes | AnimationGeneratorType | undefined;
  }

  interface Spring {
    type?: OldTransitionTypes | AnimationGeneratorType | undefined;
  }
}
