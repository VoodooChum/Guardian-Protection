import * as React from 'react';
import renderer from 'react-test-renderer'

import  App  from "../App"

test("renders correctly with defaults", () => {
    const app = renderer.create(<App />).toJSON();
    expect(app).toMatchSnapshot();
})