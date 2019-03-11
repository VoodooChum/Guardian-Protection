module.exports = {
    verbose: true, 
    roots: [
        "./__tests__"
    ],
    transformIgnorePatterns: [
  "node_modules/(?!(react-native|my-project|react-native-button)/)"
]
};