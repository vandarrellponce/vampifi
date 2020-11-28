import React from 'react'
import { Button, Modal } from 'react-bootstrap'

interface myProps {
  showModal: any
  toggleModal: any
  modalTitle: string
  handleClose: any
  submitForm: any
}

const CustomModal: React.FC<myProps> = (props) => {
  return (
    <div>
      <Modal show={props.showModal} onHide={props.toggleModal}>
        <Modal.Header>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>

          <Button variant="dark" onClick={props.submitForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CustomModal
