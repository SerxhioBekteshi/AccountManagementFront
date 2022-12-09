import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import eNotificationType from "../../assets/enums/eNotificationType";
import eFormMode from "../../assets/enums/eFormMode";
import { createAlert } from "../../store/stores/notification/notification.store";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Container } from "reactstrap";
import Drawer from "../Drawer/index";
import EventManager from "../../utils/eventManager";

export interface IDetailDrawerProps {
  modeDrawer: eFormMode;
  onClose: () => void;
  formData: any;
  children: React.ReactNode;
  controller?: string;
  onSave?: () => void;
}

const DetailDrawer = (props: IDetailDrawerProps) => {
  const { controller, onClose, modeDrawer, formData, children, onSave } = props;
  const [open, setOpen] = useState<boolean>(false);

  const controllerParts = controller.split("/");

  const methods = useForm();
  const { handleSubmit, reset, setValue, formState } = methods;

  const dispatch = useDispatch();

  const handleFormSubmit = async (data: any) => {
    console.log(data, "DATA");
    let result: any;
    try {
      switch (modeDrawer) {
        case eFormMode.Edit:
          result = await axios.put(
            `/${controllerParts[0]}/${formData.id}`,
            data
          );
          break;

        case eFormMode.Insert:
          if (controllerParts.length == 1) {
            result = await axios.post(controller, data);
          } else {
            result = await axios.post(
              `/${controllerParts[0]}/${controllerParts[1]}`,
              data
            );
          }

          break;
      }

      if (result.data.result) {
        dispatch(
          createAlert({
            message: `${result.data.successMessage}`,
            type: eNotificationType.Success,
            timeout: 3000,
          })
        );
        onSave();
      }
    } catch (err: any) {
      dispatch(
        createAlert({
          message: err,
          type: eNotificationType.Error,
          timeout: 3000,
        })
      );
    }
  };

  useEffect(() => {
    setOpen(true);
    if (formData) {
      for (const [key, value] of Object.entries(formData)) {
        setValue(key, value);
      }
    }
  }, [formData, setValue]);
  return (
    <>
      <Drawer
        title={
          modeDrawer == "edit"
            ? `Edit ${controllerParts[0]}`
            : `Add ${controllerParts[0]}`
        }
        show={open}
        onClose={() => {
          onClose();
          setOpen(false);
          reset();
        }}
        actions={
          <>
            <Button
              color="primary"
              type="submit"
              onClick={() => handleSubmit(handleFormSubmit)()}
              disabled={Object.keys(formState.dirtyFields).length === 0}
            >
              Approve
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                onClose();
                setOpen(false);
                reset();
              }}
            >
              Cancel
            </Button>
          </>
        }
      >
        {formData !== undefined && open && (
          <FormProvider {...methods}>{children}</FormProvider>
        )}
      </Drawer>
    </>
  );
};

export default DetailDrawer;
