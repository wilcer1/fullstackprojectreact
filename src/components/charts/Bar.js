import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartTitle,
  } from "@progress/kendo-react-charts";
  import { COLORS } from "../../constants";
  import "hammerjs";
  
  // Graph data
  const series = [
    {
      category: "Movie 1",
      value: 0.2545,
    },
    {
      category: "Movie 2",
      value: 0.1552,
    },
    {
      category: "Movie 3",
      value: 0.4059,
    },
    {
      category: "Movie 4",
      value: 0.0911,
    },
    {
      category: "Movie 5",
      value: 0.0933,
    },
  ];
  series.push({category: "movie 3", value: 10})
  
  const labelContent = (props) => {
    let formatedNumber = Number(props.dataItem.value).toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 2,
    });
    return `${props.dataItem.category} years old: ${formatedNumber}`;
  };
  
  const ChartContainer = () => (
    <Chart>
      <ChartTitle text="World Population by Broad Age Groups" />
      <ChartLegend position="bottom" />
      <ChartSeries>
        <ChartSeriesItem
          type="pie"
          data={series}
          field="value"
          categoryField="category"
          labels={{
            visible: true,
            content: labelContent,
          }}
        />
      </ChartSeries>
    </Chart>
  );
  export default ChartContainer;