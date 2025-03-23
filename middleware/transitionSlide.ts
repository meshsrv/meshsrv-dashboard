/**
 * Transition Slide
 *
 * @description Use this middleware on both pages that you want to slide between
 *
 * @example
 * definePageMeta({
 *   middleware: ['transition-slide'],
 * });
 */
export default defineNuxtRouteMiddleware((to, from) => {
  const fromPath = from.path;
  const toPath = to.path;

  if (fromPath === toPath) {
    to.meta.pageTransition = false;
    return;
  }

  // jump back
  if (fromPath.startsWith(toPath)) {
    from.meta.pageTransition = {
      name: 'slide-right',
      mode: 'out-in',
    };
    to.meta.pageTransition = {
      name: 'slide-right',
      mode: 'out-in',
    };
    return;
  }

  // jump forward
  from.meta.pageTransition = {
    name: 'slide-left',
    mode: 'out-in',
  };
  to.meta.pageTransition = {
    name: 'slide-left',
    mode: 'out-in',
  };
});
