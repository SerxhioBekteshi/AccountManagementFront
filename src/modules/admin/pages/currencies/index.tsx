import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import Table from "../../../../main/components/table/index";
import eFormMode from "../../../../main/assets/enums/eFormMode";
import DetailDrawer from "../../../../main/components/DetailDrawer";
import DeleteModal from "../../../../main/components/ModalDetailDelete";
import CurrencyForm from "./CurrencyForm";
import EventManager from "../../../../main/utils/eventManager";
import Drawer from "../../../../main/components/Drawer";
import { Button, Form, FormFeedback, FormGroup, Label } from "reactstrap";
import { useDispatch } from "react-redux";
import { createAlert } from "../../../../main/store/stores/notification/notification.store";
import eNotificationType from "../../../../main/assets/enums/eNotificationType";
import { Controller, useForm } from "react-hook-form";
import FormValidationManager from "../../../../main/utils/formValidationManager";
import MultiSelect from "../../../../main/components/MultiSelect";

const CurrencyPage: FC = () => {
  const [modeDrawer, setModeDrawer] = useState(null);
  const [formData, setFormData] = useState<any>(null);
  const [deleteRowId, setDeleteRowId] = useState<number>(0);
  const [currencyId, setCurrencyId] = useState<number>(0);

  const [banks, setBanks] = useState([]);
  const [banksRendered, setBanksRendered] = useState([]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const onIconClick = async (rowId: number, actionMethod: string) => {
    switch (actionMethod) {
      case "add":
        const res: any = await (
          await axios.get(`/Currency/${rowId}/banks`)
        ).data;
        setBanksRendered(res.data);
        setCurrencyId(rowId);
        setOpenDrawer(true);

        break;

      case eFormMode.Edit:
        const m = await (await axios.get(`Currency/${rowId}`)).data;
        setFormData(m.data);
        setModeDrawer(eFormMode.Edit);
        break;

      case eFormMode.Delete:
        setDeleteRowId(rowId);
        break;
    }
  };

  const handleCategoryAdd = () => {
    setModeDrawer(eFormMode.Insert);
  };

  const handleClose = () => {
    setModeDrawer(null);
    setFormData(null);
    setDeleteRowId(0);
    setCurrencyId(0);
  };

  const handleCloseModal = () => {
    setDeleteRowId(0);
  };
  const fetchBanksAsList = async () => {
    const res: any = await (await axios.get("List/Banks/get-all")).data;
    if (res.result) {
      setBanks(res.data);
    }
  };

  useEffect(() => {
    fetchBanksAsList();
  }, []);

  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();

  const handleFormSubmit = async (data: any) => {
    let dataToSubmit: any = [];

    if (data.length == 0) {
      dataToSubmit = [];
    } else {
      dataToSubmit = data.bankIds.map((d: any) => d.value);
    }

    try {
      if (currencyId) {
        const res: any = await axios.put(`/Currency/${currencyId}/add-banks`, {
          bankIds: dataToSubmit,
        });
        if (res.data.result) {
          dispatch(
            createAlert({
              message: "Banks applied successfully",
              timeout: 3000,
              type: eNotificationType.Success,
            })
          );
          setOpenDrawer(false);
          setCurrencyId(0);
        }
      }
    } catch (err: any) {
      dispatch(
        createAlert({
          message: err,
          timeout: 3000,
          type: eNotificationType.Success,
        })
      );
    }
  };

  return (
    <div>
      <Table
        onIconClick={onIconClick}
        handleAddRow={handleCategoryAdd}
        controller="Currency"
      />
      {(modeDrawer || formData) && (
        <DetailDrawer
          onClose={handleClose}
          onSave={() => {
            handleClose();
            EventManager.raiseRefreshTable("Currency");
          }}
          modeDrawer={modeDrawer}
          formData={formData}
          controller="Currency"
        >
          <CurrencyForm />
        </DetailDrawer>
      )}
      <Drawer
        title="Add Bank"
        show={openDrawer}
        actions={
          <>
            <Button
              onClick={() => handleSubmit(handleFormSubmit)()}
              color="primary"
            >
              Save
            </Button>
            <Button color="secondary">Cancel </Button>
          </>
        }
        onClose={() => setOpenDrawer(false)}
      >
        <Form>
          <FormGroup>
            <Controller
              control={control}
              name="bankIds"
              rules={{
                required: true,
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <>
                    <Label htmlFor="Banks">Banks</Label>
                    <MultiSelect
                      id="type"
                      value={value}
                      onChange={onChange}
                      optionsRendered={banksRendered}
                      totalOptions={banks}
                      isMulti
                    />
                    <FormFeedback>
                      {FormValidationManager.extractError(error)}
                    </FormFeedback>
                  </>
                );
              }}
            />
          </FormGroup>
        </Form>
      </Drawer>

      {deleteRowId != 0 && (
        <DeleteModal
          controller="Currency"
          deleteId={deleteRowId}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CurrencyPage;
