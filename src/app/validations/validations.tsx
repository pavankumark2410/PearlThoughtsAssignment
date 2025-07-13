// src/utils/validateTeacher.ts

export type TeacherFields = {
  name: string
  role: string
  birthDate: string
}

export type TeacherErrors = {
  name: string
  role: string
  birthDate: string
}

export function validateTeacherFields(fields: TeacherFields): TeacherErrors {
  const errors: TeacherErrors = {
    name: '',
    role: '',
    birthDate: '',
  }

  if (fields.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  if (fields.role.trim().length < 2) {
    errors.role = 'Role must be at least 2 characters'
  }

  if (!fields.birthDate) {
    errors.birthDate = 'Birth date is required'
  }

  return errors
}
