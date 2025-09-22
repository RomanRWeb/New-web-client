"use client";
import "./LegalEntityModal.scss";
import Modal from "@app/common/components/modal/Modal";
import { ChevronLeftIcon } from "@app/common/icons/chevron-left";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@app/store/store";
import { CustomInput } from "@app/common/components/custom-input/CustomInput";
import { CustomButton } from "@app/common/components/custom-button/CustomButton";
import { CloseInnIcon } from "@app/common/icons/close-inn";
import { SuccessInnIcon } from "@app/common/icons/success-inn";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const LegalEntityModal = ({ isVisible, onClose }: ModalProps) => {
  const uiState = useSelector((state: RootState) => state.ui);
  const onlyDigitsRegex = useMemo(() => /^\d{10}$/, []);
  const fullNameRegex = useMemo(
    () => /^[а-яА-ЯёЁ]{2,}\s[а-яА-ЯёЁ]{2,}(\s[а-яА-ЯёЁ]{2,})?$/u,
    [],
  );
  const phoneRegex = useMemo(
    () =>
      /^[+]?[0-9][-\s.]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{2}[-\s.]?[0-9]{2}$/,
    [],
  );

  const [inn, setInn] = useState<string>(uiState.currentClient?.inn || "");
  const [isInnOk, setIsInnOk] = useState<boolean>(false);
  const [innNotFound, setInnNotFound] = useState<boolean>(false);
  useEffect(() => {
    setIsInnOk(onlyDigitsRegex.test(inn.replaceAll(" ", "")));
  }, [inn, onlyDigitsRegex]);

  useEffect(() => {
    if (isInnOk) {
      if (Number(inn[inn.length - 1]) % 2 !== 0) {
        setInnNotFound(true);
      } else setInnNotFound(false);
    }
  }, [isInnOk]);

  const [adminName, setAdminName] = useState<string>(
    uiState.currentClient?.adminName || "",
  );
  const [adminNameError, setAdminNameError] = useState<boolean>(false);
  useEffect(() => {
    setAdminNameError(adminName.length === 0);
  }, [adminName, fullNameRegex]);

  const [adminEmail, setAdminEmail] = useState<string>(
    uiState.currentClient?.adminEmail || "",
  );
  const [adminEmailError, setAdminEmailError] = useState<boolean>(false);
  useEffect(() => {
    setAdminEmailError(adminEmail.length === 0);
  }, [adminEmail.length]);

  const [adminPhone, setAdminPhone] = useState<string>(
    uiState.currentClient?.adminPhone || "",
  );
  const [adminPhoneError, setAdminPhoneError] = useState<boolean>(false);
  useEffect(() => {
    setAdminPhoneError(!phoneRegex.test(adminPhone) || adminPhone.length === 0);
  }, [adminPhone, phoneRegex]);

  const [ownerName, setOwnerName] = useState<string>(
    uiState.currentClient?.name || "",
  );
  const [ownerNameError, setOwnerNameError] = useState<boolean>(false);
  useEffect(() => {
    setOwnerNameError(ownerName.length === 0);
  }, [ownerName.length]);

  const [ownerEmail, setOwnerEmail] = useState<string>(
    uiState.currentClient?.ownerEmail || "",
  );
  const [ownerEmailError, setOwnerEmailError] = useState<boolean>(false);
  useEffect(() => {
    setOwnerEmailError(ownerEmail.length === 0);
  }, [ownerEmail.length]);

  const [ownerPhone, setOwnerPhone] = useState<string>(
    uiState.currentClient?.ownerPhone || "",
  );
  const [ownerPhoneError, setOwnerPhoneError] = useState<boolean>(false);
  useEffect(() => {
    setOwnerPhoneError(!phoneRegex.test(ownerPhone) || ownerPhone.length === 0);
  }, [ownerPhone, phoneRegex]);

  const [organizationName, setOrganizationName] = useState<string>(
    uiState.currentClient?.organizationName || "",
  );
  const [organizationNameError, setOrganizationNameError] =
    useState<boolean>(false);
  useEffect(() => {
    setOrganizationNameError(organizationName.length === 0);
  }, [organizationName.length]);

  const [kpp, setKpp] = useState<string>(uiState.currentClient?.kpp || "");
  const [kppError, setKppError] = useState<boolean>(false);
  useEffect(() => {
    setKppError(onlyDigitsRegex.test(kpp) || kpp.length !== 9);
  }, [kpp, onlyDigitsRegex]);

  const [ogrn, setOgrn] = useState<string>(uiState.currentClient?.ogrn || "");
  const [ogrnError, setOgrnError] = useState<boolean>(false);
  useEffect(() => {
    setOgrnError(onlyDigitsRegex.test(ogrn) || ogrn.length !== 13);
  }, [ogrn, onlyDigitsRegex]);

  const [documentAddress, setDocumentAddress] = useState<string>(
    uiState.currentClient?.documentAddress || "",
  );
  const [documentAddressError, setDocumentAddressError] =
    useState<boolean>(false);
  useEffect(() => {
    setDocumentAddressError(documentAddress.length === 0);
  }, [documentAddress.length]);

  const [physicalAddress, setPhysicalAddress] = useState<string>(
    uiState.currentClient?.physicalAddress || "",
  );
  const [physicalAddressError, setPhysicalAddressError] =
    useState<boolean>(false);
  useEffect(() => {
    setPhysicalAddressError(physicalAddress.length === 0);
  }, [physicalAddress.length]);

  const [gmName, setGmName] = useState<string>(
    uiState.currentClient?.gmName || "",
  );
  const [gmNameError, setGmNameError] = useState<boolean>(false);
  useEffect(() => {
    setGmNameError(gmName.length === 0);
  }, [gmName.length]);

  const [accountantName, setAccountantName] = useState<string>(
    uiState.currentClient?.accountantName || "",
  );
  const [accountantNameError, setAccountantNameError] =
    useState<boolean>(false);
  useEffect(() => {
    setAccountantNameError(accountantName.length === 0);
  }, [accountantName.length]);

  const [companyPhone, setCompanyPhone] = useState<string>(
    uiState.currentClient?.companyPhone || "",
  );
  const [companyPhoneError, setCompanyPhoneError] = useState<boolean>(false);
  useEffect(() => {
    setCompanyPhoneError(
      !phoneRegex.test(companyPhone) || companyPhone.length === 0,
    );
  }, [companyPhone, phoneRegex]);

  const [currentAccount, setCurrentAccount] = useState<string>(
    uiState.currentClient?.currentAccount || "",
  );
  const [currentAccountError, setCurrentAccountError] =
    useState<boolean>(false);
  useEffect(() => {
    setCurrentAccountError(
      onlyDigitsRegex.test(currentAccount) || currentAccount.length !== 20,
    );
  }, [currentAccount, onlyDigitsRegex]);

  const [bik, setBik] = useState<string>(uiState.currentClient?.bik || "");
  const [bikError, setBikError] = useState<boolean>(false);
  useEffect(() => {
    setBikError(onlyDigitsRegex.test(bik) || bik.length !== 9);
  }, [bik, onlyDigitsRegex]);

  const [bankName, setBankName] = useState<string>(
    uiState.currentClient?.bankName || "",
  );
  const [bankNameError, setBankNameError] = useState<boolean>(false);
  useEffect(() => {
    setBankNameError(bankName.length === 0);
  }, [bankName.length]);

  const [correspondingAccount, setCorrespondingAccount] = useState<string>(
    uiState.currentClient?.correspondingAccount || "",
  );
  const [correspondingAccountError, setCorrespondingAccountError] =
    useState<boolean>(false);
  useEffect(() => {
    setCorrespondingAccountError(
      onlyDigitsRegex.test(correspondingAccount) ||
        correspondingAccount.length !== 20,
    );
  }, [correspondingAccount, onlyDigitsRegex]);

  const [dataOk, setDataOk] = useState<boolean>(true);
  useEffect(() => {
    if (
      !adminNameError &&
      !adminPhoneError &&
      !adminEmailError &&
      !ownerNameError &&
      !ownerPhoneError &&
      !ownerEmailError &&
      !innNotFound &&
      isInnOk &&
      !organizationNameError &&
      !kppError &&
      !ogrnError &&
      !documentAddressError &&
      !physicalAddressError &&
      !gmNameError &&
      !accountantNameError &&
      !companyPhoneError &&
      !currentAccountError &&
      !bikError &&
      !bankNameError &&
      !correspondingAccountError
    ) {
      setDataOk(true);
    } else setDataOk(false);
  }, [
    accountantNameError,
    adminEmailError,
    adminNameError,
    adminPhoneError,
    bankNameError,
    bikError,
    companyPhoneError,
    correspondingAccountError,
    currentAccountError,
    documentAddressError,
    gmNameError,
    innNotFound,
    isInnOk,
    kppError,
    ogrnError,
    organizationNameError,
    ownerEmailError,
    ownerNameError,
    ownerPhoneError,
    physicalAddressError,
  ]);

  const fillInnData = useCallback(() => {
    setOrganizationName("ООО “Начинается”");
    setKpp("123654789");
    setOgrn("1236547896541");
    setDocumentAddress("г. Москва,Бульвар победы 17");
    setPhysicalAddress("г. Москва,Бульвар победы 17");
    setGmName("Иванов Иван Иванович");
    setAccountantName("Петрова Зинаида Агафьевна");
    setCompanyPhone("+7 845 999 99 99");
    setCurrentAccount("12365478965412345678");
    setBik("");
    setBankName("");
    setCorrespondingAccount("12365478965412345678");
  }, []);

  const loadContract = useCallback(() => {}, []);

  const saveData = useCallback(() => {
    // const newDataClient: ClientType = {
    //   ...client,
    //   ownerName: ownerName,
    //   ownerPhone: ownerPhone,
    //   ownerEmail: ownerEmail,
    //   adminName: adminName,
    //   adminEmail: adminEmail,
    //   adminPhone: adminPhone,
    //   inn: inn,
    //   organizationName: organizationName,
    //   kpp: kpp,
    //   ogrn: ogrn,
    //   documentAddress: documentAddress,
    //   physicalAddress: physicalAddress,
    //   gmName: gmName,
    //   accountantName: accountantName,
    //   companyPhone: companyPhone,
    //   currentAccount: currentAccount,
    //   bik: bik,
    //   bankName: bankName,
    //   correspondingAccount: correspondingAccount,
    // };
    // fetch newClientData
  }, []);

  return (
    <Modal
      className={"legal-entity-modal"}
      title={
        <div className={"return-wrapper"} onClick={onClose}>
          <ChevronLeftIcon />
          <span>{"Назад"}</span>
        </div>
      }
      isVisible={isVisible}
      onCloseFunk={onClose}
    >
      <div className={"header"}>
        <h1>{"Данные организации"}</h1>
        {dataOk && isInnOk && !innNotFound ? (
          <span className={"message"}>
            {"Заполните данные организации для создание плательщика"}
          </span>
        ) : null}
        {!dataOk && !innNotFound ? (
          <span className={"message-error"}>
            {
              "Необходимо заполнить все обязательные поля для возможности формирования договора и платежных документов"
            }
          </span>
        ) : null}
        {innNotFound ? (
          <span className={"message-error"}>
            {`Не удалось найти данные для заполнения реквизитов по ИНН ${inn}. Повторите попытку указав верный ИНН организации`}
          </span>
        ) : null}
      </div>
      <section className={"info-container"}>
        <div className={"info-row"}>
          <section>
            <h1>{"Данные админа"}</h1>
            <CustomInput
              value={adminName}
              title={"ФИО админа"}
              onChange={setAdminName}
              errState={adminNameError}
            />
            <CustomInput
              value={adminPhone}
              title={"Телефон админа"}
              onChange={setAdminPhone}
              errState={adminPhoneError}
            />
            <CustomInput
              value={adminEmail}
              title={"Email админа"}
              onChange={setAdminEmail}
              errState={adminEmailError}
            />
          </section>
          <section>
            <div className={"section-header"}>
              <h1>{"Данные владельца"}</h1>
              <span>
                {"Данные владельца нужны на случай восстановления доступа"}
              </span>
            </div>
            <CustomInput
              value={ownerName}
              title={"ФИО админа"}
              onChange={setOwnerName}
              errState={ownerNameError}
            />
            <CustomInput
              value={ownerPhone}
              title={"Телефон админа"}
              onChange={setOwnerPhone}
              errState={ownerPhoneError}
            />
            <CustomInput
              value={ownerEmail}
              title={"Email админа"}
              onChange={setOwnerEmail}
              errState={ownerEmailError}
            />
            <div>
              <CustomButton
                buttonName={"Договор"}
                type={"Blank"}
                onClick={loadContract}
              />
            </div>
          </section>
        </div>
        <div className={"inn-block"}>
          <div className={"inn"}>
            <CustomInput
              value={inn}
              title={"ИНН"}
              onChange={setInn}
              errState={!isInnOk}
            />
            {isInnOk && !innNotFound ? (
              <>
                <div>
                  <SuccessInnIcon />
                </div>
                <CustomButton
                  buttonName={"Заполнить остальные реквизиты по ИНН"}
                  type={"Blank"}
                  onClick={fillInnData}
                />
              </>
            ) : (
              <>
                <div>
                  <CloseInnIcon />
                </div>
                <span className={"message-error"}>
                  {"Введен некорректный ИНН"}
                </span>
              </>
            )}
          </div>
          <div className={"info-container"}>
            <div className={"info-row"}>
              <section>
                <CustomInput
                  title={"Название организации"}
                  disabled={!isInnOk || innNotFound}
                  value={organizationName}
                  onChange={setOrganizationName}
                  errState={organizationNameError}
                />
                <CustomInput
                  title={"КПП"}
                  disabled={!isInnOk || innNotFound}
                  value={kpp}
                  onChange={setKpp}
                  errState={kppError}
                />
                <CustomInput
                  title={"ОГРН"}
                  disabled={!isInnOk || innNotFound}
                  value={ogrn}
                  onChange={setOgrn}
                  errState={ogrnError}
                />
                <CustomInput
                  title={"Юридический адрес"}
                  disabled={!isInnOk || innNotFound}
                  value={documentAddress}
                  onChange={setDocumentAddress}
                  errState={documentAddressError}
                />
                <CustomInput
                  title={"Фактический адрес"}
                  disabled={!isInnOk || innNotFound}
                  value={physicalAddress}
                  onChange={setPhysicalAddress}
                  errState={physicalAddressError}
                />
                <CustomInput
                  title={"ФИО генерального директора"}
                  disabled={!isInnOk || innNotFound}
                  value={gmName}
                  onChange={setGmName}
                  errState={gmNameError}
                />
              </section>
            </div>
            <div className={"info-row"}>
              <section>
                <CustomInput
                  title={"ФИО бухгалтера"}
                  disabled={!isInnOk || innNotFound}
                  value={accountantName}
                  onChange={setAccountantName}
                  errState={accountantNameError}
                />
                <CustomInput
                  title={"Телефон компании"}
                  disabled={!isInnOk || innNotFound}
                  value={companyPhone}
                  onChange={setCompanyPhone}
                  errState={companyPhoneError}
                />
                <CustomInput
                  title={"№ расчетного счета"}
                  disabled={!isInnOk || innNotFound}
                  value={currentAccount}
                  onChange={setCurrentAccount}
                  errState={currentAccountError}
                />
                <CustomInput
                  title={"БИК"}
                  disabled={!isInnOk || innNotFound}
                  value={bik}
                  onChange={setBik}
                  errState={bikError}
                />
                <CustomInput
                  title={"Наименование банка"}
                  disabled={!isInnOk || innNotFound}
                  value={bankName}
                  onChange={setBankName}
                  errState={bankNameError}
                />
                <CustomInput
                  title={"Корреспондентский счет"}
                  disabled={!isInnOk || innNotFound}
                  value={correspondingAccount}
                  onChange={setCorrespondingAccount}
                  errState={correspondingAccountError}
                />
              </section>
            </div>
          </div>
        </div>
      </section>
      <section className={"save-wrapper"}>
        <CustomButton
          buttonName={"Сохранить"}
          active={dataOk}
          onClick={saveData}
        />
      </section>
    </Modal>
  );
};

export default LegalEntityModal;
