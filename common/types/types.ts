export interface DropdownProps {
  text: string;
  color?: string;
  onClick?: () => void;
}

export interface NavListType {
  name: "Клиенты" | "Аналитика" | "Менеджеры" | "Тариф";
  path: string;
  icon: "clients" | "analytics";
}

export interface ClientType {
  id: string;
  name?: string;
  usersCount?: string;
  registerDate?: string;
  subscribeState?: SubscribeItem;
  sellState: SellStateItem | string;
  sellWaitData?: string;
  subscribeDate?: string;
  balance?: string;
  tariff?: string;
  cloudStorageLimit?: string;
  cloudStorageUsage?: string;
  requestPerDay?: string;
  type?: "individual" | "legal entity" | "trial";
  ownerName?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  adminName?: string;
  adminEmail?: string;
  adminPhone?: string;
  inn?: string;
  organizationName?: string;
  kpp?: string;
  ogrn?: string;
  documentAddress?: string;
  physicalAddress?: string;
  gmName?: string;
  accountantName?: string;
  companyPhone?: string;
  currentAccount?: string;
  bik?: string;
  bankName?: string;
  correspondingAccount?: string;
}

export type SubscribeItem =
  | "-"
  | "Триал активен"
  | "Триал закончился"
  | "Триал деактивирован"
  | "Платная активна"
  | "Платная закончилась";

export type SellStateItem =
  | "-"
  | "В ожидании"
  | "Отказ после триала"
  | "Отказ от подписки"
  | "Договор на переподписание"
  | "Договор подписан"
  | "Договор не подписан";

export interface ManagerType {
  id: string;
  fullName: string;
  role: string;
  phone: string;
  password: string;
}

export const fakeManagers: ManagerType[] = [
  {
    id: "1",
    fullName: "Менеджер 1",
    role: "Менеджер клиентов",
    phone: "+7(999)999-99-99",
    password: "123",
  },
  {
    id: "2",
    fullName: "Менеджер 2",
    role: "Менеджер клиентов",
    phone: "+7(999)999-99-98",
    password: "1234",
  },
  {
    id: "3",
    fullName: "Менеджер 3",
    role: "Менеджер клиентов",
    phone: "+7(999)999-99-97",
    password: "12345",
  },
];

export interface uiStateType {
  currentClient: ClientType | null;
  currentManager: ManagerType | null;
  isAdmin: boolean;
}

export interface Tariff {
  basicCost: string;
  managersCount: string;
  cloudStorageVolume: string;
  addingCostPerManager: string;
  addingCostPerStorage: string;
}

export const initialState: uiStateType = {
  currentClient: null,
  currentManager: null,
  isAdmin: true, //set false in prod
};

export type ClientsKeys =
  | "activeClients"
  | "nonActiveClients"
  | "trialEnded"
  | "trialActive"
  | "allClients"
  | "allNonActiveClients";
export type IncomeKeys =
  | "baseTariffIncomeMonthly"
  | "extendedTariffIncomeMonthly"
  | "baseTariffIncomeAllTime"
  | "extendedTariffIncomeAllTime";
export type TrialsKeys =
  | "subscribed"
  | "dontSubscribed"
  | "trialEnded"
  | "trialActive"
  | "trialDeactivated";
export type SubscribersKeys =
  | "subscribeActive"
  | "subscribeStopped"
  | "subscribeRejected";
export type Keys = ClientsKeys | SubscribersKeys | IncomeKeys | TrialsKeys;

export interface ChartField {
  fieldName: string;
  icon: React.ReactNode;
  color: string;
  value: number;
  paramName: Keys;
  additionValue?: number;
  additionText?: string;
  additionParamName?: string;
}

export interface TableProps<T> {
  name?: string;
  defaultSortField?: string;
  columns: ColumnsHeader[];
  data: T[];
  onClickRow?: (row: T) => void;
}

export interface ChartCards {
  fields: ChartField[];
}

interface ColorString {
  value: string;
  color: string;
}

export interface ColumnsHeader {
  text: string;
  name: string;
  colored: boolean;
  colorTable?: ColorString[];
}

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

