import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderStyle from "@/styles/order";
import { primary } from "@/constants/Colors";
import FilterModal from "../../components/modals/FilterModal";
import SearchBarWithFilter from "@/components/SearchBarWithFilter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { useDispatch } from "react-redux";
import { GetPayments } from "@/api/api";
import NoData from "@/components/NoData";


const StatusData = ["COMPLETE", "PENDING", "CANCEL"];

const payments = () => {
  const [query, setQuery] = useState("");
  const [isVisible, setIsvisible] = useState(false);
  const [filter, setFilter] = useState({
    start: "",
    end: "",
    status: "",
    on: false,
  });
  const [start, setStart] = useState(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });

  const [end, setEnd] = useState(() => {
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    return now;
  });

  const [status, setStatus] = useState("");
  const [state, setState] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [on, setOn] = useState(false);

  const handleSearch = () => {
    setSearch(!search);
  };

  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      let date: any = [];
      if (filter.start !== "" && filter.end !== "") {
        date = [start, end];
      }
      const result = await GetPayments(
        current,
        date,
        query,
        filter.status,
        token
      );
      if (result?.data?.data) {
        const newData = result?.data?.data || [];
        setHasMore(newData.length === 10);
        if (current === 1) {
          setState(newData);
        } else {
          const temp = [...state, ...newData];
          setState(temp);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [search, current]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setCurrent((prev) => prev + 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <View style={OrderStyle.container}>
        <Text style={OrderStyle.heading}>Earnings & Payments</Text>
        <Text style={OrderStyle.dis}>
          View detailed records of all your payments and transactions.
        </Text>
        <SearchBarWithFilter
          query={query}
          setQuery={setQuery}
          setIsvisible={setIsvisible}
          handleSearch={handleSearch}
          placeholder="Search by payment method"
        />
        <View style={OrderStyle.filters}>
          {filter.status !== "" && (
            <View style={OrderStyle.filter_tag}>
              <Text style={OrderStyle.filterTagText}>{filter.status}</Text>
            </View>
          )}
          {filter.start !== "" && filter.end !== "" && (
            <View style={OrderStyle.filter_tag}>
              <Text style={OrderStyle.filterTagText}>
                {new Date(filter.start).toLocaleDateString()} -{" "}
                {new Date(filter.end).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>
        {state?.length === 0 && loading === false ? (
          <NoData message="No Payment Record Exist" />
        ) : (
          <FlatList
            style={{ flex: 1, marginTop: 20 }}
            data={state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <TrackingCard item={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            refreshing={loading}
            onRefresh={() => {
              setCurrent(1);
              setHasMore(true);
              fetchRecords();
            }}
          />
        )}
        {isVisible && (
          <FilterModal
            isVisible={isVisible}
            setIsVisible={setIsvisible}
            start={start}
            setStart={setStart}
            end={end}
            setEnd={setEnd}
            status={status}
            setStatus={setStatus}
            setFilter={setFilter}
            filter={filter}
            data={StatusData}
            fetchRecords={handleSearch}
            on={on}
            setOn={setOn}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default payments;

export const TrackingCard: React.FC<any> = ({ item }) => {
  let amount = 0;

  for (const p of item?.payments) {
    amount = amount + p.paymentAmount;
  }

  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <View style={OrderStyle.card}>
      <View style={OrderStyle.payment_card_top}>
        <View>
          <Text style={OrderStyle.payment_card_text}>Invoice Date</Text>
          <Text style={OrderStyle.payment_card_date}>
            {new Date(item?.date).toDateString()}
          </Text>
        </View>
        <TouchableOpacity
          style={OrderStyle.payment_card_icon}
          onPress={() => {
            router.push({
              pathname: "/(external)/payment_details",
              params: {
                from: "/payments",
              },
            });
            dispatch({ type: "addPayment", payload: item });
          }}
        >
          <Entypo name="chevron-right" size={16} color="#67b8fb" />
        </TouchableOpacity>
      </View>
      <View style={OrderStyle.payment_card_line}>
        <View>
          <Text style={OrderStyle.payment_card_text}>Payment Records</Text>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 6,
            }}
          >
            <View>
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={24}
                color={primary}
              />
            </View>
            <Text>{item?.payments?.length}</Text>
          </View>
        </View>

        <View>
          <Text style={OrderStyle.payment_card_text}>Amount</Text>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 6,
            }}
          >
            <FontAwesome5
              name="money-bill-wave-alt"
              size={16}
              color="#4db453"
            />
            <Text
              style={{
                fontWeight: "600",
                fontFamily: "bold",
                fontSize: 14,
                marginLeft: 5,
              }}
            >
              {amount}{" "}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
