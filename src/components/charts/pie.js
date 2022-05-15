import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartTitle,
  } from "@progress/kendo-react-charts";
  import "hammerjs";

  // Graph data
  const series = [];
  
  fetch("/api/admin/statistics", {
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
  })
  .then(res => res.json())
  .then(response => {
    var total = 0;
    response.forEach(element => {
      total += element.Total;
      
    });


    response.map((element) => {
      series.push({"category": element.Name, "value": element.Total / total })
      
    })
  })
  
  const labelContent = (props) => {
    let formatedNumber = Number(props.dataItem.value).toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 2,
    });
    return `${props.dataItem.category} Bookings Percentage: ${formatedNumber}, `;
  };
  
  const ChartContainer = () => (
    <Chart>
      <ChartTitle text="Movie Percentages of total bookings" />
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