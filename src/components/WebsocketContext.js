import { createContext, useState, useEffect, useRef } from "react";
import { BaseUrl } from "../ServerSetting";
import CustomSnackbar from "./Common/Snackbar";
import { GameAction, NotificationTypeEnum } from "../Common/CommonEnum";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  user: state.User,
});

const mapDispatchToProps = {};

export const WebsocketContext = createContext(false, null, () => {});
//                                            ready, value, send

// Make sure to put WebsocketProvider higher up in
// the component tree than any consumers.
export const WebsocketProvider = connect(mapStateToProps)(
  ({ children, ...props }) => {
    console.log(props)
    const [isReady, setIsReady] = useState(false);
    const [val, setVal] = useState(null);

    const ws = useRef(null);
    const messageRef = useRef(null);

    useEffect(() => {
      console.log(props)
      if (props.user.token) {
        const socket = new WebSocket(`${BaseUrl.replace("http", "ws")}`);
        socket.onopen = () => {
          socket.send(
            JSON.stringify({
              action: GameAction.Online,
              payload: {
                token: props.user.token,
                id: props.user.id,
                username: props.user.username
              },
            })
          );
          setIsReady(true);
        };
        socket.onclose = () => setIsReady(false);
        socket.onmessage = (event) => {
          try {
            setVal(JSON.parse(event.data));
          } catch (e) {
            messageRef.current.showMessage(
              e.message,
              NotificationTypeEnum.Error
            );
          }
          let msg = JSON.parse(event.data);
          if(GameAction.Expired_Token == msg.action) {
            if (document.getElementById("logout")) {
              document.getElementById("logout").click();
            }            
          }
        };

        ws.current = socket;
      } else {
        if (isReady && ws.current) {
          ws.current.close();
        }
      }
      return () => {
        if (ws.current) {
          ws.current.close();
        }
      };
    }, [props.user.token]);

    const ret = [isReady, val, ws.current?.send.bind(ws.current)];

    return (
      <WebsocketContext.Provider value={ret}>
        <CustomSnackbar ref={messageRef} />
        {children}
      </WebsocketContext.Provider>
    );
  }
);
