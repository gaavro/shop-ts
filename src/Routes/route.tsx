import { Redirect, Route as ReactDOMRoute } from "react-router-dom";

interface IRouteProps {
  isPrivate?: boolean;
  component: () => JSX.Element;
  path: string;
  exact?: boolean;
}

const Route = ({
  isPrivate = false,
  component: Component,
  ...rest
}: IRouteProps) => {
  const token = localStorage.getItem("token") || "";

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isPrivate === !!token ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "/dashboard",
            }}
          />
        );
      }}
    />
  );
};

export default Route;
