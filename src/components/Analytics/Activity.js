import React, { useState, useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as LineTooltip,
  ResponsiveContainer,
} from "recharts";
import { ActivitiesContext } from "./Analytics";
import { useActivity } from "../Routines"; // Import the useActivity hook

const Activity = () => {
  // Access activities via context
  const { activities } = useActivity();
  const [searchTerm, setSearchTerm] = useState(""); // for search functionality
  const [sortOrder, setSortOrder] = useState("asc"); // for sorting by duration

  // Check if activities are present
  if (!activities.length) {
    return <div>No activity data available for analytics.</div>;
  }

  // filter activities based on search term
  const filteredActivities = activities.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // sort activities based on duration
  const sortedActivities = filteredActivities.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.duration - b.duration;
    } else {
      return b.duration - a.duration;
    }
  });

  // Create line chart data for activity duration
  const activityData = activities.map((item) => ({
    name: item.name,
    duration: item.duration,
  }));

  // console.log("Activity Data:", activityData); // Debugging

  // Calculate the total duration spent on all activities
  const totalDuration = sortedActivities.reduce(
    (acc, item) => acc + item.duration,
    0
  );

  return (
    <div>
      <h3>Activity Analysis</h3>

      {/* search input */}
      <input
        type="text"
        placeholder="Search activities by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* sort dropdown */}
      <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
        <option value="asc">Sort by Duration (Asc)</option>
        <option value="desc">Sort by Duration (Desc)</option>
      </select>

      {/* LineChart Visualization */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={activityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Line type="monotone" dataKey="duration" stroke="#82ca9d" />
          <LineTooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Activity;
