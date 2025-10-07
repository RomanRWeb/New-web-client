"use client";
import { ChartCards, ChartField } from "@app/data/types";
import Card from "@app/common/components/сard/Card";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  propertyName?: string;
  isLoading?: boolean;
}

interface legendBarProps {
  value: number;
  key: string;
  color: string;
}

interface LegendLabelProps {
  value: number;
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
  isLoading = false,
  propertyName,
}: createCardProps) => {
  const [cardData, setCardData] = useState<ChartCards>();
  const [sumValue, setSumValue] = useState(0);
  const [percentArray, setPercentArray] = useState<number[]>([]);

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMonthly && monthlyData) {
      setSumValue(monthlyData?.fields.reduce((acc, cur) => acc + cur.value, 0));
    } else {
      setSumValue(cardContent.fields.reduce((acc, cur) => acc + cur.value, 0));
    }
  }, [cardContent.fields, isMonthly, monthlyData]);

  useEffect(() => {
    if (isMonthly && monthlyData) {
      const sortData = monthlyData?.fields.sort((a, b) => b.value - a.value);
      setCardData({ fields: sortData });
    } else {
      const sortData = cardContent.fields.sort((a, b) => b.value - a.value);
      setCardData({ fields: sortData });
    }
  }, [cardContent, isMonthly, monthlyData]);

  useEffect(() => {
    percentArray.forEach((el, i) => {
      if (elementRef.current) {
        elementRef.current.style.setProperty(`${propertyName}${i}`, `${el}%`);
      }
    });
  }, [cardData?.fields, percentArray, propertyName]);

  useEffect(() => {
    if (cardData && sumValue && !isLoading) {
      const percents: { i: number; array: number[] } = cardData.fields.reduce(
        (acc, el) => {
          if (acc.i != 0) {
            const value = acc.array[acc.i - 1] + (el.value / sumValue) * 100;
            acc.array.push(value);
          } else {
            acc.array.push((el.value / sumValue) * 100);
          }
          acc.i = acc.i + 1;
          return acc;
        },
        { i: 0, array: [] } as { i: number; array: number[] },
      );
      console.log(percents);
      setPercentArray(percents.array);
    }
  }, [cardData, isLoading, sumValue]);

  const conicGradientString: string | undefined = useMemo(() => {
    const conicGradientArray: string[] | undefined = cardData?.fields.map(
      (el, i) => {
        if (i != 0) {
          return `${el.color} calc(var(${propertyName}${i - 1}) + 0.2%), ${el.color} var(${propertyName}${i})`;
        } else return `${el.color} 0%, ${el.color} var(${propertyName}${i})`;
      },
    );
    return `conic-gradient(${conicGradientArray?.toString()})`;
  }, [cardData?.fields, propertyName]);

  const graphStyle: React.CSSProperties = useMemo(() => {
    const transitionString: string[] = [];
    cardData?.fields.reduce((acc, el) => {
      transitionString.push(`${propertyName}${acc} 0.8s ease`);
      acc = acc + 1;
      return acc;
    }, 0 as number);

    return {
      backgroundImage: conicGradientString,
      transition: transitionString.toString(),
    };
  }, [cardData?.fields, conicGradientString, propertyName]);

  const createLegendBar = useCallback(
    ({ value, key, color }: legendBarProps) => {
      const flexCalc = value && sumValue ? (value / sumValue) * 100 : 0;
      return (
        <span
          style={{
            minWidth: "25px",
            flex: flexCalc,
            backgroundColor: color,
          }}
          key={key}
        />
      );
    },
    [sumValue],
  );

  const createLegendLabels = useCallback(
    ({ value, key, icon }: LegendLabelProps) => {
      const percent = value && sumValue ? (value / sumValue) * 100 : 0;
      let percentShow: string = percent.toFixed(1);
      if (percentShow[percentShow.length - 1] === "0") {
        percentShow = percent.toFixed(0);
      }
      return (
        <span key={key}>
          {icon}
          {`${percentShow}%`}
        </span>
      );
    },
    [sumValue],
  );

  const createField = useCallback(
    (data: ChartField) => {
      return (
        <div className={"field"} key={`${data.fieldName}(${data.paramName})`}>
          {data.icon}
          <span>{data.fieldName}</span>
          {isLoading ? (
            <span className={"skeleton"} />
          ) : (
            <span style={{ color: data.color }} className={"colored-text"}>
              {data.value.toLocaleString()}
            </span>
          )}

          {data.additionText && data.additionValue ? (
            isLoading ? (
              <>
                {"("}
                <span className={"skeleton"} />
                <span>{`${data.additionText})`}</span>
              </>
            ) : (
              <span>{`(${data.additionValue?.toLocaleString()} ${data.additionText})`}</span>
            )
          ) : null}
        </div>
      );
    },
    [isLoading],
  );

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
            <div>
              <h2>{`${cardSummaryFieldName}:`}</h2>
              {isLoading ? (
                <span className={"skeleton"}></span>
              ) : (
                <h2>{`${sumValue?.toLocaleString()}`}</h2>
              )}
            </div>
            {cardData?.fields.map((field) => createField(field))}
          </section>
        </div>
        <div className={"chart-part"}>
          <div className={"chart"} ref={elementRef} style={graphStyle} />
          <div className={"chart-legend"}>
            <div className={"chart-legend-labels"}>
              {cardData?.fields.map((el: ChartField) =>
                createLegendLabels({
                  value: el.value,
                  key: el.fieldName,
                  icon: el.icon,
                }),
              )}
            </div>
            {!isLoading ? (
              <div className={"chart-legend-bar"}>
                {cardData?.fields.map((el: ChartField) =>
                  createLegendBar({
                    value: el.value,
                    key: el.fieldName,
                    color: el.color,
                  }),
                )}
              </div>
            ) : (
              <div className={"skeleton"} />
            )}
          </div>
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
