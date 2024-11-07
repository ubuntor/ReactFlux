import { Button, Message, Popconfirm, Radio } from "@arco-design/web-react";
import { IconCheck, IconRefresh } from "@arco-design/web-react/icon";

import { useStore } from "@nanostores/react";
import useAppData from "../../hooks/useAppData";
import { polyglotState } from "../../hooks/useLanguage";
import { contentState, setEntries } from "../../store/contentState";
import { settingsState, updateSettings } from "../../store/settingsState";
import CustomTooltip from "../ui/CustomTooltip";
import "./FooterPanel.css";

const updateAllEntriesAsRead = () => {
  setEntries((prev) => prev.map((entry) => ({ ...entry, status: "read" })));
};

const FooterPanel = ({ info, refreshArticleList, markAllAsRead }) => {
  const { isArticleListReady } = useStore(contentState);
  const { showStatus } = useStore(settingsState);
  const { polyglot } = useStore(polyglotState);

  const { fetchAppData } = useAppData();

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      updateAllEntriesAsRead();
      await fetchAppData();
      Message.success(polyglot.t("article_list.mark_all_as_read_success"));
    } catch (error) {
      console.error("Failed to mark all as read: ", error);
      Message.error(polyglot.t("article_list.mark_all_as_read_error"));
    }
  };

  const handleFilterChange = (value) => {
    updateSettings({ showStatus: value });
  };

  return (
    <div className="entry-panel">
      <Popconfirm
        focusLock
        onOk={handleMarkAllAsRead}
        title={polyglot.t("article_list.mark_all_as_read_confirm")}
      >
        <CustomTooltip
          content={polyglot.t("article_list.mark_all_as_read_tooltip")}
          mini
        >
          <Button
            icon={<IconCheck />}
            shape="circle"
            style={{
              visibility: ["starred", "history"].includes(info.from)
                ? "hidden"
                : "visible",
            }}
          />
        </CustomTooltip>
      </Popconfirm>
      <Radio.Group
        onChange={handleFilterChange}
        options={[
          { label: polyglot.t("article_list.filter_status_all"), value: "all" },
          {
            label: polyglot.t("article_list.filter_status_unread"),
            value: "unread",
          },
        ]}
        style={{ visibility: info.from === "history" ? "hidden" : "visible" }}
        type="button"
        value={showStatus}
      />
      <CustomTooltip content={polyglot.t("article_list.refresh_tooltip")} mini>
        <Button
          icon={<IconRefresh />}
          loading={!isArticleListReady}
          shape="circle"
          onClick={refreshArticleList}
        />
      </CustomTooltip>
    </div>
  );
};

export default FooterPanel;
