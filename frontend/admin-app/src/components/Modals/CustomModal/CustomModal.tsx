import React from 'react'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'
import './CustomModal.css'

interface myProps {
  showModal?: any
  toggleModal?: any
  modalTitle: string
  handleClose?: any
  submitForm?: any
}

const CustomModal: React.FC<myProps> = (props) => {
  const handleClose = () => {}
  return (
    <div>
      <Modal
        show={props.showModal}
        onHide={props.toggleModal}
        className="modal__main"
      >
        <Form onSubmit={props.submitForm}>
          <Modal.Header className="modal__header">
            <Modal.Title className="modal__title">
              {props.modalTitle}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal__body">{props.children}</Modal.Body>
          <Modal.Footer>
            <Button
              size="sm"
              variant="secondary"
              onClick={props.handleClose || handleClose}
            >
              Close
            </Button>

            <Button
              size="sm"
              variant="dark"
              /* onClick={props.submitForm} */
              type="submit"
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default CustomModal
