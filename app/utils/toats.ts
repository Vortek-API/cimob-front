import { createToast } from "mosha-vue-toastify";

  export function toastAviso(msg: string) {
    createToast(msg, { type: "warning", position: "top-center", showIcon: true, timeout: 3000 });
  }

  export function toastSucesso(msg: string) {
    createToast(msg, { type: "success", position: "top-center", showIcon: true, timeout: 3000 });
  }
