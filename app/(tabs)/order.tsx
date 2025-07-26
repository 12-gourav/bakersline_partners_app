import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderStyle from "@/styles/order";
import Feather from "@expo/vector-icons/Feather";
import { primary } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import SearchBarWithFilter from "@/components/SearchBarWithFilter";
import FilterModal from "@/components/modals/FilterModal";
import UpcomingStyle from "@/styles/upcoming";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import av1 from "../../assets/images/av.png";
import { GetAllOrders } from "@/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StatusData = [
  "COMPLETE",
  "RTO",
  "CANCEL",
  "PENDING",
  "DISPATCH",
  "ASSIGN",
  "REJECTED BY ADMIN",
];

const order = () => {
  const [query, setQuery] = useState("");
  const [isVisible, setIsvisible] = useState(false);
  const [filter, setFilter] = useState<any>({
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
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    setSearch(!search);
   
  };

  const fetchRecords = useCallback(async () => {
    try {
      // if (!hasMore) return;

      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      let date: any = [];
      if (filter.start !== "" && filter.end !== "") {
        date = [start, end];
      }
      const result = await GetAllOrders(
        current,
        date,
        status,
        10,
        query,
        token
      );
      if (result?.data?.data) {
        const newData = result?.data?.data || [];
        setHasMore(newData.length ===10);
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
  }, [filter, search, current]);

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
        <Text style={OrderStyle.heading}>Order History</Text>
        <Text style={OrderStyle.dis}>
          View and manage all your past and upcoming orders in one place.
        </Text>
        <SearchBarWithFilter
          query={query}
          setQuery={setQuery}
          setIsvisible={setIsvisible}
          handleSearch={handleSearch}
          placeholder={"Search by Order Name"}
        />
        <View style={UpcomingStyle.filters}>
          {filter.status !== "" && (
            <View style={UpcomingStyle.filter_tag}>
              <Text style={UpcomingStyle.filterTagText}>{filter.status}</Text>
            </View>
          )}
          {filter.start !== "" && filter.end !== "" && (
            <View style={UpcomingStyle.filter_tag}>
              <Text style={UpcomingStyle.filterTagText}>
                {new Date(filter.start).toLocaleDateString()} -{" "}
                {new Date(filter.end).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>
        <View style={{ height: "88%" }}>
          <FlatList
            data={state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TrackingCard
                item={item}
                handlepush={(id: string) => router.push(`/(external)/${id}`)}
              />
            )}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, marginTop: 20 }}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
        
            refreshing={loading}
            onRefresh={() => {
              setCurrent(1);
              setHasMore(true);
              fetchRecords();
            }}
          />
        </View>

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
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default order;

export const TrackingCard: React.FC<any> = ({ item, handlepush }) => {
  return (
    <View style={UpcomingStyle.card}>
      <View style={UpcomingStyle.top}>
        <View style={UpcomingStyle.status}>
          <MaterialCommunityIcons name="chef-hat" size={14} color="#fff" />
          <Text style={UpcomingStyle.statusText}>{item?.orderStatus}</Text>
        </View>
        <View style={UpcomingStyle.status}>
          <Feather name="clock" size={14} color="#fff" />
          <Text style={UpcomingStyle.statusText}>
            {new Date(item?.orderDate).toDateString()}
          </Text>
        </View>
        <View style={UpcomingStyle.status}>
          <Feather name="clock" size={14} color="#fff" />
          <Text style={UpcomingStyle.statusText}>
            {new Date(item?.orderTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </Text>
        </View>
      </View>
      <View style={UpcomingStyle.productList}>
        <View style={UpcomingStyle.product}>
          <Image
            source={item?.product[0]?.img[0]?.url?.replace('http://', 'https://')}
            style={UpcomingStyle.img}
          />
          <View style={UpcomingStyle.productTextWrap}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={UpcomingStyle.h1}
            >
              {item?.product[0]?.name}
            </Text>
            <Text style={UpcomingStyle.h6}>+{item?.product?.length} Items</Text>
          </View>
        </View>
      </View>
      <View style={UpcomingStyle.bar}></View>
      <View style={{ ...UpcomingStyle.product, alignItems: "center" }}>
        <View style={UpcomingStyle.img2wrap}>
          <Image style={UpcomingStyle.img2} source={av1} />
        </View>
        <View style={UpcomingStyle.agentWrap}>
          <View>
            <Text style={UpcomingStyle.h66}>Delivery Agent</Text>
            <Text style={UpcomingStyle.h4}>{item?.agent?.name}</Text>
          </View>
          <View style={UpcomingStyle.phone}>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${item?.agent?.phone}`)}
            >
              <FontAwesome name="phone" size={14} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={UpcomingStyle.last}>
        <View style={UpcomingStyle.wrapText}>
          <MaterialIcons name="currency-rupee" size={15} color={primary} />
          <Text style={UpcomingStyle.ptext}>
            {item?.supplier?.supplierAmount}
          </Text>
        </View>

        <TouchableOpacity
          style={UpcomingStyle.btn}
          onPress={() => handlepush(item?._id)}
        >
          <Text style={UpcomingStyle.btnText}>View Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
