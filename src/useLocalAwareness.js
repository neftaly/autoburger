import { useRepo } from "automerge-repo-react-hooks";
import { useEffect } from "react";
import useStateRef from "react-usestateref";
import { peerEvents } from "./useRemoteAwareness";

export const useLocalAwareness = (
  userId,
  channelId,
  initialState,
  { heartbeatTime = 15000 } = {}
) => {
  const [localState, setLocalState, localStateRef] = useStateRef(initialState);
  const { ephemeralData } = useRepo();

  const setState = (stateOrUpdater) => {
    const state =
      typeof stateOrUpdater === "function"
        ? stateOrUpdater(localStateRef.current)
        : stateOrUpdater;
    setLocalState(state);
    // TODO: Send deltas
    ephemeralData.broadcast(channelId, [userId, state]);
  };

  useEffect(() => {
    // Send periodic heartbeats
    const heartbeat = () =>
      void ephemeralData.broadcast(channelId, [userId, localStateRef.current]);
    heartbeat(); // Initial heartbeat
    // TODO: we don't need to send a heartbeat if we've changed state recently; use recursive setTimeout instead of setInterval
    const heartbeatIntervalId = setInterval(heartbeat, heartbeatTime);
    return () => void clearInterval(heartbeatIntervalId);
  }, [userId, channelId, heartbeatTime, ephemeralData]);

  useEffect(() => {
    // Send entire state to new peers
    let broadcastTimeoutId;
    const newPeerEvents = peerEvents.on("new_peer", (e) => {
      if (e.channelId !== channelId) return;
      broadcastTimeoutId = setTimeout(
        () =>
          void ephemeralData.broadcast(channelId, [
            userId,
            localStateRef.current,
          ]),
        500 // Wait for the peer to be ready
      );
    });
    return () => {
      newPeerEvents.off();
      broadcastTimeoutId && clearTimeout(broadcastTimeoutId);
    };
  }, [userId, channelId, peerEvents]);

  return [localState, setState];
};
