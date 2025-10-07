import {
  ClientCardProps,
  ColumnsHeader,
  DropdownProps,
  IncomeCardProps,
  NavListType,
  SubscribersCardProps,
  TrialCardProps,
  uiStateType,
} from "@app/data/types";

export const initialState: uiStateType = {
  isAdmin: true, //fixme
};

export const ClientTableHeaders: ColumnsHeader[] = [
  { name: "id", text: "ID", colored: false },
  { name: "name", text: "НАЗВАНИЕ", colored: false },
  { name: "usersCount", text: "ПОЛЬЗОВАТЕЛИ", colored: false, isNumber: true },
  { name: "registerDate", text: "ЗАРЕГЕСТРИРОВАН", colored: false },
  {
    name: "subscribeState",
    text: "ПОДПИСКА",
    colored: true,
    colorTable: [
      { value: "Триал активен", color: "#219653" },
      { value: "Триал закончился", color: "#FF9500" },
      { value: "Триал деактивирован", color: "#EB5757" },
      { value: "Платная активна", color: "#219653" },
      { value: "Платная закончилась", color: "#EB5757" },
    ],
  },
  {
    name: "sellState",
    text: "СТАТУС ПРОДАЖИ",
    colored: true,
    colorTable: [
      { value: "Ожидание до", color: "#FF9500" },
      { value: "Отказ после триала", color: "#EB5757" },
      { value: "Отказ от подписки", color: "#EB5757" },
      { value: "Договор на переподписание", color: "#FF9500" },
      { value: "Договор не подписан", color: "#FF9500" },
      { value: "Договор подписан", color: "#219653" },
    ],
  },
  { name: "subscribeDate", text: "ДАТА ПОДПИСКИ", colored: false },
  {
    name: "balance",
    text: "БАЛАНС, РУБ",
    colored: false,
    isBold: true,
    nonExistPlaceholder: "0",
    isNumber: true,
  },
  {
    name: "tariff",
    text: "ТАРИФ, РУБ/МЕС",
    colored: false,
    isBold: true,
    isNumber: true,
  },
];

export const NavListHomeAdmin: NavListType[] = [
  { name: "Клиенты", path: "/clients", icon: "clients" },
  { name: "Аналитика", path: "/analytics", icon: "analytics" },
  { name: "Менеджеры", path: "/managers", icon: "clients" },
  { name: "Тариф", path: "/tariff", icon: "analytics" },
];

export const NavListHomeManager: NavListType[] = [
  { name: "Клиенты", path: "/clients", icon: "clients" },
  { name: "Аналитика", path: "/analytics", icon: "analytics" },
];

export const changeListColumns: ColumnsHeader[] = [
  { text: "ДАТА И ВРЕМЯ", name: "date", colored: false },
  { text: "ПОЛЬЗОВАТЕЛЬ", name: "user", colored: false },
  { text: "СОБЫТИЕ", name: "action", colored: false },
  { text: "КОММЕНТАРИЙ", name: "commentary", colored: false },
];

export const subscribeItems: DropdownProps[] = [
  { text: "" },
  { text: "-" },
  { text: "Триал активен" },
  { text: "Триал закончился" },
  { text: "Триал деактивирован" },
  { text: "Платная активна" },
  { text: "Платная закончилась" },
];

export const subscribeItemsColored: DropdownProps[] = [
  { text: "-" },
  { text: "Триал активен", color: "#219653" },
  { text: "Триал закончился", color: "#FF9500" },
  { text: "Триал деактивирован", color: "#EB5757" },
  { text: "Платная активна", color: "#219653" },
  { text: "Платная закончилась", color: "#EB5757" },
];

export const sellStateItems: DropdownProps[] = [
  { text: "" },
  { text: "-" },
  { text: "В ожидании" },
  { text: "Отказ после триала" },
  { text: "Отказ от подписки" },
  { text: "Договор на переподписание" },
  { text: "Договор подписан" },
  { text: "Договор не подписан" },
];

export const sellStateItemsColored: DropdownProps[] = [
  { text: "-" },
  { text: "Ожидание до", color: "#FF9500" },
  { text: "Отказ после триала", color: "#EB5757" },
  { text: "Отказ от подписки", color: "#EB5757" },
  { text: "Договор на переподписание", color: "#FF9500" },
  { text: "Договор подписан", color: "#FF9500" },
  { text: "Договор не подписан", color: "#219653" },
];

export const ManagersTable: ColumnsHeader[] = [
  { name: "id", colored: false, text: "ID" },
  { name: "fullName", colored: false, text: "ФИО" },
  { name: "role", colored: false, text: "РОЛЬ" },
  { name: "phone", colored: false, text: "ТЕЛЕФОН" },
];

export const managerRoles: string[] = [
  "Менеджер клиентов",
  "Менеджер клиентов_2",
];

export const clientEmptyPlaceholder: ClientCardProps = {
  activeClients: 0,
  nonActiveClients: 0,
  trialActive: 0,
  trialEnded: 0,
  allClients: 0,
  allNonActiveClients: 0,
};

export const incomeEmptyPlaceholder: IncomeCardProps = {
  baseTariffIncomeAllTime: 0,
  baseTariffIncomeMonthly: 0,
  extendedTariffIncomeMonthly: 0,
  extendedTariffIncomeAllTime: 0,
};

export const trialEmptyPlaceholder: TrialCardProps = {
  subscribed: 0,
  dontSubscribed: 0,
  trialDeactivated: 0,
  trialEnded: 0,
  trialActive: 0,
};

export const subscribeEmptyPlaceholder: SubscribersCardProps = {
  subscribeActive: 0,
  subscribeStopped: 0,
  subscribeRejected: 0,
};

export const clientDataPlaceholder: ClientCardProps = {
  activeClients: 700,
  nonActiveClients: 200,
  trialActive: 300,
  trialEnded: 100,
  allClients: 5000,
  allNonActiveClients: 1000,
};

export const incomeDataPlaceholder: IncomeCardProps = {
  baseTariffIncomeAllTime: 700000,
  baseTariffIncomeMonthly: 300000,
  extendedTariffIncomeMonthly: 100000,
  extendedTariffIncomeAllTime: 300000,
};

export const trialDataPlaceholder: TrialCardProps = {
  subscribed: 4849,
  dontSubscribed: 1599,
  trialDeactivated: 1299,
  trialEnded: 1054,
  trialActive: 1199,
};

export const subscribeDataPlaceholder: SubscribersCardProps = {
  subscribeActive: 700,
  subscribeStopped: 200,
  subscribeRejected: 100,
};