export const Clients: ClientType[] = [
  {
    id: "112-547",
    name: "Test.admin@gmail.com",
    usersCount: "23000",
    registerDate: "20.06.2023 20:00",
    subscribeState: "Триал активен",
    sellState: "-",
    subscribeDate: "Действует до 20.02.2023",
    balance: "-",
    tariff: "-",
    cloudStorageLimit: "15",
    cloudStorageUsage: "13",
    requestPerDay: "2875",
    type: "trial",
  },
  {
    id: "568-545",
    name: "Иванов И.И.",
    usersCount: "10000",
    registerDate: "20.06.2023 20:00",
    subscribeState: "Триал закончился",
    sellState: "В ожидании",
    sellWaitData: "21.08.2024",
    subscribeDate: "Окончилась 20.02.2023",
    balance: "100000",
    tariff: "10000",
    cloudStorageLimit: "15",
    cloudStorageUsage: "13",
    requestPerDay: "2875",
    type: "individual",
    ownerName: "Иванов Иван Иванович",
    ownerPhone: "+7(999)999-99-99",
    ownerEmail: "test@gmail.com",
  },
  {
    id: "985-662",
    name: "Лукойл-1234",
    usersCount: "120000",
    registerDate: "20.06.2023 20:00",
    subscribeState: "Платная активна",
    sellState: "-",
    subscribeDate: "Действует до 20.02.2023",
    balance: "500000",
    tariff: "1000",
    cloudStorageLimit: "15",
    cloudStorageUsage: "13",
    requestPerDay: "2875",
    type: "legal entity",
    ownerName: "Иванов Иван Иванович",
    ownerPhone: "+7(999)999-99-99",
    ownerEmail: "test@gmail.com",
    adminName: "Иванов Иван Иванович",
    adminEmail: "test@gmail.com",
    adminPhone: "+7(999)999-99-99",
    inn: "1234567890",
  },
  {
    id: "445-585",
    name: "Смирнов А.А.",
    usersCount: "150000",
    registerDate: "20.06.2023 20:00",
    subscribeState: "Платная закончилась",
    sellState: "Отказ от подписки",
    subscribeDate: "Окончилась 20.02.2023",
    balance: "250000",
    tariff: "2000",
  },
  {
    id: "545-845",
    name: "Иванов А.И.",
    usersCount: "1000",
    registerDate: "20.06.2023 20:00",
    subscribeState: "Триал закончился",
    sellState: "Отказ от подписки",
    subscribeDate: "Окончилась 20.02.2023",
    balance: "25000",
    tariff: "4000",
  },
  {
    id: "457-126",
    name: "Иванов П.А.",
    usersCount: "1000",
    registerDate: "20.06.2023 20:00",
    subscribeState: "-",
    sellState: "В ожидании",
    sellWaitData: "21.08.2024",
    subscribeDate: "-",
    balance: "25000",
    tariff: "",
  },
  {
    id: "645-874",
    name: "Смирнов П.А.",
    usersCount: "10000",
    registerDate: "20.06.2023 20:00",
    subscribeState: "-",
    sellState: "Договор подписан",
    subscribeDate: "-",
    balance: "",
    tariff: "",
  },
];

export interface ChangeListItem {
  date: string;
  user: string;
  action: string;
  commentary: string;
}

export const changeListColumns: ColumnsHeader[] = [
  { text: "ДАТА И ВРЕМЯ", name: "date", colored: false },
  { text: "ПОЛЬЗОВАТЕЛЬ", name: "user", colored: false },
  { text: "СОБЫТИЕ", name: "action", colored: false },
  { text: "КОММЕНТАРИЙ", name: "commentary", colored: false },
];

export const changeListData: ChangeListItem[] = [
  {
    date: "20.05.2024 20:22",
    user: "-",
    action: "Администратор зарегистрирован",
    commentary: "",
  },
  {
    date: "20.05.2024 20:23",
    user: "-",
    action: "Триал активен",
    commentary: "",
  },
  {
    date: "20.05.2024 20:24",
    user: "-",
    action: "Триал закончился",
    commentary: "",
  },
  {
    date: "20.05.2024 20:25",
    user: "Менеджер 2",
    action: "Статус продаж: ожидание до 02.03.24",
    commentary: "Клиент думает об оформлении подписки. Перезвонить.",
  },
  {
    date: "20.05.2024 20:26",
    user: "Менеджер 2",
    action: "Статус продаж: ожидание до 02.04.24",
    commentary: "Клиент не решил. Перезвонить",
  },
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
