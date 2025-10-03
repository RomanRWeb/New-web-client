"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { redirect } from "next/navigation";
import { ClientType, SellStateItem } from "@app/data/types";
import {
  changeListColumns,
  sellStateItemsColored,
  subscribeItemsColored,
} from "@app/data/constants";
import { CustomButton } from "@app/common/components/custom-button/CustomButton";
import Card from "@app/common/components/сard/Card";
import { CustomInput } from "@app/common/components/custom-input/CustomInput";
import { HelpIcon } from "@app/common/icons/help";
import DropdownBar from "@app/common/components/dropdown-bar/DropdownBar";
import CustomTable from "@app/common/components/custom-table/CustomTable";
import { changeListData, clients } from "@app/data/mocks";
import Modal from "@app/common/components/modal/Modal";
import LegalEntityModal from "@app/modules/home/components/legal-entity-modal";
import "@app/common/styles/pages/home/client.scss";

interface ClientProps {
  clientId: string;
}

const Client: React.FC<ClientProps> = ({ clientId }) => {
  const [currentClient, setCurrentClient] = useState<ClientType | undefined>(
    clients.find((client) => client.id === clientId),
  );

  useEffect(() => {
    if (currentClient === undefined) {
      redirect("/home/clients");
    }
  }, [currentClient]);

  useEffect(() => {
    if (currentClient?.sellState === "В ожидании") {
      setSellState("Ожидание до");
    }
  }, [currentClient?.sellState]);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [showEntityModal, setShowEntityModal] = useState<boolean>(false);
  const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
  const [commentary, setCommentary] = useState<string>();
  const [sellState, setSellState] = useState<SellStateItem | string>(
    currentClient?.sellState || "-",
  );
  const [newSubscribeDate, setNewSubscribeDate] = useState<string>(
    currentClient?.subscribeDate?.substring(
      currentClient?.subscribeDate?.length - 10,
    ) || "",
  );
  const [sellDate, setSellDate] = useState<string>(
    currentClient?.sellWaitData || "",
  );
  const [phone, setPhone] = useState<string>(currentClient?.ownerPhone || "");
  const [email, setEmail] = useState<string>(currentClient?.ownerEmail || "");
  const [id, setID] = useState<string>(currentClient?.id || "");
  const [fullName, setFullName] = useState<string>(
    currentClient?.ownerName || "",
  );

  const CommentaryField = useMemo(() => {
    return (
      <textarea
        placeholder={"Введите комментарий..."}
        rows={8}
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          resize: "none",
        }}
        onChange={(e) => setCommentary(e.target.value)}
        value={commentary}
      />
    );
  }, [commentary]);

  const barWidth = useMemo(() => {
    if (currentClient?.cloudStorageUsage && currentClient?.cloudStorageLimit) {
      return (
        (Number(currentClient?.cloudStorageUsage) /
          Number(currentClient?.cloudStorageLimit)) *
        100
      );
    } else return 0;
  }, [currentClient?.cloudStorageLimit, currentClient?.cloudStorageUsage]);

  const subscribeColor: string = useMemo(() => {
    return (
      subscribeItemsColored.find(
        (el) => el.text === currentClient?.subscribeState,
      )?.color || "inherit"
    );
  }, [currentClient?.subscribeState]);

  const handleDeleteClient = useCallback(() => {}, []);

  const handleEndTrial = useCallback(() => {
    setCurrentClient({
      ...currentClient,
      subscribeState: "Триал деактивирован",
    } as ClientType);
  }, [currentClient]);

  const handleChangeSubscribeDate = useCallback(() => {
    setCurrentClient({
      ...currentClient,
      subscribeDate: `Действует до ${newSubscribeDate}`,
    } as ClientType);
  }, [currentClient, newSubscribeDate]);

  const separateNumber = useCallback((str: string | undefined) => {
    if (str && /^\d+$/.test(str)) {
      return parseFloat(str).toLocaleString();
    } else if (!str) return "-";
    else return str;
  }, []);

  const handleSaveChanges = useCallback(() => {}, []);

  const handleSaveClient = useCallback(() => {}, []);

  return (
    <div className={"client-wrapper"}>
      <div className={"client-action-wrapper"}>
        <CustomButton
          buttonName={"Удалить клиента"}
          onClick={() => setShowDeleteModal(true)}
          type={"Blank"}
        />
      </div>
      <div className={"client-info-wrapper"}>
        <Card>
          <h1>{"Общая информация"}</h1>
          <div className={"info-field"}>
            <span>{"Баланс:"}</span>
            <b>{` ${separateNumber(currentClient?.balance)} руб.`}</b>
          </div>
          <div className={"info-field"}>
            <span>{"Тариф:"}</span>
            <b>{` ${separateNumber(currentClient?.tariff)} руб/мес`}</b>
          </div>
          <div className={"info-field"}>
            <span>{"Подключено пользователей:"}</span>
            <b>{` ${separateNumber(currentClient?.usersCount)} руб.`}</b>
          </div>
          <div className={"info-field"}>
            <span>{"Дата регистрации:"}</span>
            <b>{currentClient?.registerDate?.substring(0, 10) || "-"}</b>
          </div>
        </Card>
        <Card>
          <h1>{"Потребление ресурсов (общее облако)"}</h1>
          <div className={"info-field"}>
            <span>{"Файловое хранилище:"}</span>
            <b>{` ${currentClient?.cloudStorageUsage || "-"} ГБ из ${currentClient?.cloudStorageLimit || "-"} ГБ`}</b>
            <div className={"storage-usage-bar"}>
              <div
                className={"storage-usage-progress"}
                style={{ width: `${barWidth}%` }}
              />
            </div>
          </div>
          <div className={"info-field"}>
            <span>{"Нагрузка:"}</span>
            <b>{` ${separateNumber(currentClient?.requestPerDay)} запросов / сутки`}</b>
          </div>
        </Card>
        <Card>
          <h1>{"Подписка"}</h1>
          <CustomInput
            value={currentClient?.subscribeState || ""}
            title={"Статус подписки"}
            style={{ color: subscribeColor }}
          />
          {currentClient?.subscribeState === "Триал активен" ? (
            <div className={"button-wrapper"}>
              <CustomButton
                buttonName={"Прекратить триал"}
                onClick={handleEndTrial}
              />
            </div>
          ) : null}
          <CustomInput
            value={newSubscribeDate}
            title={"Действует до"}
            onChange={setNewSubscribeDate}
          />
          <div className={"button-wrapper"}>
            <CustomButton
              onClick={handleChangeSubscribeDate}
              buttonName={"Расширить срок действия"}
            />
            <span
              className={"icon-wrapper"}
              onClick={() => setShowHelpModal(true)}
            >
              <HelpIcon />
            </span>
          </div>
          <DropdownBar
            title={"Статус продажи"}
            items={sellStateItemsColored}
            selectedValue={sellState}
            onSelect={setSellState}
            onSelectFunk={() => setShowCommentModal(true)}
          />
          {sellState === "Ожидание до" ? (
            <CustomInput
              value={sellDate}
              onChange={setSellDate}
              title={"Дата"}
            />
          ) : null}
        </Card>
        <Card>
          <h1>{"Реквизиты"}</h1>
          {currentClient?.type !== "trial" ? (
            <div className={"radio-input-wrapper"}>
              <input type={"radio"} defaultChecked={true} />
              <span>
                {currentClient?.type === "individual"
                  ? "Физическое лицо"
                  : "Юридическое лицо"}
              </span>
            </div>
          ) : null}
          <CustomInput value={fullName} onChange={setFullName} title={"ФИО"} />
          <CustomInput value={phone} onChange={setPhone} title={"Телефон"} />
          <CustomInput value={email} onChange={setEmail} title={"Email"} />
          <CustomInput value={id} onChange={setID} title={"ID клиента"} />
          <div>
            <CustomButton
              buttonName={"Сохранить"}
              onClick={() => setShowSaveModal(true)}
            />
          </div>
          {currentClient?.type === "legal entity" ? (
            <div>
              <CustomButton
                buttonName={"Подробнее"}
                onClick={() => setShowEntityModal(true)}
                type={"Blank"}
              />
            </div>
          ) : null}
        </Card>
        <Card>
          <h1>{"История изменений"}</h1>
          <CustomTable columns={changeListColumns} data={changeListData} />
        </Card>
      </div>
      <Modal
        title={"Вы уверены что хотите удалить клиента?"}
        isVisible={showDeleteModal}
        onCloseFunk={() => setShowDeleteModal(false)}
        actions={
          <CustomButton buttonName={"Удалить"} onClick={handleDeleteClient} />
        }
      />
      <Modal
        title={"Вы уверены что хотите сохранить изменения?"}
        isVisible={showSaveModal}
        onCloseFunk={() => setShowSaveModal(false)}
        actions={
          <CustomButton buttonName={"Сохранить"} onClick={handleSaveClient} />
        }
      />
      <Modal
        title={"Информация"}
        isVisible={showHelpModal}
        onCloseFunk={() => setShowHelpModal(false)}
        content={
          "В случае, если у клиента проблемы с пополнением баланса,\n" +
          "вы можете вручную продлить ему подписку как услугу обещанного\n" +
          "платежа. Вы выбираете дату, до которой подписка пользователя\n" +
          "будет активна несмотря на состояние баланса. При активации\n" +
          "услуги, баланс пользователя уменьшится и даже может уйти в\n" +
          "минус на сумму, требуемую для продления до указанного вами\n" +
          "срока. Когда срок, до которого вы продлите, подойдет, будет\n" +
          "осуществлена повторная попытка списания на очередной период.\n" +
          "Если баланс клиента в этот день окажется недостаточным, то\n" +
          "подписка клиента снова станет неактивной"
        }
      />
      <Modal
        title={"Комментарий"}
        isVisible={showCommentModal}
        onCloseFunk={() => {
          setShowCommentModal(false);
          setCommentary("");
        }}
        content={CommentaryField}
        actions={
          <CustomButton buttonName={"Сохранить"} onClick={handleSaveChanges} />
        }
      />
      <LegalEntityModal
        isVisible={showEntityModal}
        onClose={() => setShowEntityModal(false)}
        currentClient={currentClient}
      />
    </div>
  );
};

export default Client;
