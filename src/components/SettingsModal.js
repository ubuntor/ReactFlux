import { Modal } from "@arco-design/web-react";

import { useStore } from "../Store";
import Settings from "./Settings";

export default function SettingsModal() {
  const { visible, setVisible, initData } = useStore();

  return (
    <Modal
      visible={visible.settings}
      alignCenter={false}
      title="Settings"
      footer={null}
      unmountOnExit
      style={{ width: "720px", top: "10%" }}
      onCancel={() => {
        setVisible("settings", false);
        initData();
      }}
      autoFocus={false}
      focusLock={true}
    >
      <Settings />
    </Modal>
  );
}