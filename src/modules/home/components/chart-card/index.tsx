"use client";
import { ChartCards, ChartField } from "@app/data/types";
import Card from "@app/common/components/сard/Card";
import React, { useCallback } from "react";
import "../../../../common/styles/common/ChartCard.scss";

interface createCardProps {
  cardHeader: string;
  cardHeaderAddition: string;
  cardSummaryFieldName: string;
  cardContent: ChartCards;
  isSwitchable?: boolean;
  isMonthly?: boolean;
  setIsMonthlyFunc?: (b: boolean) => void;
  monthlyData?: ChartCards;
  monthlyHeader?: string;
}

interface ChartProps {
  sumValue: number;
  chartData: ChartCards;
}

interface legendBarProps {
  value: number;
  sumValue: number;
  key: string;
  color: string;
}

interface LegendLabelProps {
  value: number;
  sumValue: number;
  key: string;
  icon: React.ReactNode;
}

const ChartCard: React.FC<createCardProps> = ({
  cardHeader,
  cardHeaderAddition,
  cardSummaryFieldName,
  cardContent,
  isMonthly = false,
  setIsMonthlyFunc,
  monthlyData,
  monthlyHeader,
  isSwitchable = false,
}: createCardProps) => {
  const sumValue = cardContent.fields.reduce((acc, cur) => acc + cur.value, 0);
  const sumValueMonthly = monthlyData?.fields.reduce(
    (acc, cur) => acc + cur.value,
    0,
  );

  const createLegendBar = useCallback(
    ({ value, sumValue, key, color }: legendBarProps) => {
      const flexCalc = value && sumValue ? (value / sumValue) * 100 : 0;
      return (
        <span
          style={{ minWidth: "25px", flex: flexCalc, backgroundColor: color }}
          key={key}
        />
      );
    },
    [],
  );

  const createLegendLabels = useCallback(
    ({ value, sumValue, key, icon }: LegendLabelProps) => {
      const percent = value && sumValue ? (value / sumValue) * 100 : 0;
      return (
        <span key={key}>
          {icon}
          {`${percent.toFixed(1)}%`}
        </span>
      );
    },
    [],
  );

  const createChart = useCallback(
    ({ sumValue, chartData }: ChartProps) => {
      const sortChartData = chartData.fields.sort((a, b) => b.value - a.value);

      const conicGradientArray: { counter: number; colorArray: string[] } =
        sortChartData.reduce(
          (acc, el) => {
            acc.colorArray.push(
              `${el.color} ${(acc.counter / sumValue) * 100 + 0.2}%`,
            );
            acc.colorArray.push(
              `${el.color} ${((acc.counter + el.value) / sumValue) * 100}%`,
            );
            acc.counter = acc.counter + el.value;
            return acc;
          },
          { counter: 0, colorArray: [] } as {
            counter: number;
            colorArray: string[];
          },
        );

      const conicGradientString = `conic-gradient(${conicGradientArray.colorArray.toString()})`;

      return (
        <>
          <div
            className={"chart"}
            style={{ backgroundImage: conicGradientString }}
          />
          <div className={"chart-legend"}>
            <div className={"chart-legend-labels"}>
              {sortChartData.map((el: ChartField) =>
                createLegendLabels({
                  sumValue: sumValue,
                  value: el.value,
                  key: el.fieldName,
                  icon: el.icon,
                }),
              )}
            </div>
            <div className={"chart-legend-bar"}>
              {sortChartData.map((el: ChartField) =>
                createLegendBar({
                  sumValue: sumValue,
                  value: el.value,
                  key: el.fieldName,
                  color: el.color,
                }),
              )}
            </div>
          </div>
        </>
      );
    },
    [createLegendBar, createLegendLabels],
  );

  const createField = useCallback((data: ChartField) => {
    return (
      <div className={"field"} key={`${data.fieldName}(${data.paramName})`}>
        {data.icon}
        <span>{data.fieldName}</span>
        <span style={{ color: data.color }} className={"colored-text"}>
          {data.value}
        </span>
        {data.additionText ? (
          <span>{`(${data.additionValue} ${data.additionText})`}</span>
        ) : null}
      </div>
    );
  }, []);

  return (
    <Card>
      <div>
        <div className={"info-part"}>
          <header>
            {isMonthly ? (
              <h1>{`${monthlyHeader}, `}</h1>
            ) : (
              <h1>{`${cardHeader}, `}</h1>
            )}
            <span>{cardHeaderAddition}</span>
          </header>
          <section>
            {isMonthly && monthlyData ? (
              <>
                <h2>{`${cardSummaryFieldName}: ${sumValueMonthly}`}</h2>
                {monthlyData.fields.map((field) => createField(field))}
              </>
            ) : (
              <>
                <h2>{`${cardSummaryFieldName}: ${sumValue}`}</h2>
                {cardContent.fields.map((field) => createField(field))}
              </>
            )}
          </section>
        </div>
        <div className={"chart-part"}>
          {isMonthly && monthlyData && sumValueMonthly
            ? createChart({ chartData: monthlyData, sumValue: sumValueMonthly })
            : createChart({ chartData: cardContent, sumValue: sumValue })}
        </div>
      </div>
      {isSwitchable && setIsMonthlyFunc ? (
        <section className={"switcher-container"}>
          <div className={"button-wrapper"}>
            <label>
              <input
                type={"radio"}
                onClick={() => setIsMonthlyFunc(false)}
                name={`${cardHeader}-time-selector`}
                value={`${cardHeader}-all-time`}
                defaultChecked={true}
              />
              <span>{"За всё время"}</span>
            </label>
            <label>
              <input
                type={"radio"}
                onClick={() => setIsMonthlyFunc(true)}
                name={`${cardHeader}-time-selector`}
                value={`${cardHeader}-monthly`}
                defaultChecked={false}
              />
              <span>{"Последний месяц"}</span>
            </label>
            <div className="selection" />
          </div>
        </section>
      ) : null}
    </Card>
  );
};

export default ChartCard;
