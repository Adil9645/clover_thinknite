"use client";

import React, { useState } from "react";
import { Button, TextArea } from "@carbon/react";
import {
  Calendar,
  UserMultiple,
  Time,
  Upload,
  Microphone,
  Document,
} from "@carbon/icons-react";
import styles from "./DailyStandupUploader.module.scss";

const DailyStandupUploader: React.FC = () => {
  const [mode, setMode] = useState<"text" | "video">("text");
  const [transcript, setTranscript] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [textFile, setTextFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleTextUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Text file uploaded clicked");
    const file = event.target.files?.[0];
    console.log("File: ", file);
    if (file) {
      setTextFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!textFile && !videoFile) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      if (mode === "text" && textFile) {
        formData.append("file", textFile);
      } else if (mode === "video" && videoFile) {
        formData.append("file", videoFile);
      }

      const response = await fetch("http://127.0.0.1:8000/upload-transcript", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      setSummary(data.data.summary);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Daily Standup Summarizer</h1>
        <p className={styles.subtitle}>
          Transform your daily standups into actionable insights with AI-powered
          summarization
        </p>
        <div className={styles.icons}>
          <span>
            <Calendar /> Daily Meetings
          </span>
          <span>
            <UserMultiple /> Team Collaboration
          </span>
          <span>
            <Time /> Time Saving
          </span>
        </div>
      </header>

      <section className={styles.uploader}>
        <h3>Upload Your Standup Content</h3>
        <div className={styles.toggleGroup}>
          <Button
            kind="tertiary"
            renderIcon={Document}
            className={`${mode === "text" ? styles.active : ""}`}
            onClick={() => setMode("text")}
          >
            <div style={{ marginLeft: "45px" }}>Transcription Text</div>
          </Button>

          <Button
            kind="tertiary"
            renderIcon={Microphone}
            className={`${mode === "video" ? styles.active : ""}`}
            onClick={() => setMode("video")}
          >
            <div style={{ marginLeft: "45px" }}>Recording</div>
          </Button>
        </div>

        {mode === "text" && (
          <div className={styles.videoUploadContainer}>
            <p className={styles.uploadLabel}>Upload your transcript</p>
            <label htmlFor="text-upload" className={styles.uploadBox}>
              <Upload className={styles.uploadIcon} />
              <p>Drop your transcript file here or click to browse</p>
              <p className={styles.supportedText}>
                Supports txt, docx files up to 2MB
              </p>
              <input
                id="text-upload"
                type="file"
                accept=".txt,.docx"
                onChange={handleTextUpload}
                className={styles.hiddenInput}
              />
            </label>
            {textFile && (
              <p className={styles.selectedFile}>Selected: {textFile.name}</p>
            )}
          </div>
        )}

        {mode === "video" && (
          <div className={styles.videoUploadContainer}>
            <p className={styles.uploadLabel}>Upload your meeting recording</p>
            <label htmlFor="video-upload" className={styles.uploadBox}>
              <Upload className={styles.uploadIcon} />
              <p>Drop your recording file here or click to browse</p>
              <p className={styles.supportedText}>
                Supports MP3, WAV, MA4 files up to 30MB
              </p>
              <input
                id="video-upload"
                type="file"
                accept=".mp3,.wav,.m4a"
                onChange={handleVideoUpload}
                className={styles.hiddenInput}
              />
            </label>
            {videoFile && (
              <p className={styles.selectedFile}>Selected: {videoFile.name}</p>
            )}
          </div>
        )}
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <Button
            style={{ borderRadius: "10px", width: "700px" }}
            kind="primary"
            disabled={mode === "text" ? !textFile : !videoFile || isLoading}
            onClick={handleAnalyze}
          >
            <div style={{ marginLeft: "80px" }}>
              {isLoading ? "Processing..." : "Analyze Standup"}
            </div>
          </Button>
        </div>

        {summary && (
          <div className={styles.summaryBox}>
            <h4>📝 Standup Summary</h4>
            <pre>{summary}</pre>
          </div>
        )}
      </section>
    </div>
  );
};

export default DailyStandupUploader;
