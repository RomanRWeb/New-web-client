export interface DropdownProps {
    text: string,
    color?: string;
    onClick?: () => void;
}

export interface NavListType {
    name: "Клиенты" | "Аналитика" | "Менеджеры" | "Тариф",
    path: string,
    icon: "clients" | "analytics",
}

export interface ClientType {
    id: string;
    name: string;
    usersCount: string;
    registerDate: string;
    subscribeState: "-" | "Триал активен" | "Триал закончился" | "Триал деактивирован" | "Платная активна" | "Платная закончилась";
    sellState: "-" | "В ожидании" | "Отказ после триала" | "Отказ от подписки" | "Договор на переподписание" | "Договор подписан" | "Договор не подписан";
    subscribeDate: string;
    balance: string;
    tariff: string;
}

export interface ManagerType {
    id: string;
    fullName: string;
    role: string;
    phone: string;
    password: string;
}

export const fakeManagers: ManagerType[] = [
    {id: '1', fullName: 'Менеджер 1', role: 'Менеджер клиентов', phone: '+7(999)999-99-99', password: '123'},
    {id: '2', fullName: 'Менеджер 2', role: 'Менеджер клиентов', phone: '+7(999)999-99-98', password: '1234'},
    {id: '3', fullName: 'Менеджер 3', role: 'Менеджер клиентов', phone: '+7(999)999-99-97', password: '12345'}]

export interface uiStateType {
    currentClient: ClientType | null;
    currentManager: ManagerType | null;
    isAdmin: boolean;
}

export interface Tariff {
    basicCost: string,
    managersCount: string,
    cloudStorageVolume: string,
    addingCostPerManager: string,
    addingCostPerStorage: string,
}

export const initialState: uiStateType = {
    currentClient: null,
    currentManager: null,
    isAdmin: true  //set false in prod
};

export type ClientsKeys = 'activeClients'|'nonActiveClients'|'trialEnded'|'trialActive'|'allClients'|'allNonActiveClients'
export type IncomeKeys = 'baseTariffIncomeMonthly'|'extendedTariffIncomeMonthly'|'baseTariffIncomeAllTime'|'extendedTariffIncomeAllTime'
export type TrialsKeys = 'subscribed'|'dontSubscribed'|'trialEnded'|'trialActive' | 'trialDeactivated'
export type SubscribersKeys = 'subscribeActive'|'subscribeStopped'|'subscribeRejected'
export type Keys = ClientsKeys | SubscribersKeys | IncomeKeys | TrialsKeys;

export interface ChartField{
    fieldName: string,
    icon: React.ReactNode,
    color: string,
    value: number,
    paramName: Keys,
    additionValue?: number,
    additionText?: string,
    additionParamName?: string
}

export interface TableProps<T> {
    name: string;
    defaultSortField?: string;
    columns: ColumnsHeader[];
    data: T[];
    onClickRow: (row: T) => void;
}

export interface ChartCards {
    fields: ChartField[];
}

interface ColorString {
    value: string;
    color: string;
}

export interface ColumnsHeader {
    text: string
    name: string;
    colored: boolean;
    colorTable?: ColorString[];
}

export const NavListHomeAdmin: NavListType[] = [
    {name: "Клиенты", path: "/clients", icon: 'clients'},
    {name: "Аналитика", path: "/analytics", icon: 'analytics'},
    {name: "Менеджеры", path: "/managers", icon: 'clients'},
    {name: "Тариф", path: "/tariff", icon: 'analytics'}
]

export const NavListHomeManager: NavListType[] = [
    {name: "Клиенты", path: "/clients", icon: 'clients'},
    {name: "Аналитика", path: "/analytics", icon: 'analytics'},
]
