import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import 'jest-canvas-mock';
import {render} from '@testing-library/react';
import {App} from "./App";

const options = {text: '', showSeriesCount: true, results: 5}

test('should render wrapper correctly', () => {
  // @ts-ignore
  const {getByTestId} = render(<App options={options}/>);
  expect(getByTestId('wrapper')).toBeInTheDocument();
});

test('should render header correctly', () => {
  // @ts-ignore
  const {getByTestId} = render(<App options={options}/>);
  expect(getByTestId('header')).toBeInTheDocument();
});


test('should render search form correctly', () => {
  // @ts-ignore
  const {getByTestId} = render(<App options={options}/>);
  expect(getByTestId('search-form')).toBeInTheDocument();
});


test('should render search input field correctly', () => {
  // @ts-ignore
  const {getByTestId} = render(<App options={options}/>);
  expect(getByTestId('search-input-field')).toBeInTheDocument();
});

test('should render search button', () => {
  // @ts-ignore
  const {getByTestId} = render(<App options={options}/>);
  expect(getByTestId('search-button')).toBeInTheDocument();
});

test('should render image grid', () => {
  // @ts-ignore
  const {getByTestId} = render(<App options={options}/>);
  expect(getByTestId('image-grid')).toBeInTheDocument();
});
