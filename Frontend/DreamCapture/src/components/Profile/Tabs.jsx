import React, { useState } from "react";

function Tabs() {
  const [activeTab, setActiveTab] = useState("Your dreams"); 

  return (
    <div>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "Your dreams" ? "border-blue-500 text-blue-500" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("Your dreams")}
              type="button"
              role="tab"
              aria-selected={activeTab === "Your dreams"}
            >
              Your dreams
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "Favourite" ? "border-blue-500 text-blue-500" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("Favourite")}
              type="button"
              role="tab"
              aria-selected={activeTab === "Favourite"}
            >
              Favourite
            </button>
          </li>
        </ul>
      </div>
      <div id="default-tab-content">
        {activeTab === "Your dreams" && (
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content for the{" "}
              <strong className="font-medium text-gray-800 dark:text-white">Your dreams tab's associated content</strong>.
            </p>
          </div>
        )}
        {activeTab === "Favourite" && (
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content for the{" "}
              <strong className="font-medium text-gray-800 dark:text-white">Favourite tab's associated content</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tabs;