"use client";

import {
  Grid,
  Column,
  Button,
  Heading,
  Tile,
} from "@carbon/react";
import { Tag } from "carbon-components-react";
import { ArrowRight } from "@carbon/icons-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Grid fullWidth className="p-5" style={{ maxWidth: "960px", margin: "0 auto", padding: "2rem" }}>
      <Column sm={4} md={8} lg={16}>
        <Heading className="mb-4" style={{ fontSize: "2rem", textAlign: "center", marginBottom: "2rem" }}>
          👋 Welcome to Project Clover
        </Heading>

        <Tile className="mb-5" style={{ borderRadius: "10px", padding: "2rem" , marginBottom: "2rem" }}>
          <Heading style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
            What is it?
          </Heading>
          <p>
            A tool (web app) that automatically summarizes team standup meetings
            from audio or transcript files.
          </p>

          <Heading style={{ fontSize: "1.25rem", marginTop: "1rem", marginBottom: "0.5rem" }}>
            What&apos;s the use?
          </Heading>
          <p>
            Instead of manually writing notes from daily standup meetings (What did 
            you do yesterday? Plans today? Any blockers?), this tool does it 
            automatically. Saves time, avoids errors, and helps track progress.
          </p>
        </Tile>

        <Heading style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          🚀 Navigate
        </Heading>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
         
          <Button
            style={{borderRadius:"10px"}}
            renderIcon={ArrowRight}
            onClick={() => router.push("/slack-config")}
          >
            Slack Bot Config
          </Button>
          <Button
          style={{borderRadius:"10px"}}
          kind="secondary"
            renderIcon={ArrowRight}
            onClick={() => router.push("/daily-standup")}
          >
            Daily Standup Uploader
          </Button>
        </div>

        <Heading style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          👥 Team Clover
        </Heading>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {["Sindhu PR", "Ladeeda Nasreen", "Sayana MV", "Adil Mohammed", "Anshid O"].map(
            (member, idx) => (
              <Tag key={idx} type="blue">
                {member}
              </Tag>
            )
          )}
        </div>
      </Column>
    </Grid>
  );
}
