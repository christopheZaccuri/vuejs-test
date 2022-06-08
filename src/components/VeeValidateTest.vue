<template>
  <Form @submit="submit" :validation-schema="schema">
    <Field name="city" type="input" />
    <ErrorMessage name="city" />

    <Field name="password" type="password" />
    <ErrorMessage name="password" />

    <button>Submit</button>
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data: () => ({
    min: 6,
  }),
  computed: {
    schema() {
      return yup.object({
        password: yup.string().min(this.min, `minimum ${this.min} caracteres`),
        city : yup.string().matches(/^[a-zA-Z_.]/g, "chiffres non acceptés")
      });
    },
  },
};
</script>
