import React from 'react'
import { Col, Row } from 'react-bootstrap'
import CustomModal from '../../../components/Modals/CustomModal/CustomModal'
import Input from '../../../components/UI/Input/Input'

const AddCategoryModal = (props) => {
  const {
    modalTitle,
    showModal,
    handleClose,
    toggleModal,
    submitForm,
    categoryList,
    handleImage,
    setNewCatName,
    newCatName,
    newCatParent,
    handleChange
  } = props

  return (
    <CustomModal
      modalTitle={modalTitle}
      showModal={showModal}
      toggleModal={toggleModal}
      handleClose={handleClose}
      submitForm={submitForm}
    >
      <Row
        style={{
          justifyContent: 'center'
        }}
      >
        <Col>
          Category Name
          <Input
            type="text"
            placeholder="Enter category name"
            required={true}
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
          />
        </Col>
        <Col>
          Parent Name
          <select
            className="form-control form-control-sm"
            value={newCatParent}
            onChange={handleChange}
          >
            <option value={'Main'}>Main</option>
            {categoryList.map((option) => {
              return (
                <option value={option.value} key={option.value}>
                  {option.name}
                </option>
              )
            })}
          </select>
        </Col>
      </Row>
      <Row
        style={{ display: 'flex', flexDirection: 'column', marginLeft: '1px' }}
      >
        Image
        <input type="file" name="categoryImage" onChange={handleImage} />
      </Row>
    </CustomModal>
  )
}

export default AddCategoryModal
