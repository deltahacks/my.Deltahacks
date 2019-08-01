import Vue, { Component, ComponentOptions, PluginObject } from 'vue';

export const install: Component & ComponentOptions<Vue> & PluginObject<any>;

export default install;

declare module 'vue/types/vue' {

  interface ProgressMethods {
    start: Function;
    finish: Function;
    fail: Function;
  }

  interface Vue {
    $Progress: ProgressMethods;
  }
}
