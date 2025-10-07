"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ChartCards,
  ClientCardProps,
  IncomeCardProps,
  SubscribersCardProps,
  TrialCardProps,
} from "@app/data/types";
import { SuccessInvertIcon } from "@app/common/icons/success-invert";
import { ErrorInvertIcon } from "@app/common/icons/error-invert";
import { WarningInvertIcon } from "@app/common/icons/warning-invert";
import { useSelector } from "react-redux";
import { RootState } from "@app/store/store";
import ChartCard from "@app/modules/home/components/chart-card";
import "@app/common/styles/pages/home/analytics.scss";
import {
  clientDataPlaceholder,
  incomeDataPlaceholder,
  subscribeDataPlaceholder,
  trialDataPlaceholder,
  clientEmptyPlaceholder,
  incomeEmptyPlaceholder,
  subscribeEmptyPlaceholder,
  trialEmptyPlaceholder,
} from "@app/data/constants";

const Analytics: React.FC = () => {
  const greenColor: string = "#92D36E";
  const redColor: string = "#FF5D55";
  const orangeColor: string = "#FFA833";
  const violetColor: string = "#BC51AD";
  const blackColor: string = "#444444";

  const clientPlaceholder: ChartCards = useMemo(
    () => ({
      fields: [
        {
          fieldName: "Активные",
          color: greenColor,
          icon: <SuccessInvertIcon />,
          value: 0,
          additionValue: 0,
          additionText: "сотрудников",
          paramName: "activeClients",
          additionParamName: "allClients",
        },
        {
          fieldName: "Не активные",
          color: redColor,
          icon: <ErrorInvertIcon />,
          value: 0,
          additionValue: 0,
          additionText: "сотрудников",
          paramName: "nonActiveClients",
          additionParamName: "allNonActiveClients",
        },
        {
          fieldName: "Триал закончился",
          color: orangeColor,
          icon: <WarningInvertIcon />,
          value: 0,
          paramName: "trialEnded",
        },
        {
          fieldName: "Триал активен",
          color: violetColor,
          icon: <SuccessInvertIcon color={violetColor} />,
          value: 0,
          paramName: "trialActive",
        },
      ],
    }),
    [],
  );

  const incomeMonthlyPlaceholder: ChartCards = useMemo(
    () => ({
      fields: [
        {
          fieldName: "Доход от базовой части подписок",
          color: greenColor,
          icon: <SuccessInvertIcon />,
          value: 0,
          paramName: "baseTariffIncomeMonthly",
        },
        {
          fieldName: "Доход от доп. пользователей",
          color: violetColor,
          icon: <SuccessInvertIcon color={violetColor} />,
          value: 0,
          paramName: "extendedTariffIncomeMonthly",
        },
      ],
    }),
    [],
  );

  const incomeAllPlaceholder: ChartCards = useMemo(
    () => ({
      fields: [
        {
          fieldName: "Доход от базовой части подписок",
          color: greenColor,
          icon: <SuccessInvertIcon />,
          value: 0,
          paramName: "baseTariffIncomeAllTime",
        },
        {
          fieldName: "Доход от доп. пользователей",
          color: violetColor,
          icon: <SuccessInvertIcon color={violetColor} />,
          value: 0,
          paramName: "extendedTariffIncomeAllTime",
        },
      ],
    }),
    [],
  );

  const trialPlaceholder: ChartCards = useMemo(
    () => ({
      fields: [
        {
          fieldName: "Оформляли подписку",
          color: greenColor,
          icon: <SuccessInvertIcon />,
          value: 0,
          paramName: "subscribed",
        },
        {
          fieldName: "Отказ после триала",
          color: redColor,
          icon: <ErrorInvertIcon />,
          value: 0,
          paramName: "dontSubscribed",
        },
        {
          fieldName: "Триал закончился",
          color: orangeColor,
          icon: <WarningInvertIcon />,
          value: 0,
          paramName: "trialEnded",
        },
        {
          fieldName: "Триал активен",
          color: violetColor,
          icon: <SuccessInvertIcon color={violetColor} />,
          value: 0,
          paramName: "trialActive",
        },
        {
          fieldName: "Триал деактивирован",
          color: blackColor,
          icon: <ErrorInvertIcon color={blackColor} />,
          value: 0,
          paramName: "trialDeactivated",
        },
      ],
    }),
    [],
  );

  const subscribersPlaceholder: ChartCards = useMemo(
    () => ({
      fields: [
        {
          fieldName: "Подписка активна",
          color: greenColor,
          icon: <SuccessInvertIcon />,
          value: 0,
          paramName: "subscribeActive",
        },
        {
          fieldName: "Подписка остановлена",
          color: orangeColor,
          icon: <WarningInvertIcon />,
          value: 0,
          paramName: "subscribeStopped",
        },
        {
          fieldName: "Отказ от подписки",
          color: redColor,
          icon: <ErrorInvertIcon />,
          value: 0,
          paramName: "subscribeRejected",
        },
      ],
    }),
    [],
  );

  const uiState = useSelector((state: RootState) => state.ui);

  const [clientChartData, setClientChartData] =
    useState<ChartCards>(clientPlaceholder);
  const [clientData, seClientData] = useState<ClientCardProps>(
    clientEmptyPlaceholder,
  );
  const [clientLoading, setClientLoading] = useState<boolean>(true);

  const [incomeMonthlyChartData, setIncomeMonthlyChartData] =
    useState<ChartCards>(incomeMonthlyPlaceholder);
  const [incomeAllChartData, setIncomeAllChartData] =
    useState<ChartCards>(incomeAllPlaceholder);
  const [incomeData, setIncomeData] = useState<IncomeCardProps>(
    incomeEmptyPlaceholder,
  );
  const [incomeLoading, setIncomeLoading] = useState<boolean>(true);

  const [trialChartData, setTrialChartData] =
    useState<ChartCards>(trialPlaceholder);
  const [trialData, setTrialData] = useState<TrialCardProps>(
    trialEmptyPlaceholder,
  );
  const [trialLoading, setTrialLoading] = useState<boolean>(true);

  const [subscribersChartData, setSubscribersChartData] = useState<ChartCards>(
    subscribersPlaceholder,
  );
  const [subscribeData, setSubscribeData] = useState<SubscribersCardProps>(
    subscribeEmptyPlaceholder,
  );
  const [subscribeLoading, setSubscribeLoading] = useState<boolean>(true);

  const [month, setMonth] = useState<string>("Январь");

  const [isIncomeMonthly, setIsIncomeMonthly] = useState<boolean>(false);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const isNumber = useCallback((value: any) => {
    return typeof value === "number" && !isNaN(value);
  }, []);

  const mergeData = useCallback(
    ({
      chartData,
      chartValues,
    }: {
      chartData: ChartCards;
      chartValues: any;
    }) => {
      const mergedChartData: ChartCards = {
        fields: chartData.fields.map((el) => ({
          ...el,
          value: isNumber(chartValues[el.paramName])
            ? chartValues[el.paramName]
            : 0,
          additionValue:
            el.additionParamName && isNumber(chartValues[el.additionParamName])
              ? chartValues[el.additionParamName]
              : "",
        })),
      };

      return mergedChartData;
    },
    [isNumber],
  );

  useEffect(() => {
    //for client chart: fetch data => seClientData(data) => merge values and fields placeholder => setState(object)
    const newClientChartData: ChartCards = mergeData({
      chartData: clientPlaceholder,
      chartValues: clientData,
    });
    setClientChartData(newClientChartData);
  }, [clientData, clientPlaceholder, mergeData]);

  useEffect(() => {
    //for income chart: fetch data => setIncomeData(data) and set month => merge values and fields placeholder => setState(object)
    setMonth("Декабрь");

    const newIncomeMonthlyChartData: ChartCards = mergeData({
      chartData: incomeMonthlyPlaceholder,
      chartValues: incomeData,
    });
    setIncomeMonthlyChartData(newIncomeMonthlyChartData);
    const newIncomeAllChartData: ChartCards = mergeData({
      chartData: incomeAllPlaceholder,
      chartValues: incomeData,
    });
    setIncomeAllChartData(newIncomeAllChartData);
  }, [incomeAllPlaceholder, incomeData, incomeMonthlyPlaceholder, mergeData]);

  useEffect(() => {
    //for trial chart: fetch data => setTrialData(data) => merge values and fields placeholder => setState(object)

    const newTrialChartData: ChartCards = mergeData({
      chartData: trialPlaceholder,
      chartValues: trialData,
    });
    setTrialChartData(newTrialChartData);
  }, [mergeData, trialData, trialPlaceholder]);

  useEffect(() => {
    //for subscribers chart: fetch data => setSubscribeData(data) => merge values and fields placeholder => setState(object)

    const newSubscribersChartData: ChartCards = mergeData({
      chartData: subscribersPlaceholder,
      chartValues: subscribeData,
    });
    setSubscribersChartData(newSubscribersChartData);
  }, [mergeData, subscribeData, subscribersPlaceholder]);

  useEffect(() => {
    setTimeout(() => {
      setClientLoading(false);
      seClientData(clientDataPlaceholder);
    }, 800);
    setTimeout(() => {
      setIncomeLoading(false);
      setIncomeData(incomeDataPlaceholder);
    }, 1600);
    setTimeout(() => {
      setTrialLoading(false);
      setTrialData(trialDataPlaceholder);
    }, 2400);
    setTimeout(() => {
      setSubscribeLoading(false);
      setSubscribeData(subscribeDataPlaceholder);
    }, 3200);
  }, []);

  return (
    <div className={"analytics-card-grid"}>
      <ChartCard
        cardHeader={"Клиенты"}
        cardHeaderAddition={"кол-во"}
        cardSummaryFieldName={"Всего клиентов"}
        cardContent={clientChartData}
        isLoading={clientLoading}
        propertyName={"--angle-client"}
      />
      {uiState.isAdmin ? (
        <ChartCard
          cardHeader={"Доход"}
          cardHeaderAddition={"тыс. руб"}
          cardContent={incomeAllChartData}
          cardSummaryFieldName={"Общий доход"}
          isSwitchable={true}
          isMonthly={isIncomeMonthly}
          setIsMonthlyFunc={setIsIncomeMonthly}
          monthlyHeader={`Доход (${month})`}
          monthlyData={incomeMonthlyChartData}
          isLoading={incomeLoading}
          propertyName={"--angle-income"}
        />
      ) : null}
      <ChartCard
        cardHeader={"Триалы"}
        cardHeaderAddition={"кол-во клиентов"}
        cardSummaryFieldName={"Всего триалов"}
        cardContent={trialChartData}
        isLoading={trialLoading}
        propertyName={"--angle-trial"}
      />
      <ChartCard
        cardHeader={"Подписки"}
        cardHeaderAddition={"кол-во клиентов"}
        cardSummaryFieldName={"Всего"}
        cardContent={subscribersChartData}
        isLoading={subscribeLoading}
        propertyName={"--angle-subscribe"}
      />
    </div>
  );
};

export default Analytics;
