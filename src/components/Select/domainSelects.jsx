import React from "react";
import DomainSelect from "./DomainSelect";

export const CitySelect = ({...props}) => <DomainSelect
  label={"Город"}
  reducerKey={"cities"}
  reducerArrayKey={"city"}
  {...props}
/>
