"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./quiz.module.css";
import questions from "./questions";

function getVerdict(score, total) {
  const pct = score / total;
  if (pct === 1) {
    return {
      verdict: "🌱 Compost Master!",
      note: "Perfect score — you know G.R.O.W. inside out.",
    };
  }
  if (pct >= 0.7) {
    return {
      verdict: "♻️ Solid grasp of G.R.O.W.",
      note: "Great job — just a detail or two to brush up on.",
    };
  }
  if (pct >= 0.4) {
    return {
      verdict: "🧪 Getting there",
      note: "You've got the basics — check out the project poster for the rest.",
    };
  }
  return {
    verdict: "🌾 Fresh start",
    note: "No worries — ask about G.R.O.W. and give it another go!",
  };
}

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const total = questions.length;
  const item = questions[current];
  const answered = selected !== null;

  function selectAnswer(idx) {
    if (answered) return;
    setSelected(idx);
    if (idx === item.correct) {
      setScore((s) => s + 1);
    }
  }

  function next() {
    if (current + 1 < total) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  function restart() {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  const progressPct = (answered ? current + 1 : current) / total * 100;

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div className={styles.logos}>
          <Image
            src="/logos/brains-logo.png"
            alt="SBP Integrasi Batu Rakit logo"
            width={300}
            height={369}
            style={{ width: "52px", height: "auto" }}
          />
          <Image
            src="/logos/synergy-logo.png"
            alt="Synergy logo"
            width={300}
            height={300}
            style={{ width: "52px", height: "auto" }}
          />
        </div>
        <span className={styles.tag}>G.R.O.W. by Synergy</span>
        <h1>How well do you know G.R.O.W.?</h1>
        <p>&ldquo;Because waste shouldn&apos;t go to waste.&rdquo; — {total} quick questions</p>
      </header>

      {!finished ? (
        <div className={styles.card}>
          <div className={styles.progressRow}>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className={styles.progressLabel}>
              Q{current + 1} / {total}
            </div>
          </div>

          <p className={styles.qText}>{item.q}</p>

          <div className={styles.options}>
            {item.options.map((opt, idx) => {
              let cls = styles.opt;
              if (answered && idx === item.correct) cls += ` ${styles.optCorrect}`;
              else if (answered && idx === selected) cls += ` ${styles.optWrong}`;

              return (
                <button
                  key={idx}
                  className={cls}
                  disabled={answered}
                  onClick={() => selectAnswer(idx)}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <div className={styles.feedback}>
            {answered &&
              (selected === item.correct ? "✅ " : "❌ ") + item.explain}
          </div>

          {answered && (
            <button className={styles.nextBtn} onClick={next}>
              {current + 1 < total ? "Next question →" : "See results"}
            </button>
          )}
        </div>
      ) : (
        <div className={`${styles.card} ${styles.result}`}>
          {(() => {
            const { verdict, note } = getVerdict(score, total);
            return (
              <>
                <div className={styles.verdict}>{verdict}</div>
                <div className={styles.score}>
                  {score} <span>/ {total}</span>
                </div>
                <p className={styles.note}>{note}</p>
              </>
            );
          })()}
          <button className={styles.restart} onClick={restart}>
            Take it again
          </button>
        </div>
      )}

      <footer className={styles.footer}>
        SBP Integrasi Batu Rakit · MIYIO entry by A. Mukhlis, Uwais &amp; Khunais
      </footer>
    </div>
  );
}
