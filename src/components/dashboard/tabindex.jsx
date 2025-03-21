import { useState, useEffect,  } from "react";
import { TabIndexData, TabIndexFoot } from "./TabIndexData";
import { useLocation } from "react-router-dom";
import { MdExpandMore } from "react-icons/md";
import { List, ListIcon, ListItem } from "@chakra-ui/react";
import "../commoncss/common.css";

const TabIndex = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(-1);
  const role = JSON.parse(localStorage.getItem("user")).role;

  const dispSubTab = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };
  const [activePage, setActivePage] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState(null);
  const [expandedSubTabs, setExpandedSubTabs] = useState({
    1: true,
  });

  // Toggle expand/collapse
  const toggleSubTab = (index) => {
    setExpandedSubTabs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    // Get the path from the location object
    const currentPath = location.pathname;
    const matchingPage = TabIndexData.find((item) => item.url === currentPath);
    setActivePage(matchingPage ? matchingPage.id : null);

    // Check if any subtab's URL matches the current path
    const matchingSubTab = TabIndexData.flatMap(
      (item) => item.subtabindex
    ).find((subitem) => subitem.url === currentPath);
    setActiveSubTab(matchingSubTab ? matchingSubTab.id : null);

    if (matchingSubTab) {
      // Find the main tab associated with the matching subtab
      const mainTab = TabIndexData.find((item) =>
        item.subtabindex.some((subitem) => subitem.url === currentPath)
      );

      if (mainTab) {
        // Set the active main tab based on the matching subtab
        setActivePage(mainTab.id);

        // Set the active index to the main tab's index
        const mainTabIndex = TabIndexData.findIndex(
          (item) => item.id === mainTab.id
        );
        setActiveIndex(mainTabIndex);

        // Set the active sub-tab based on the matching subtab
        setActiveSubTab(matchingSubTab.id);
      }
    } else {
      // If no matching subtab is found, set the active page as before
      const matchingPage = TabIndexData.find(
        (item) => item.url === currentPath
      );
      setActivePage(matchingPage ? matchingPage.id : null);
    }
  }, [location.pathname]);

  return (
    <div>
      <List className="sidebar" spacing={3}>
        {TabIndexData.map((item, index) => {
          const { id, menu, url, subtabindex, icon } = item;
          const hasSubTabs = subtabindex.length > 0;
          const isActive = id === activePage;
          const isExpanded = expandedSubTabs[index];
          if (!item.role.includes(role)) {
            return null;
          }

          return (
            <ListItem key={id}>
              {hasSubTabs ? (
                <>
                  <div
                    className={`w-100 left-tab-bg my-1 px-0 ${
                      isActive ? "active-left-tab-bg" : ""
                    }`}
                    onClick={() => {
                      dispSubTab(index);
                      toggleSubTab(index);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ListIcon
                      as={icon}
                      className="mx-1"
                      style={{ width: 17 }}
                    />
                    {menu}
                    {isExpanded ? (
                      <MdExpandMore
                        className="icon-transition"
                        style={{
                          marginRight: "8px",
                        }}
                      />
                    ) : (
                      <MdExpandMore
                        className="icon-transition"
                        style={{
                          marginRight: "8px",
                        }}
                      />
                    )}
                  </div>
                  {isExpanded && (
                    <ListItem>
                      {subtabindex.map((subitem) => {
                        const { id, menu, url } = subitem;
                        const isSubTabActive = id === activeSubTab;
                        return (
                          <a href={url} key={id} style={{ marginLeft: 0 }}>
                            <div
                              className={`w-100 left-tab-bg my-1 ${
                                isSubTabActive ? "active-left-tab-bg" : ""
                              }`}
                            >
                              {menu}
                            </div>
                          </a>
                        );
                      })}
                    </ListItem>
                  )}
                </>
              ) : (
                <a href={url}>
                  <div
                    className={`w-100 left-tab-bg my-1 px-0 ${
                      isActive ? "active-left-tab-bg" : ""
                    }`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      className="mx-1"
                      style={{ width: 17 }}
                      src={icon}
                      alt=""
                    />
                    {menu}
                  </div>
                </a>
              )}
            </ListItem>
          );
        })}
      </List>
      <List className="sidebar" spacing={3}>
        {TabIndexFoot.map((item) => {
          const { id, menu, url, content, icon } = item;
          return (
            <>
              <ListItem key={id}>
                <a href={url}>
                  <div
                    className="w-100 left-tab-bg my-1 px-0"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {menu}
                    <ListIcon
                      className="mx-1"
                      style={{ width: 17 }}
                      as={icon}
                      alt=""
                    />
                  </div>
                </a>
              </ListItem>
            </>
          );
        })}
      </List>
    </div>
  );
};

export default TabIndex;
