import React, { FC } from 'react'
import { Form } from 'react-bootstrap'

interface myProps {
  label: string
  required: boolean
  type: string
  placeholder: string
  value: string
  onChange: any
}

const Input: FC<myProps> = (props) => {
  return (
    <div>
      <Form.Group>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          onChange={(e) => {
            props.onChange(e.target.value)
          }}
          value={props.value}
          required={props.required}
          size="sm"
          type={props.type}
          placeholder={props.placeholder}
          autoComplete="auto"
        />
      </Form.Group>
    </div>
  )
}

export default Input
