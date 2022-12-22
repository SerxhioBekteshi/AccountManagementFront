import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import formValidationManager from "../../../../../main/utils/formValidationManager";
import FileInput from "../../../../../main/components/FileInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CategoryForm = (props: any) => {
  const { model } = props;

  const { control } = useFormContext<any>();
  const inputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [pictureChanged, setPicturedChanged] = useState(false);

  const getImageUrl = (img: any, tempImg: any) => {
    if (tempImg) {
      let result = URL.createObjectURL(tempImg);
      return result;
    }
    if (img) {
      let result = URL.createObjectURL(img);
      return result;
    }
    return "";
  };

  const getExistingImage = useCallback(async () => {
    const image = model ? model.image : null;
    if (image) {
      const base64image = await fetch(`data:image/jpeg;base64, ${image}`);
      const blobIcon = await base64image.blob();
      setImage(blobIcon);
    }
  }, [model]);

  useEffect(() => {
    getExistingImage();
  }, [getExistingImage]);

  const handleChangeImage = (file: any) => {
    if (file) {
      setTempImage(file);
      setPicturedChanged(true);
    }
  };

  const handleClick = () => {
    inputRef?.current.click();
  };

  const handleDiscardChanges = (e: any) => {
    e.stopPropagation();
    inputRef.current.value = "";
    setPicturedChanged(false);
    setTempImage(null);
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Row style={{ marginBottom: "1rem" }}>
        <Col md={12}>
          <Controller
            control={control}
            name="image"
            render={({ field: { onChange }, fieldState: { error } }) => (
              <>
                <Label htmlFor="image">Image</Label>
                <div className="d-flex align-items-center mb-2 category">
                  <img
                    src={getImageUrl(image, tempImage)}
                    className="category_content"
                    alt="profile-pic"
                  />
                  <FileInput
                    ref={inputRef}
                    className="d-none"
                    allowedFileTypes={["image/png", "image/jpeg"]}
                    onChange={(file: any) => {
                      handleChangeImage(file);
                      onChange(file);
                    }}
                  />
                  {/* {pictureChanged ? (
                    <>
                      <div className="confirm-buttons" onClick={handleClick}>
                        <Button onClick={handleDiscardChanges} color="danger">
                          Cancel
                        </Button>
                        <Button
                          onClick={() => console.log("DWAWD")}
                          color="success"
                          outline
                        >
                          Save
                        </Button>
                      </div>
                    </>
                  ) : ( */}

                  <div onClick={handleClick} className="category_content2">
                    <FontAwesomeIcon
                      size="2x"
                      icon={"fa-solid fa-image" as any}
                    />
                    <span className="profilepic__text">
                      Edit Category Image
                    </span>
                  </div>

                  {/* )} */}
                </div>
                <FormFeedback>
                  {formValidationManager.extractError(error)}
                </FormFeedback>
              </>
            )}
          />
        </Col>

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
