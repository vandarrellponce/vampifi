import React from 'react'
import { Col, Row } from 'react-bootstrap'
import CustomModal from '../../../components/Modals/CustomModal/CustomModal'
import Input from '../../../components/UI/Input/Input'

const UpdateCategoryModal = (props) => {
  const {
    modalTitle,
    showModal,
    handleClose,
    toggleModal,
    submitForm,
    expandedArray,
    checkedArray,
    categoryList,
    handleImage,
    updateCategoryName
  } = props
  return (
    <CustomModal
      modalTitle={modalTitle}
      showModal={showModal}
      handleClose={handleClose}
      toggleModal={toggleModal}
      submitForm={submitForm}
    >
      <Row>
        <Col>
          <h6>Expanded</h6>
        </Col>
      </Row>
      {expandedArray.length > 0 &&
        expandedArray.map((item, i) => {
          return (
            <Row key={i}>
              <Col>
                <Input
                  type="text"
                  placeholder="Enter category name"
                  required={true}
                  value={item.name}
                  onChange={(e) =>
                    updateCategoryName('name', e.target.value, i, 'expanded')
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control form-control-sm"
                  value={item.parentId}
                  onChange={(e) => {
                    updateCategoryName(
                      'parentId',
                      e.target.value,
                      i,
                      'expanded'
                    )
                  }}
                  style={{ width: '100%' }}
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
              <Col>
                <select
                  className="form-control form-control-sm"
                  value={item.displayType}
                  onChange={(e) => {
                    updateCategoryName(
                      'displayType',
                      e.target.value,
                      i,
                      'expanded'
                    )
                  }}
                >
                  <option value="Main">Select Display</option>
                  <option value="store">Store Type</option>
                  <option value="product">Products Type</option>
                  <option value="page">Page Type</option>
                </select>
              </Col>
            </Row>
          )
        })}
      <Row>
        <Col>
          <h6>Checked</h6>
        </Col>
      </Row>
      {checkedArray.length > 0 &&
        checkedArray.map((item, i) => {
          return (
            <Row key={i}>
              <Col>
                <Input
                  type="text"
                  placeholder="Enter category name"
                  required={true}
                  value={item.name}
                  onChange={(e) =>
                    updateCategoryName('name', e.target.value, i, 'checked')
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control form-control-sm"
                  value={item.parentId}
                  onChange={(e) =>
                    updateCategoryName('parentId', e.target.value, i, 'checked')
                  }
                  style={{ width: '100%' }}
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
              <Col>
                <select
                  className="form-control form-control-sm"
                  value={item.displayType}
                  onChange={(e) => {
                    updateCategoryName(
                      'displayType',
                      e.target.value,
                      i,
                      'checked'
                    )
                  }}
                >
                  <option value="Main">Select Display</option>
                  <option value="store">Store Type</option>
                  <option value="product">Products Type</option>
                  <option value="page">Page Type</option>
                </select>
              </Col>
            </Row>
          )
        })}

      {/*  <input type="file" name="categoryImage" onChange={handleImage} /> */}
    </CustomModal>
  )
}
export default UpdateCategoryModal
