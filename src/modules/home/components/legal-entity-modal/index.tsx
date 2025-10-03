"use client";
import "../../../../common/styles/common/LegalEntityModal.scss";
import Modal from "@app/common/components/modal/Modal";
import { ChevronLeftIcon } from "@app/common/icons/chevron-left";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  CustomInput,
  CustomInputPhone,
} from "@app/common/components/custom-input/CustomInput";
import { CustomButton } from "@app/common/components/custom-button/CustomButton";
import { CloseInnIcon } from "@app/common/icons/close-inn";
import { SuccessInnIcon } from "@app/common/icons/success-inn";
import { ClientType } from "@app/data/types";

interface ModalProps {
  currentClient: ClientType | undefined;
  isVisible: boolean;
  onClose: () => void;
}

const LegalEntityModal = ({
  isVisible,
  onClose,
  currentClient,
}: ModalProps) => {
  const [client, setClient] = useState<ClientType | undefined>(currentClient);
  const onlyDigitsRegex = useMemo(() => /^\d+$/, []);
  const fullNameRegex = useMemo(
    () => /^[а-яА-ЯёЁ]{2,}\s[а-яА-ЯёЁ]{2,}(\s[а-яА-ЯёЁ]{2,})?$/u,
    [],
  );
  const digitRegex = useMemo(() => /^.{2,}$/, []);
  const emailRegex = useMemo(
    () =>
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
    [],
  );
  const innRegex = useMemo(() => /^\d{10}$/, []);
  const anythingRegex = useMemo(() => /^.{2,}$/, []);
  const kppRegex = useMemo(() => /^\d{9}$/, []);
  const ogrnRegex = useMemo(() => /^\d{13}$/, []);
  const currAccRegex = useMemo(() => /^\d{20}$/, []);
  const bikRegex = useMemo(() => /^\d{9}$/, []);
  const corrAccRegex = useMemo(() => /^\d{20}$/, []);

  const [inn, setInn] = useState<string>(client?.inn || "");
  const [innError, setInnError] = useState<boolean>(false);
  const [innNotFound, setInnNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (!innError) {
      if (Number(inn[inn.length - 1]) % 2 !== 0) {
        setInnNotFound(true);
      } else setInnNotFound(false);
    }
  }, [innError]);

  const [adminName, setAdminName] = useState<string>(client?.adminName || "");
  const [adminNameError, setAdminNameError] = useState<boolean>(false);

  const [adminEmail, setAdminEmail] = useState<string>(
    client?.adminEmail || "",
  );
  const [adminEmailError, setAdminEmailError] = useState<boolean>(false);

  const [adminPhone, setAdminPhone] = useState<string>(
    client?.adminPhone || "",
  );
  const [adminPhoneError, setAdminPhoneError] = useState<boolean>(false);

  const [ownerName, setOwnerName] = useState<string>(client?.name || "");
  const [ownerNameError, setOwnerNameError] = useState<boolean>(false);

  const [ownerEmail, setOwnerEmail] = useState<string>(
    client?.ownerEmail || "",
  );
  const [ownerEmailError, setOwnerEmailError] = useState<boolean>(false);

  const [ownerPhone, setOwnerPhone] = useState<string>(
    client?.ownerPhone || "",
  );
  const [ownerPhoneError, setOwnerPhoneError] = useState<boolean>(false);

  const [organizationName, setOrganizationName] = useState<string>(
    client?.organizationName || "",
  );
  const [organizationNameError, setOrganizationNameError] =
    useState<boolean>(false);

  const [kpp, setKpp] = useState<string>(client?.kpp || "");
  const [kppError, setKppError] = useState<boolean>(false);

  const [ogrn, setOgrn] = useState<string>(client?.ogrn || "");
  const [ogrnError, setOgrnError] = useState<boolean>(false);

  const [documentAddress, setDocumentAddress] = useState<string>(
    client?.documentAddress || "",
  );
  const [documentAddressError, setDocumentAddressError] =
    useState<boolean>(false);

  const [physicalAddress, setPhysicalAddress] = useState<string>(
    client?.physicalAddress || "",
  );
  const [physicalAddressError, setPhysicalAddressError] =
    useState<boolean>(false);

  const [gmName, setGmName] = useState<string>(client?.gmName || "");
  const [gmNameError, setGmNameError] = useState<boolean>(false);

  const [accountantName, setAccountantName] = useState<string>(
    client?.accountantName || "",
  );
  const [accountantNameError, setAccountantNameError] =
    useState<boolean>(false);

  const [companyPhone, setCompanyPhone] = useState<string>(
    client?.companyPhone || "",
  );
  const [companyPhoneError, setCompanyPhoneError] = useState<boolean>(false);

  const [currentAccount, setCurrentAccount] = useState<string>(
    client?.currentAccount || "",
  );
  const [currentAccountError, setCurrentAccountError] =
    useState<boolean>(false);

  const [bik, setBik] = useState<string>(client?.bik || "");
  const [bikError, setBikError] = useState<boolean>(false);

  const [bankName, setBankName] = useState<string>(client?.bankName || "");
  const [bankNameError, setBankNameError] = useState<boolean>(false);

  const [correspondingAccount, setCorrespondingAccount] = useState<string>(
    client?.correspondingAccount || "",
  );
  const [correspondingAccountError, setCorrespondingAccountError] =
    useState<boolean>(false);

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
      !innError &&
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
    innError,
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
        {dataOk && !innError && !innNotFound ? (
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
              regex={fullNameRegex}
              setError={setAdminNameError}
            />
            <CustomInputPhone
              value={adminPhone}
              title={"Телефон админа"}
              onChange={setAdminPhone}
              errState={adminPhoneError}
              setError={setAdminPhoneError}
            />
            <CustomInput
              value={adminEmail}
              title={"Email админа"}
              onChange={setAdminEmail}
              errState={adminEmailError}
              regex={emailRegex}
              setError={setAdminEmailError}
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
              regex={fullNameRegex}
              setError={setOwnerNameError}
            />
            <CustomInputPhone
              value={ownerPhone}
              title={"Телефон админа"}
              onChange={setOwnerPhone}
              errState={ownerPhoneError}
              setError={setOwnerPhoneError}
            />
            <CustomInput
              value={ownerEmail}
              title={"Email админа"}
              onChange={setOwnerEmail}
              errState={ownerEmailError}
              regex={emailRegex}
              setError={setOwnerEmailError}
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
              errState={innError}
              regex={innRegex}
              setError={setInnError}
            />
            {!innError && !innNotFound ? (
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
                  disabled={innError || innNotFound}
                  value={organizationName}
                  onChange={setOrganizationName}
                  errState={organizationNameError}
                  regex={anythingRegex}
                  setError={setOrganizationNameError}
                />
                <CustomInput
                  title={"КПП"}
                  disabled={innError || innNotFound}
                  value={kpp}
                  onChange={setKpp}
                  errState={kppError}
                  regex={kppRegex}
                  setError={setKppError}
                />
                <CustomInput
                  title={"ОГРН"}
                  disabled={innError || innNotFound}
                  value={ogrn}
                  onChange={setOgrn}
                  errState={ogrnError}
                  regex={ogrnRegex}
                  setError={setOgrnError}
                />
                <CustomInput
                  title={"Юридический адрес"}
                  disabled={innError || innNotFound}
                  value={documentAddress}
                  onChange={setDocumentAddress}
                  errState={documentAddressError}
                  regex={anythingRegex}
                  setError={setDocumentAddressError}
                />
                <CustomInput
                  title={"Фактический адрес"}
                  disabled={innError || innNotFound}
                  value={physicalAddress}
                  onChange={setPhysicalAddress}
                  errState={physicalAddressError}
                  regex={anythingRegex}
                  setError={setPhysicalAddressError}
                />
                <CustomInput
                  title={"ФИО генерального директора"}
                  disabled={innError || innNotFound}
                  value={gmName}
                  onChange={setGmName}
                  errState={gmNameError}
                  regex={fullNameRegex}
                  setError={setGmNameError}
                />
              </section>
            </div>
            <div className={"info-row"}>
              <section>
                <CustomInput
                  title={"ФИО бухгалтера"}
                  disabled={innError || innNotFound}
                  value={accountantName}
                  onChange={setAccountantName}
                  errState={accountantNameError}
                  regex={fullNameRegex}
                  setError={setAccountantNameError}
                />
                <CustomInputPhone
                  title={"Телефон компании"}
                  disabled={innError || innNotFound}
                  value={companyPhone}
                  onChange={setCompanyPhone}
                  errState={companyPhoneError}
                  setError={setCompanyPhoneError}
                />
                <CustomInput
                  title={"№ расчетного счета"}
                  disabled={innError || innNotFound}
                  value={currentAccount}
                  onChange={setCurrentAccount}
                  errState={currentAccountError}
                  regex={currAccRegex}
                  setError={setCurrentAccountError}
                />
                <CustomInput
                  title={"БИК"}
                  disabled={innError || innNotFound}
                  value={bik}
                  onChange={setBik}
                  errState={bikError}
                  regex={bikRegex}
                  setError={setBikError}
                />
                <CustomInput
                  title={"Наименование банка"}
                  disabled={innError || innNotFound}
                  value={bankName}
                  onChange={setBankName}
                  errState={bankNameError}
                  regex={anythingRegex}
                  setError={setBankNameError}
                />
                <CustomInput
                  title={"Корреспондентский счет"}
                  disabled={innError || innNotFound}
                  value={correspondingAccount}
                  onChange={setCorrespondingAccount}
                  errState={correspondingAccountError}
                  regex={corrAccRegex}
                  setError={setCorrespondingAccountError}
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
