'use client'
import SearchBar from "@/common/components/SearchBar/SearchBar";
import {useCallback, useEffect, useMemo, useState} from "react";
import DropdownBar from "@/common/components/DropdownBar/DropdownBar";
import {CustomButton} from "@/common/components/CustomButton/CustomButton";
import {Clients, ClientType, ColumnsHeader, DropdownProps} from "@/common/types/types";
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
    const [clients, setClients] = useState<ClientType[]>(Clients);


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
        let newClientsData = Clients.map((el) => {
            if (el.sellWaitData && el.sellState === 'В ожидании'){
                return {...el, sellState: `Ожидание до ${el.sellWaitData}`};
            } else return el;
        });
        if (subscribeFilter !== '' || sellStateFilter !==''){
            if (subscribeFilter !== ''){
                newClientsData = newClientsData.filter(el=> el.subscribeState === subscribeFilter)
            }
            if (sellStateFilter !== ''){
                newClientsData = newClientsData.filter(el=> el.sellState === sellStateFilter
            )
            }
        }
        setClients(newClientsData)
    }, [subscribeFilter, sellStateFilter]);

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
