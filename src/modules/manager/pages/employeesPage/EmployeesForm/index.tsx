import React from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import formValidationManager from "../../../../../main/utils/formValidationManager";


const EmployeesForm = () =>
{
    const { control } = useFormContext<any>();

    return(
        <Form onSubmit={(e) => e.preventDefault()}> 
            <Row style={{marginBottom: "1rem"}} >
                <Col md = {12}>
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

            <Row style={{marginBottom: "1rem"}}>
                <Col md = {12}>
                <Controller
                    control={control}
                    name="position"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <Label htmlFor="position">Position</Label>
                        <Input
                            id="position"
                            type="text"
                            value={value}
                            onChange={onChange}
                            placeholder="Position"
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

            <Row style={{marginBottom: "1rem"}}>
                <Col md = {12}>
                <Controller
                    control={control}
                    name="age"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <Label htmlFor="age">Age</Label>
                        <Input
                            id="age"
                            type="number"
                            value={Number(value)}
                            onChange={onChange}
                            placeholder="Age"
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
    )
}

export default EmployeesForm;