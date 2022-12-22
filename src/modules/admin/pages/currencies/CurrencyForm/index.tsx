import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import eFormMode from "../../../../../main/assets/enums/eFormMode";
import MultiSelect from "../../../../../main/components/MultiSelect";
import FormValidationManager from "../../../../../main/utils/formValidationManager";

const CurrencyForm = () => {
  const { control } = useFormContext<any>();

  // const [banks, setBanks] = useState([]);

  // const fetchBanksAsList = async () => {
  //   const res: any = await (await axios.get("List/Banks/get-all")).data;
  //   if (res.result) {
  //     setBanks(res.data);
  //   }
  // };

  // useEffect(() => {
  //   fetchBanksAsList();
  // }, []);

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row style={{ marginBottom: "1rem" }}>
          <Col md={12}>
            <Controller
              control={control}
              rules={{ required: true }}
              name="code"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
                    {FormValidationManager.extractError(error)}
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
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
                    {FormValidationManager.extractError(error)}
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
              name="exchangeRate"
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Label htmlFor="exchangeRate">Exchange Rate</Label>
                  <Input
                    id="exchangeRate"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="Exchange Rate"
                    invalid={error !== undefined}
                  />
                  <FormFeedback>
                    {FormValidationManager.extractError(error)}
                  </FormFeedback>
                </>
              )}
            />
          </Col>
        </Row>
      </Form>

      {/* <Form>
        <FormGroup>
          <Controller
            control={control}
            name="bankIds"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <>
                  <Label htmlFor="Banks">Banks</Label>
                  <MultiSelect
                    id="type"
                    value={value}
                    onChange={onChange}
                    optionsRendered={mode == eFormMode.Insert ? [] : []}
                    totalOptions={banks}
                    error={error !== undefined}
                  />
                  <FormFeedback>
                    {FormValidationManager.extractError(error)}
                  </FormFeedback>
                </>
              );
            }}
          />
        </FormGroup>
      </Form> */}
    </>
  );
};

export default CurrencyForm;
