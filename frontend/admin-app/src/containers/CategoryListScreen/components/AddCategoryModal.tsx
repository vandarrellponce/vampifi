import React from 'react'
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
      <Input
        type="text"
        label="Category Name"
        placeholder="Enter category name"
        required={true}
        value={newCatName}
        onChange={(e) => setNewCatName(e.target.value)}
      />
      Parent Category <br />
      <select
        className="form-control"
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
      <input type="file" name="categoryImage" onChange={handleImage} />
    </CustomModal>
  )
}

export default AddCategoryModal
