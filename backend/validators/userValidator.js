import { check, validationResult } from 'express-validator'

export const validateRegister = [
  check('firstname').notEmpty().withMessage('First name must not be empty'),
  check('lastname').notEmpty().withMessage('Last name must not be empty'),
  check('email').notEmpty().withMessage('Email should not be empty'),
  check('password').notEmpty().withMessage('Password should not be empty')
]

export const validateLogin = [
  check('email').notEmpty().withMessage('Email should not be empty'),
  check('password').notEmpty().withMessage('Password should not be empty')
]

export const isValidated = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.array().length) {
    throw new Error(errors.array()[0].msg)
  }

  next()
}
