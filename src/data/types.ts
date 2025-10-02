export type Params = Promise<{ id: string }>;
export type ParamsToken = Promise<{ token: string }>;

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

export interface ColorString {
  value: string;
  color: string;
}

export interface ColumnsHeader {
  text: string;
  name: string;
  colored: boolean;
  colorTable?: ColorString[];
}

export interface ChangeListItem {
  date: string;
  user: string;
  action: string;
  commentary: string;
}
