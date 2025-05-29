import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function FormInput({
  label,
  type,
  value,
  onChange,
  onBlur,
  isValid,
  isInvalid,
  feedbackValid,
  feedbackInvalid,
  ...props
}) {
  return (
    <FloatingLabel label={label} className="mb-3">
      <Form.Control
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isValid={isValid}
        isInvalid={isInvalid}
        {...props}
      />
      <Form.Control.Feedback type="invalid">
        {feedbackInvalid}
      </Form.Control.Feedback>
      <Form.Control.Feedback type="valid">
        {feedbackValid}
      </Form.Control.Feedback>
    </FloatingLabel>
  );
}

export default FormInput;