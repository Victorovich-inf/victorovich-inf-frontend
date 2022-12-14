import React from "react";
import DomainSelect from "./DomainSelect";
import { getCity } from '../../store/actions/ctiryAction';

export const CitySelect = ({...props}) => <DomainSelect
  label={"Город"}
  reducerKey={"cities"}
  reducerArrayKey={"city"}
  reducerAction={getCity}
  {...props}
/>
