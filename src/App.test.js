import { render, screen } from '@testing-library/react';
import App from './App';
// import Main from "./Entryfile/Main";
import LoginPage from './initialpage/loginpage';

test('renders learn react link', () => {
  render(<LoginPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
