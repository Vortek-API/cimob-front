import { ref } from "vue";

export type AlertColor = "success" | "warning" | "neutral" | "primary" | "secondary" | "info" | "error";
export type ButtonVariant = "solid" | "subtle" | "outline" | "ghost" | undefined;

export type AlertAction = {
  label: string;
  onClick?: () => void;
  color?: AlertColor;
  variant?: ButtonVariant;
};

export type AlertOptions = {
  title?: string;
  description: string;
  color?: AlertColor; // <--- agora só aceita tipos válidos
  actions?: AlertAction[];
};

export const currentAlert = ref<AlertOptions | null>(null);

export function alertAviso(description: string) {
  currentAlert.value = {
    title: "Atenção",
    description,
    color: "warning",
    actions: [],
  };
}

export function alertSucesso(description: string) {
  currentAlert.value = {
    title: "Sucesso",
    description,
    color: "success",
    actions: [],
  };
}

export function alertConfirmacao(description: string, onConfirm: () => void) {
  currentAlert.value = {
    title: "Confirmação",
    description,
    color: "warning",
    actions: [
      { label: "Sim", onClick: onConfirm, color: "warning", variant: "solid" },
      { label: "Cancelar", onClick: () => (currentAlert.value = null), color: "neutral", variant: "subtle" },
    ],
  };
}
