import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { ErrorBoundary } from "./ErrorBoundry";

const screenWidth = Dimensions.get("window").width;
const chartWidth = Math.max(screenWidth - 60, 250);

const DashboardChart = () => {
  return (
    <ErrorBoundary>
      <BarChart
        data={{
          labels: ["Complete", "Pending", "RTO", "Cancel"],
          datasets: [{ data: [20, 30, 60, 87] }],
        }}
        width={chartWidth}
        height={220}
        yAxisLabel=""
        yAxisSuffix="%"
        withInnerLines={false}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          barPercentage: 0.7,
          color: (opacity = 1) => `rgba(255, 0, 89, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          borderRadius: 16,
        }}
      />
    </ErrorBoundary>
  );
};

export default DashboardChart;
