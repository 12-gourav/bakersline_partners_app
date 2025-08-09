import ModalStyle from "@/styles/modal";
import { useState } from "react";
import {
  View,
  Text,
  Modal,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Fontisto from "@expo/vector-icons/Fontisto";
import { BlurView } from "expo-blur";

const FilterModal = ({
  isVisible,
  setIsVisible,
  start,
  setStart,
  end,
  setEnd,
  status,
  setStatus,
  setFilter,
  filter,
  data,
  fetchRecords,
  on,
  setOn
}) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleReset = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    setStart(now);
    setEnd(now);
    setStatus("");
    setFilter({ start: "", end: "", status: "" });
    setIsVisible(false);
    setOn(false)
    fetchRecords()
  };

  const applyFilter = () => {
    setFilter({ status: status, start: on ? start:"", end:on? end:"" });
    setIsVisible(false);
    fetchRecords();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <BlurView style={ModalStyle.overlay} intensity={80} tint="dark">
          <View style={ModalStyle.container}>
            <View style={ModalStyle.heading}>
              <Text style={ModalStyle.headingText}>Filters</Text>
            </View>
            <View style={ModalStyle.form}>
              <Text style={ModalStyle.formText}>Date Range</Text>
              <View style={ModalStyle.group}>
                <TouchableOpacity
                  style={ModalStyle.date}
                  onPress={() => setOpen(true)}
                >
                  <Fontisto name="date" size={15} color="#474747" />
                  <Text>{new Date(start)?.toDateString()}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={ModalStyle.date}
                  onPress={() => setOpen2(true)}
                >
                  <Fontisto name="date" size={15} color="#474747" />
                  <Text>{new Date(end)?.toDateString()}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={ModalStyle.form}>
              <Text style={ModalStyle.formText}>Order Status</Text>
              <View style={ModalStyle.tabs}>
                {data?.map((z) => (
                  <TouchableOpacity
                    key={z}
                    style={
                      status === z
                        ? ModalStyle.tabItemActive
                        : ModalStyle.tabItem
                    }
                    onPress={() => {
                      setStatus(status === z ? "" : z);
                     
                    }}
                  >
                    <Text
                      style={
                        status === z
                          ? ModalStyle.tabItemTextActive
                          : ModalStyle.tabItemText
                      }
                    >
                      {z}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <TouchableOpacity style={ModalStyle.clear} onPress={handleReset}>
              <Text style={ModalStyle.clearText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ModalStyle.apply} onPress={() => applyFilter()}>
              <Text style={ModalStyle.applyText}>
                Apply{" "}
                {on && status
                  ? "(2)"
                  : (filter?.start && filter?.end) || status
                  ? "(1)"
                  : ""}
              </Text>
            </TouchableOpacity>

            {open && (
              <DateTimePicker
                value={new Date(start)}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(e, selectedDate) => {
                  setStart(selectedDate);
                  setOpen(false);
                  setOn(true)
                
                }}
              />
            )}
            {open2 && (
              <DateTimePicker
                value={new Date(end)}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(e, selectedDate) => {
                  setEnd(selectedDate);
                  setOpen2(false);
                  setOn(true)
                 
                }}
              />
            )}
          </View>
        </BlurView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterModal;
