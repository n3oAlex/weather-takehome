import { Alert, AlertColor, Fade, Stack } from "@mui/material";
import { delay } from "../utils/delay";
import { genericHookContextBuilder } from "../utils/genericHookContextBuilder";
import { styled } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import { withCtxProviders } from "../utils/withCtxProviders";

const Alert_box = styled(Alert)({
  alignItems: "center",
});

type Alert = {
  id: string;
  severity: AlertColor;
  content: string;
  timeout: number;
};

const randomId = () => Math.random().toString(36).substr(2, 9);

const Alert_Custom = (props: { alert: Alert }) => {
  const { removeAlert } = useContext(AlertsContext);
  useEffect(() => {
    if (props.alert.timeout <= 0) return;
    const recycle = async () => {
      await delay(props.alert.timeout);
      removeAlert(props.alert.id);
    };
    recycle();
  }, []);
  return (
    <Fade in={true}>
      <Alert_box
        severity={props.alert.severity}
        role="alert"
        onClose={() => removeAlert(props.alert.id)}
      >
        {props.alert.content}
      </Alert_box>
    </Fade>
  );
};

const useValue = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const removeAlert = (id: string) => setAlerts((p) => [...p.filter((a) => a.id !== id)]);

  const showAlert = (severity: AlertColor, content: string, timeout: number = 3000) => {
    const id = randomId();
    setAlerts((p) => [...p, { id, severity, content, timeout }]);
    return id;
  };

  return { alerts, showAlert, removeAlert };
};

const { Context, ContextProvider } = genericHookContextBuilder(useValue);

export const AlertsContext = Context;

const Stack_Alerts = styled(Stack)((p) => ({
  width: p.theme.spacing(50),
  marginLeft: p.theme.spacing(-25),
  position: "fixed",
  top: p.theme.spacing(1),
  left: "50%",
  "& > *": {
    marginTop: p.theme.spacing(1),
  },
}));

export const AlertsContextProvider = withCtxProviders([ContextProvider])(
  (props: { children: React.ReactNode }) => {
    const { alerts } = useContext(AlertsContext);
    return (
      <>
        {props.children}

        {alerts.length > 0 && (
          <Stack_Alerts direction="column" alignItems="center" zIndex={9001}>
            {alerts.map((alert) => (
              <Alert_Custom key={alert.id} alert={alert} />
            ))}
          </Stack_Alerts>
        )}
      </>
    );
  }
);
