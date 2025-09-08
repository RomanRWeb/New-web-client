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
    name?: string;
    usersCount?: string;
    registerDate?: string;
    subscribeState?: "-" | "Триал активен" | "Триал закончился" | "Триал деактивирован" | "Платная активна" | "Платная закончилась";
    sellState: "-" | "В ожидании" | "Отказ после триала" | "Отказ от подписки" | "Договор на переподписание" | "Договор подписан" | "Договор не подписан" | string;
    sellWaitData?: string;
    subscribeDate?: string;
    balance?: string;
    tariff?: string;
    cloudStorageLimit?: string;
    cloudStorageUsage?: string;
    requestPerDay?: string;
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

export const Clients: ClientType[] = [
    {
        id: '112-547',
        name: 'Test.admin@gmail.com',
        usersCount: '23000',
        registerDate: '20.06.2023 20:00',
        subscribeState: 'Триал активен',
        sellState: '-',
        subscribeDate: 'Действует до 20.02.2023',
        balance: '10000',
        tariff: '5000'
    },
    {
        id: '568-545',
        name: 'Иванов И.И.',
        usersCount: '10000',
        registerDate: '20.06.2023 20:00',
        subscribeState: 'Триал закончился',
        sellState: 'В ожидании',
        sellWaitData: '21.08.2024',
        subscribeDate: 'Окончилась 20.02.2023',
        balance: '100000',
        tariff: '10000',
        cloudStorageLimit: '15',
        cloudStorageUsage: '13',
        requestPerDay: '2875',
    },
    {
        id: '985-662',
        name: 'Лукойл-1234',
        usersCount: '120000',
        registerDate: '20.06.2023 20:00',
        subscribeState: 'Платная активна',
        sellState: '-',
        subscribeDate: 'Действует до 20.02.2023',
        balance: '500000',
        tariff: '1000'
    },
    {
        id: '445-585',
        name: 'Смирнов А.А.',
        usersCount: '150000',
        registerDate: '20.06.2023 20:00',
        subscribeState: 'Платная закончилась',
        sellState: 'Отказ от подписки',
        subscribeDate: 'Окончилась 20.02.2023',
        balance: '250000',
        tariff: '2000'
    },
    {
        id: '545-845',
        name: 'Иванов А.И.',
        usersCount: '1000',
        registerDate: '20.06.2023 20:00',
        subscribeState: 'Триал закончился',
        sellState: 'Отказ от подписки',
        subscribeDate: 'Окончилась 20.02.2023',
        balance: '25000',
        tariff: '4000'
    },
    {
        id: '457-126',
        name: 'Иванов П.А.',
        usersCount: '1000',
        registerDate: '20.06.2023 20:00',
        subscribeState: '-',
        sellState: 'В ожидании',
        sellWaitData: '21.08.2024',
        subscribeDate: '-',
        balance: '25000',
        tariff: ''
    },
    {
        id: '645-874',
        name: 'Смирнов П.А.',
        usersCount: '10000',
        registerDate: '20.06.2023 20:00',
        subscribeState: '-',
        sellState: 'Договор подписан',
        subscribeDate: '-',
        balance: '',
        tariff: ''
    }
]
