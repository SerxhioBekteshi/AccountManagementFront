import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Col, Container, FormFeedback, Input, Label, Row } from "reactstrap";
import formValidationManager from "../../../../main/utils/formValidationManager";

const CompanyView = () => {
  const { id } = useParams();

  const [companyData, setCompanyData] = useState();

  const { control, handleSubmit } = useForm({
    defaultValues: companyData ? companyData : {},
  });

  const fetchCompanyData = async () => {
    const res: any = await axios.get(`Companies/${id}`);
    setCompanyData(res.data.data);
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  return (
    <div>
      <Container
        style={{
          backgroundColor: "white",
          padding: "1rem",
          marginTop: "1rem",
          borderRadius: "1rem",
        }}
      >
        <Row>
          <Col md="6">
            <Controller
              control={control}
              name={"address" as never}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
          <Col md="6">
            <Controller
              control={control}
              name={"country" as never}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
        <Row>
          <Col md="12">
            <Controller
              control={control}
              name={"name" as never}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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

        <Row>
          KETU DO JENE KATEGORITE E SELEKTUARA, DO FUNKSIONOJ SI MULTI SELECT
        </Row>
      </Container>
    </div>
  );
};

export default CompanyView;
