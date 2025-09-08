'use client'
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import React, {useCallback, useEffect, useState} from "react";
import {SuccessInvertIcon} from "@/public/icons/success-invert";
import {ChartCards, ClientsKeys, IncomeKeys, SubscribersKeys, TrialsKeys} from "@/common/types/types";
import {ErrorInvertIcon} from "@/public/icons/error-invert";
import {WarningInvertIcon} from "@/public/icons/warning-invert";
import "../../../common/styles/pages/home/analytics.scss"
import ChartCard from "@/common/components/ChartCard/ChartCard";

type ClientCardProps = Record<ClientsKeys, number>;
type IncomeCardProps = Record<IncomeKeys, number>;
type TrialCardProps = Record<TrialsKeys, number>;
type SubscribersCardProps = Record<SubscribersKeys, number>;

export default function AnalyticsPage() {

    const greenColor: string = "#92D36E";
    const redColor = "#FF5D55";
    const orangeColor = "#FFA833";
    const violetColor = "#BC51AD";
    const blackColor = "#444444";

    const clientChartCardPlaceholder: ChartCards = {
        fields: [{
            fieldName: "Активные",
            color: greenColor,
            icon: <SuccessInvertIcon/>,
            value: 0,
            additionValue: 0,
            additionText: "сотрудников",
            paramName: 'activeClients',
            additionParamName: 'allClients'
        }, {
            fieldName: "Не активные",
            color: redColor,
            icon: <ErrorInvertIcon/>,
            value: 0,
            additionValue: 0,
            additionText: "сотрудников",
            paramName: 'nonActiveClients',
            additionParamName: 'allNonActiveClients'
        }, {
            fieldName: "Триал закончился",
            color: orangeColor,
            icon: <WarningInvertIcon/>,
            value: 0,
            paramName: 'trialEnded'
        }, {
            fieldName: "Триал активен",
            color: violetColor,
            icon: <SuccessInvertIcon color={violetColor}/>,
            value: 0,
            paramName: 'trialActive'
        }]
    }

    const incomeChartCardMonthlyPlaceholder: ChartCards = {
        fields: [{
            fieldName: "Доход от базовой части подписок",
            color: greenColor,
            icon: <SuccessInvertIcon/>,
            value: 0,
            paramName: 'baseTariffIncomeMonthly'
        }, {
            fieldName: "Доход от доп. пользователей",
            color: violetColor,
            icon: <SuccessInvertIcon color={violetColor}/>,
            value: 0,
            paramName: 'extendedTariffIncomeMonthly'
        }]
    }

    const incomeChartCardAllPlaceholder: ChartCards = {
        fields: [{
            fieldName: "Доход от базовой части подписок",
            color: greenColor,
            icon: <SuccessInvertIcon/>,
            value: 0,
            paramName: 'baseTariffIncomeAllTime'
        }, {
            fieldName: "Доход от доп. пользователей",
            color: violetColor,
            icon: <SuccessInvertIcon color={violetColor}/>,
            value: 0,
            paramName: 'extendedTariffIncomeAllTime'
        }]
    }

    const trialChartCardPlaceholder: ChartCards = {
        fields: [{
            fieldName: "Оформляли подписку",
            color: greenColor,
            icon: <SuccessInvertIcon/>,
            value: 0,
            paramName: 'subscribed'
        }, {
            fieldName: "Отказ после триала",
            color: redColor,
            icon: <ErrorInvertIcon/>,
            value: 0,
            paramName: 'dontSubscribed'
        }, {
            fieldName: "Триал закончился",
            color: orangeColor,
            icon: <WarningInvertIcon/>,
            value: 0,
            paramName: 'trialEnded'
        }, {
            fieldName: "Триал активен",
            color: violetColor,
            icon: <SuccessInvertIcon color={violetColor}/>,
            value: 0,
            paramName: 'trialActive'
        }, {
            fieldName: "Триал деактивирован",
            color: blackColor,
            icon: <ErrorInvertIcon color={blackColor}/>,
            value: 0,
            paramName: 'trialDeactivated'
        }]
    }

    const subscribersChartCardPlaceholder: ChartCards = {
        fields: [{
            fieldName: "Подписка активна",
            color: greenColor,
            icon: <SuccessInvertIcon/>,
            value: 0,
            paramName: 'subscribeActive'
        }, {
            fieldName: "Подписка остановлена",
            color: orangeColor,
            icon: <WarningInvertIcon/>,
            value: 0,
            paramName: 'subscribeStopped'
        }, {
            fieldName: "Отказ от подписки",
            color: redColor,
            icon: <ErrorInvertIcon/>,
            value: 0,
            paramName: 'subscribeRejected'
        }]
    }

    const uiState = useSelector((state: RootState) => state.ui)

    const [clientChartData, setClientChartData] = useState<ChartCards>(clientChartCardPlaceholder)
    const [incomeMonthlyChartData, setIncomeMonthlyChartData] = useState<ChartCards>(incomeChartCardMonthlyPlaceholder)
    const [incomeAllChartData, setIncomeAllChartData] = useState<ChartCards>(incomeChartCardAllPlaceholder)
    const [trialChartData, setTrialChartData] = useState<ChartCards>(trialChartCardPlaceholder)
    const [subscribersChartData, setSubscribersChartData] = useState<ChartCards>(subscribersChartCardPlaceholder)

    const [month, setMonth] = useState<string>("Январь")

    const [isIncomeMonthly, setIsIncomeMonthly] = useState<boolean>(false)

    const isNumber = useCallback((value: any) => {
        return typeof value === 'number' && !isNaN(value);
    }, [])

    const mergeData = useCallback(({chartData, chartValues} : {chartData: ChartCards, chartValues: any})=>{

        const mergedChartData: ChartCards = {
            fields: chartData.fields.map(el => ({
                ...el,
                value: isNumber(chartValues[el.paramName]) ? chartValues[el.paramName] : 0,
                additionValue: el.additionParamName && isNumber(chartValues[el.additionParamName])? chartValues[el.additionParamName] : ''
            }))}

        return mergedChartData
    }, [isNumber])

    useEffect(() => {
        //for client chart: fetch data => fill object(↓) => merge values and fields placeholder => setState(object)
        const clientData: ClientCardProps = {
            activeClients: 700,
            nonActiveClients: 50,
            trialActive: 50,
            trialEnded: 200,
            allClients: 5000,
            allNonActiveClients: 800,
        };
        const newClientChartData: ChartCards = mergeData({chartData: clientChartData, chartValues: clientData})
        setClientChartData(newClientChartData)
    }, []);

    useEffect(() => {
        //for income chart: fetch data => fill object(↓) and set month => merge values and fields placeholder => setState(object)
        const incomeData: IncomeCardProps = {
            baseTariffIncomeAllTime: 700000,
            baseTariffIncomeMonthly: 300000,
            extendedTariffIncomeMonthly: 100000,
            extendedTariffIncomeAllTime: 300000
        };

        setMonth("Декабрь")

        const newIncomeMonthlyChartData: ChartCards = mergeData({chartData: incomeMonthlyChartData, chartValues: incomeData})
        setIncomeMonthlyChartData(newIncomeMonthlyChartData)
        const newIncomeAllChartData: ChartCards = mergeData({chartData: incomeAllChartData, chartValues: incomeData})
        setIncomeAllChartData(newIncomeAllChartData)
    }, []);

    useEffect(() => {
        //for trial chart: fetch data => fill object(↓) => merge values and fields placeholder => setState(object)
        const trialData: TrialCardProps = {
            subscribed: 700,
            dontSubscribed: 50,
            trialDeactivated: 25,
            trialEnded: 200,
            trialActive: 25
        };
        const newTrialChartData: ChartCards = mergeData({chartData: trialChartData, chartValues: trialData})
        setTrialChartData(newTrialChartData)
    }, []);

    useEffect(() => {
        //for subscribers chart: fetch data => fill object(↓) => merge values and fields placeholder => setState(object)
        const subscribersData: SubscribersCardProps = {
            subscribeActive: 700,
            subscribeStopped: 200,
            subscribeRejected: 100
        };
        const newSubscribersChartData: ChartCards = mergeData({chartData: subscribersChartData, chartValues: subscribersData})
        setSubscribersChartData(newSubscribersChartData)
    }, []);

    return (
        <div className={"analyticsCardGrid"}>
            <ChartCard cardHeader={"Клиенты"}
                       cardHeaderAddition={"кол-во"}
                       cardSummaryFieldName={"Всего клиентов"}
                       cardContent={clientChartData}/>
            {
                uiState.isAdmin ?
                    <ChartCard cardHeader={"Доход"}
                               cardHeaderAddition={"тыс. руб"}
                               cardContent={incomeAllChartData}
                               cardSummaryFieldName={"Общий доход"}
                               isSwitchable={true}
                               isMonthly={isIncomeMonthly}
                               setIsMonthlyFunc={setIsIncomeMonthly}
                               monthlyHeader={`Доход (${month})`}
                               monthlyData={incomeMonthlyChartData}/>
                    : null
            }
            <ChartCard cardHeader={"Триалы"}
                       cardHeaderAddition={"кол-во клиентов"}
                       cardSummaryFieldName={"Всего триалов"}
                       cardContent={trialChartData}/>
            <ChartCard cardHeader={"Подписки"}
                       cardHeaderAddition={"кол-во клиентов"}
                       cardSummaryFieldName={"Всего"}
                       cardContent={subscribersChartData}/>
        </div>
    )
}
