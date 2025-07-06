// Add this at the top or in a separate file
import React from "react";
import { View, Text } from "react-native";

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    console.error("Unhandled Error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "red" }}>
            Something went wrong.
          </Text>
          <Text selectable style={{ marginTop: 12 }}>
            {String(this.state.error)}
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}
