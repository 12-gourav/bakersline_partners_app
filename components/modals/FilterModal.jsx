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
              <Text style={ModalStyle.formText}>Payment Status</Text>
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
                      setFilter({ ...filter, status: status });
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
            <TouchableOpacity style={ModalStyle.apply}>
              <Text style={ModalStyle.applyText}>
                Apply{" "}
                {filter?.start && filter?.end && status
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
                  setFilter({ ...filter, start: start });
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
                  setFilter({ ...filter, end: end });
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
