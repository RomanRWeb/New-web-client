'use client'
import SearchBar from "@/common/components/SearchBar/SearchBar";
import {useCallback, useEffect, useMemo, useState} from "react";
import DropdownBar from "@/common/components/DropdownBar/DropdownBar";
import {CustomButton} from "@/common/components/CustomButton/CustomButton";
import {ClientType, ColumnsHeader, DropdownProps} from "@/common/types/types";
import "../../../common/styles/pages/home/clients.scss"
import CustomTable from "@/common/components/CustomTable/CustomTable";
import {redirect} from "next/navigation";
import {AppDispatch} from "@/store/store";
import {useDispatch} from "react-redux";
import {setCurrentClient} from "@/store/slices/uiSlice";

type SubscribeItem =
    ""
    | "-"
    | "Триал активен"
    | "Триал закончился"
    | "Триал деактивирован"
    | "Платная активна"
    | "Платная закончилась"
type SellStateItem =
    ""
    | "-"
    | "В ожидании"
    | "Отказ после триала"
    | "Отказ от подписки"
    | "Договор на переподписание"
    | "Договор подписан"
    | "Договор не подписан"

export default function ClientsPage() {

    const subscribeItems: DropdownProps[] = useMemo(()=>([
        {text: ""},
        {text: "-"},
        {text: "Триал активен"},
        {text: "Триал закончился"},
        {text: "Триал деактивирован"},
        {text: "Платная активна"},
        {text: "Платная закончилась"}]), [])

    const sellStateItems: DropdownProps[] = useMemo(()=>([
        {text: ""},
        {text: "-"},
        {text: "В ожидании"},
        {text: "Отказ после триала"},
        {text: "Отказ от подписки"},
        {text: "Договор на переподписание"},
        {text: "Договор подписан"},
        {text: "Договор не подписан"}]), [])

    const clientsData: ClientType[] = useMemo(() => (
        [
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
                sellState: 'Ожидание до 21.08.2024',
                subscribeDate: 'Окончилась 20.02.2023',
                balance: '100000',
                tariff: '10000'
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
                sellState: 'Ожидание до 21.08.2024',
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
        ] as ClientType[]
    ), [])

    const columnsData: ColumnsHeader[] = useMemo(() => (
        [
            {name: 'id', text: 'ID'},
            {name: 'name', text: 'НАЗВАНИЕ'},
            {name: 'usersCount', text: 'ПОЛЬЗОВАТЕЛИ'},
            {name: 'registerDate', text: 'ЗАРЕГЕСТРИРОВАН'},
            {
                name: 'subscribeState', text: 'ПОДПИСКА', colored: true, colorTable: [
                    {value: "Триал активен", color: '#219653'},
                    {value: "Триал закончился", color: '#FF9500'},
                    {value: "Триал деактивирован", color: '#EB5757'},
                    {value: "Платная активна", color: '#219653'},
                    {value: "Платная закончилась", color: '#EB5757'}]
            },
            {
                name: 'sellState', text: 'СТАТУС ПРОДАЖИ', colored: true, colorTable: [
                    {value: "Ожидание до", color: '#FF9500'},
                    {value: "Отказ после триала", color: '#EB5757'},
                    {value: "Отказ от подписки", color: '#EB5757'},
                    {value: "Договор на переподписание", color: '#FF9500'},
                    {value: "Договор не подписан", color: '#FF9500'},
                    {value: "Договор подписан", color: '#219653'}]
            },
            {name: 'subscribeDate', text: 'ДАТА ПОДПИСКИ'},
            {name: 'balance', text: 'БАЛАНС, РУБ'},
            {name: 'tariff', text: 'ТАРИФ, РУБ/МЕС'}
        ] as ColumnsHeader[]
    ), [])

    const dispatch: AppDispatch = useDispatch();

    const [searchValue, setSearchValue] = useState<string>("");
    const [subscribeFilter, setSubscribeFilter] = useState<SubscribeItem>("");
    const [sellStateFilter, setSellStateFilter] = useState<SellStateItem>("");
    const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);
    const [clients, setClients] = useState<ClientType[]>(clientsData);


    const handleClearFilters = useCallback(() => {
        setSearchValue("")
        setSubscribeFilter("")
        setSellStateFilter("")
    }, [])

    useEffect(() => {
        dispatch(setCurrentClient(selectedClient))
        if (selectedClient !== null){
            redirect(`/home/clients/${selectedClient.id}`)
        }
    }, [dispatch, selectedClient]);

    useEffect(() => {
        if (subscribeFilter !== '' || sellStateFilter !==''){
            let newClientsData = clientsData;
            if (subscribeFilter !== ''){
                newClientsData = newClientsData.filter(el=> el.subscribeState === subscribeFilter)
            }
            if (sellStateFilter !== ''){
                const fixedFilter = sellStateFilter === "В ожидании" ? "Ожидание до": sellStateFilter
                newClientsData = newClientsData.filter(el=> el.sellState.replace(/\s\d{2}.\d{2}.\d{4}$/, '').trim() === fixedFilter
            )
            }
            setClients(newClientsData)
        } else setClients(clientsData)
    }, [subscribeFilter, sellStateFilter, clientsData]);

    return (
        <>
            <div className={"ClientsActionWrapper"}>
                <SearchBar value={searchValue} onChange={setSearchValue} title={"ПОИСК"}/>
                <DropdownBar title={"ПОДПИСКА"} onSelect={setSubscribeFilter} items={subscribeItems}
                             selectedValue={subscribeFilter}/>
                <DropdownBar title={"СТАТУС ПРОДАЖИ"} onSelect={setSellStateFilter} items={sellStateItems}
                             selectedValue={sellStateFilter}/>
                <CustomButton buttonName={"Очистить фильтр"} onClick={handleClearFilters} gray={true}
                              active={searchValue !== "" || subscribeFilter !== "" || sellStateFilter !== ""}/>
            </div>
            <div>
                <CustomTable onClickRow={setSelectedClient} name={"Клиенты"} data={clients}
                             columns={columnsData} defaultSortField={''}/>
            </div>
        </>
    )
}
