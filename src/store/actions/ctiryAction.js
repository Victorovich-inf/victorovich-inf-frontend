import { cityCRUD } from "../../http";
import {setCity} from "../reducers/citiesReducer";

export const getCity = () => async (dispatch) => {
    const data = await cityCRUD.search()
    dispatch(setCity(data))
    return data
}