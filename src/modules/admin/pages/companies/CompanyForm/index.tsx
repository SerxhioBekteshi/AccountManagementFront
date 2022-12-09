import React from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import formValidationManager from "../../../../../main/utils/formValidationManager";

const CompanyForm = () => {
  const { control } = useFormContext<any>();
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Row style={{ marginBottom: "1rem" }}>
        <Col md={12}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={value}
                  onChange={onChange}
                  placeholder="Name"
                  invalid={error !== undefined}
                />
                <FormFeedback>
                  {formValidationManager.extractError(error)}
                </FormFeedback>
              </>
            )}
          />
        </Col>
      </Row>

      <Row style={{ marginBottom: "1rem" }}>
        <Col md={12}>
          <Controller
            control={control}
            name="country"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  type="text"
                  value={value}
                  onChange={onChange}
                  placeholder="Country"
                  invalid={error !== undefined}
                />
                <FormFeedback>
                  {formValidationManager.extractError(error)}
                </FormFeedback>
              </>
            )}
          />
        </Col>
      </Row>

      <Row style={{ marginBottom: "1rem" }}>
        <Col md={12}>
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  value={value}
                  onChange={onChange}
                  placeholder="Address"
                  invalid={error !== undefined}
                />
                <FormFeedback>
                  {formValidationManager.extractError(error)}
                </FormFeedback>
              </>
            )}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default CompanyForm;
