import { useRepo } from "automerge-repo-react-hooks";
import { useEffect } from "react";
import useStateRef from "react-usestateref";
import EventEmitter from "eventemitter3";

// Emits new_peer event when a new peer is seen
export const peerEvents = new EventEmitter();

export const useRemoteAwareness = (
  channelId,
  {
    localUserId, // Optional: BroadcastChannel sometimes sends us our own messages, this filters them
    offlineTimeout = 3000,
    getTime = () => new Date().getTime(),
  } = {}
) => {
  const [peerStates, setPeerStates, peerStatesRef] = useStateRef({});
  const [heartbeats, setHeartbeats, heartbeatsRef] = useStateRef({});
  const { ephemeralData } = useRepo();
  useEffect(() => {
    const handleIncomingUpdate = (event) => {
      try {
        if (event.channelId !== channelId) return;
        const [userId, state] = event.data;
        if (userId === localUserId) return;
        if (!heartbeatsRef.current[userId]) peerEvents.emit("new_peer", event);
        setPeerStates({
          ...peerStatesRef.current,
          [userId]: state,
        });
        setHeartbeats({
          ...heartbeatsRef.current,
          [userId]: getTime(),
        });
      } catch (e) {
        return;
      }
    };
    const pruneOfflinePeers = () => {
      const peerStates = peerStatesRef.current;
      const heartbeats = heartbeatsRef.current;
      const time = getTime();
      for (const key in heartbeats) {
        if (time - heartbeats[key] > offlineTimeout) {
          delete peerStates[key];
          delete heartbeats[key];
        }
      }
      setPeerStates(peerStates);
      setHeartbeats(heartbeats);
    };
    ephemeralData.on("data", handleIncomingUpdate);
    const pruneOfflinePeersIntervalId = setInterval(
      pruneOfflinePeers,
      offlineTimeout
    );
    return () => {
      ephemeralData.removeListener("data", handleIncomingUpdate);
      clearInterval(pruneOfflinePeersIntervalId);
    };
  }, [ephemeralData]);
  return [peerStates, heartbeats];
};
