import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input } from "reactstrap";

InputField.propTypes = {};

function InputField(props) {
  const { field, type, label, placeholder, disabled } = props;
  const { name } = field;
  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}

      <Input
        id={name}
        // name={name}
        // value={value}
        // onChange={onChange}
        // onBlur={onBlur}
        {...field}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
      />
    </FormGroup>
  );
}

export default InputField;
