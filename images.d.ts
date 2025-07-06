declare module '*.jpg' {
  const value: number; // Expo image imports return a number (asset ID)
  export default value;
}

declare module '*.png' {
  const value: number;
  export default value;
}

declare module '*.jpeg' {
  const value: number;
  export default value;
}

declare module '*.gif' {
  const value: number;
  export default value;
}
