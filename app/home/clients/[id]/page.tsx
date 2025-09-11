"use client";
import { CustomButton } from "@/common/components/CustomButton/CustomButton";
import { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "@/common/components/Modal/Modal";
import Card from "@/common/components/Card/Card";
import {
  changeListColumns,
  changeListData,
  ClientType,
  SellStateItem,
  sellStateItemsColored,
  subscribeItemsColored,
} from "@/common/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { redirect } from "next/navigation";
import "../../../../common/styles/pages/home/client.scss";
import { CustomInput } from "@/common/components/CustomInput/CustomInput";
import { HelpIcon } from "@/public/icons/help";
import DropdownBar from "@/common/components/DropdownBar/DropdownBar";
import CustomTable from "@/common/components/CustomTable/CustomTable";
import LegalEntityModal from "@/common/components/LegalEntityModal/LegalEntityModal";

export default function ClientPage() {
  const uiState = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    if (uiState.currentClient === null) {
      redirect("/home/clients");
    }
  }, [uiState.currentClient]);

  useEffect(() => {
    if (uiState.currentClient?.sellState === "В ожидании") {
      setSellState("Ожидание до");
    }
  }, [uiState.currentClient?.sellState]);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [showEntityModal, setShowEntityModal] = useState<boolean>(false);
  const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
  const [commentary, setCommentary] = useState<string>();
  const [sellState, setSellState] = useState<SellStateItem | string>(
    uiState.currentClient?.sellState || "-",
  );
  const [client, setClient] = useState<ClientType | null>(
    uiState.currentClient,
  );
  const [newSubscribeDate, setNewSubscribeDate] = useState<string>(
    client?.subscribeDate?.substring(client?.subscribeDate?.length - 10) || "",
  );
  const [sellDate, setSellDate] = useState<string>(
    uiState.currentClient?.sellWaitData || "",
  );
  const [phone, setPhone] = useState<string>(
    uiState.currentClient?.ownerPhone || "",
  );
  const [email, setEmail] = useState<string>(
    uiState.currentClient?.ownerEmail || "",
  );
  const [id, setID] = useState<string>(uiState.currentClient?.id || "");
  const [fullName, setFullName] = useState<string>(
    uiState.currentClient?.ownerName || "",
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
    if (client?.cloudStorageUsage && client?.cloudStorageLimit) {
      return (
        (Number(client?.cloudStorageUsage) /
          Number(client?.cloudStorageLimit)) *
        100
      );
    } else return 0;
  }, [client?.cloudStorageLimit, client?.cloudStorageUsage]);

  const subscribeColor: string = useMemo(() => {
    return (
      subscribeItemsColored.find((el) => el.text === client?.subscribeState)
        ?.color || "inherit"
    );
  }, [client?.subscribeState]);

  const handleDeleteClient = useCallback(() => {}, []);

  const handleEndTrial = useCallback(() => {
    setClient({
      ...client,
      subscribeState: "Триал деактивирован",
    } as ClientType);
  }, [client]);

  const handleChangeSubscribeDate = useCallback(() => {
    setClient({
      ...client,
      subscribeDate: `Действует до ${newSubscribeDate}`,
    } as ClientType);
  }, [client, newSubscribeDate]);

  const handleSaveChanges = useCallback(() => {}, []);

  const handleSaveClient = useCallback(() => {}, []);

  return (
    <div className={"ClientWrapper"}>
      <div className={"ClientActionWrapper"}>
        <CustomButton
          buttonName={"Удалить клиента"}
          onClick={() => setShowDeleteModal(true)}
          type={"Blank"}
        />
      </div>
      <div className={"ClientInfoWrapper"}>
        <Card>
          <h1>{"Общая информация"}</h1>
          <div className={"InfoField"}>
            <span>{"Баланс:"}</span>
            <b>{` ${client?.balance} руб.`}</b>
          </div>
          <div className={"InfoField"}>
            <span>{"Тариф:"}</span>
            <b>{` ${client?.tariff} руб/мес`}</b>
          </div>
          <div className={"InfoField"}>
            <span>{"Подключено пользователей:"}</span>
            <b>{` ${client?.usersCount} руб.`}</b>
          </div>
          <div className={"InfoField"}>
            <span>{"Дата регистрации:"}</span>
            <b>{` ${client?.registerDate} руб.`}</b>
          </div>
        </Card>
        <Card>
          <h1>{"Потребление ресурсов (общее облако)"}</h1>
          <div className={"InfoField"}>
            <span>{"Файловое хранилище:"}</span>
            <b>{` ${client?.cloudStorageUsage || "-"} ГБ из ${client?.cloudStorageLimit || "-"} ГБ`}</b>
            <div className={"StorageUsageBar"}>
              <div
                className={"StorageUsageProgress"}
                style={{ width: `${barWidth}%` }}
              />
            </div>
          </div>
          <div className={"InfoField"}>
            <span>{"Нагрузка:"}</span>
            <b>{` ${client?.requestPerDay || "-"} запросов / сутки`}</b>
          </div>
        </Card>
        <Card>
          <h1>{"Подписка"}</h1>
          <CustomInput
            value={client?.subscribeState || ""}
            title={"Статус подписки"}
            style={{ color: subscribeColor }}
          />
          {client?.subscribeState === "Триал активен" ? (
            <div className={"ButtonWrapper"}>
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
          <div className={"ButtonWrapper"}>
            <CustomButton
              onClick={handleChangeSubscribeDate}
              buttonName={"Расширить срок действия"}
            />
            <span
              className={"IconWrapper"}
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
          {uiState.currentClient?.type !== "trial" ? (
            <div className={"input-wrapper"}>
              <input type={"radio"} defaultChecked={true} />
              <span>
                {uiState.currentClient?.type === "individual"
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
          {uiState.currentClient?.type === "legal entity" ? (
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
          <h1>{"Список изменений"}</h1>
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
      />
    </div>
  );
}
