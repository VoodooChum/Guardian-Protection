import * as React from 'react';
import 'react-native';
import App from "../App";
import renderer from 'react-test-renderer';



test("renders correctly with defaults", () => {
    const app = renderer.create(App.default).toJSON(); 
    console.log(app);
    app;
    expect(app).toMatchSnapshot();
})