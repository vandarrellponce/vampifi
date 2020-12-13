import axiosHelper from '../../helpers/axios'
import defineError from '../../helpers/defineError'

const getPage = ({ category, type }) => async (dispatch) => {
  try {
    const page = await (await axiosHelper.get(`/page/${category}/${type}`)).data
    return page
  } catch (error) {
    return defineError(error)
  }
}

export default getPage
