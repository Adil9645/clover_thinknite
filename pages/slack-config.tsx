"use client";

import {
  Grid,
  Column,
  Heading,
  Tile,
  TextInput,
  Stack,
  Button,
} from "@carbon/react";
import Image from "next/image";
import { useState } from "react";

export default function SlackConfigPage() {
  const [botToken, setBotToken] = useState("");
  const [appToken, setAppToken] = useState("");
  const [channelId, setChannelId] = useState("");
  const [fetchTime, setFetchTime] = useState("14:00");

  const handleSubmit = async () => {
    const payload = {
      bot_token: botToken,
      bot_app_token: appToken,
      channel_id: channelId,
      meeting_end_time: fetchTime,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/set-credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit");

      const data = await res.json();
      console.log("Submitted successfully:", data);
      alert("Configuration submitted successfully!");
    } catch (err) {
      console.error("Error submitting:", err);
      alert("Failed to submit configuration.");
    }
  };

  return (
    <Grid fullWidth style={{ padding: "3rem 2rem" }}>
      {/* Heading */}
      <Column sm={4} md={8} lg={16}>
        <Heading style={{ fontSize: "1.5rem", marginBottom: "2rem", textAlign: "center", fontWeight: "bold" }}>
          🚀 Steps to Create a Slack Bot
        </Heading>
      </Column>

      {/* Main Content */}
      <Column sm={4} md={8} lg={16}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
                   <Tile style={{ padding: "2rem", borderRadius: "10px", width: "600px", minWidth: "300px" }}>
            <ul style={{ lineHeight: "1.8", margin: 0, padding: 0 }}>
              <li>🔹 <strong>1. Go to Slack API</strong><br />
                Open: <a href="https://api.slack.com/apps" target="_blank" rel="noopener noreferrer">https://api.slack.com/apps</a><br />
                Click &quot;Create New App&quot; → Choose &quot;From scratch&quot;
              </li>
              <li>🔹 <strong>2. Name Your Bot</strong><br />
                Name it (e.g., DailyReminderBot), choose workspace, click Create
              </li>
              <li>🔹 <strong>3. Enable Socket Mode</strong><br />
                Left menu → Socket Mode → Enable → Copy App Token (xapp-...)
              </li>
              <li>🔹 <strong>4. Add a Bot User</strong><br />
                App Home → Add Bot User → Set name, optional online status
              </li>
              <li>🔹 <strong>5. Add Permissions</strong><br />
                OAuth & Permissions → Add scopes:
                <ul>
                  <li>chat:write</li>
                  <li>channels:read</li>
                  <li>groups:read</li>
                  <li>im:write</li>
                  <li>app_mentions:read</li>
                </ul>
              </li>
              <li>🔹 <strong>6. Install App to Workspace</strong><br />
                Click &quot;Install App&quot; → Allow → Copy Bot Token (xoxb-...)
              </li>
              <li>🔹 <strong>7. Add Event Subscriptions</strong><br />
                Turn ON → Add events (message.im, app_mention, etc.)
              </li>
              <li>🔹 <strong>8. Invite Bot to Channel</strong><br />
                In Slack: <code>/invite @your-bot-name</code>
              </li>
            </ul>
          </Tile>


          {/* Config Form */}
          <Tile style={{ padding: "2rem", borderRadius: "10px", width: "600px", minWidth: "300px" }}>
            <Stack gap={4}>
              <Heading style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                🔧 Enter Your Bot Details
              </Heading>
              <TextInput
                id="slack-bot-token"
                labelText="Slack Bot Token (xoxb-...)"
                placeholder="xoxb-your-bot-token"
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
              />
              <TextInput
                id="slack-app-token"
                labelText="Slack App Token (xapp-...)"
                placeholder="xapp-your-app-level-token"
                value={appToken}
                onChange={(e) => setAppToken(e.target.value)}
              />
              <TextInput
                id="channel-id"
                labelText="Slack Channel ID"
                placeholder="C0123456789"
                value={channelId}
                onChange={(e) => setChannelId(e.target.value)}
              />
              <div>
                <label
                  htmlFor="fetch-time"
                  style={{
                    fontWeight: "500",
                    marginBottom: "0.5rem",
                    display: "block",
                    fontSize: "1rem",
                  }}
                >
                  ⏰ What time of the day should the transcript be fetched?
                </label>
                <input
                  type="time"
                  id="fetch-time"
                  name="fetch-time"
                  value={fetchTime}
                  onChange={(e) => setFetchTime(e.target.value)}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "8px",
                    border: "1px solid #8d8d8d",
                    fontSize: "1rem",
                    width: "150px",
                  }}
                />
              </div>

              {/* Submit Button */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                <Button style={{ borderRadius: "10px" }} kind="secondary" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </Stack>
          </Tile>
        </div>
      </Column>

      {/* Slack Logo */}
      <Column sm={4} md={8} lg={16}>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Image
            src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png"
            alt="Slack Logo"
            width={60}
            height={60}
          />
          <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "gray" }}>
            Slack API integration powered by your custom bot.
          </p>
        </div>
      </Column>
    </Grid>
  );
}
