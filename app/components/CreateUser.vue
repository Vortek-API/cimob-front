<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

const state = reactive({
  cpf: undefined,
  nome: undefined,
  sobrenome: undefined,
  username: undefined,
  email: undefined,
  cargo: undefined,
  password: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.cpf) errors.push({ name: 'cpf', message: 'Required' })
  if (!state.nome) errors.push({ name: 'nome', message: 'Required' })
  if (!state.sobrenome) errors.push({ name: 'sobrenome', message: 'Required' })
  if (!state.username) errors.push({ name: 'username', message: 'Required' })
  if (!state.email) errors.push({ name: 'email', message: 'Required' })
  if (!state.cargo) errors.push({ name: 'cargo', message: 'Required' })
  if (!state.password) errors.push({ name: 'password', message: 'Required' })
  return errors
}

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<typeof state>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>

<template>
  <div>
    <UForm :validate="validate" :state="state" @submit="onSubmit">
      <UFormField label="Nome" name="nome">
        <UInput v-model="state.nome" />
      </UFormField>

      <UFormField label="Sobrenome" name="sobrenome">
        <UInput v-model="state.sobrenome" />
      </UFormField>

      <UFormField label="Username" name="username">
        <UInput v-model="state.username" />
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormField>

      <UFormField label="CPF" name="cpf">
        <UInput v-model="state.cpf" />
      </UFormField>

      <UFormField label="Cargo" name="cargo">
        <UInput v-model="state.cargo" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormField>

      <div>
        <UButton type="submit">
          salvar
        </UButton>
      </div>
    </UForm>
  </div>
</template>
