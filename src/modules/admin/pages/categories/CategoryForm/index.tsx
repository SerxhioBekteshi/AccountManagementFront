import React from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import formValidationManager from "../../../../../main/utils/formValidationManager";

const CategoryForm = () => {
  const { control } = useFormContext<any>();

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Row style={{ marginBottom: "1rem" }}>
        <Col md={12}>
          <Controller
            control={control}
            name="code"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Label htmlFor="Code">Code</Label>
                <Input
                  id="Code"
                  type="text"
                  value={value}
                  onChange={onChange}
                  placeholder="Code"
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
            name="description"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  value={value}
                  onChange={onChange}
                  placeholder="Description"
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

export default CategoryForm;
