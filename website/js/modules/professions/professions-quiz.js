/**
 * World of Warcraft: Forever - Interactive Profession Quiz Wizard
 * Guides undecided players to their ideal profession duo based on playstyle, playtime, content, and class.
 */

(function () {
  "use strict";

  const userAnswers = {
    goal: null,
    playstyle: null,
    hours: null,
    content: null,
    characterClass: null,
    economy: null
  };

  const PRIMARY_PROFESSIONS = [
    { slug: "alchemy", name: "Alchemy", kind: "crafting", icon: "trade_alchemy" },
    { slug: "blacksmithing", name: "Blacksmithing", kind: "crafting", icon: "trade_blacksmithing" },
    { slug: "enchanting", name: "Enchanting", kind: "crafting", icon: "trade_engraving" },
    { slug: "engineering", name: "Engineering", kind: "crafting", icon: "trade_engineering" },
    { slug: "leatherworking", name: "Leatherworking", kind: "crafting", icon: "trade_leatherworking" },
    { slug: "tailoring", name: "Tailoring", kind: "crafting", icon: "trade_tailoring" },
    { slug: "herbalism", name: "Herbalism", kind: "gathering", icon: "spell_nature_naturetouchgrow" },
    { slug: "mining", name: "Mining", kind: "gathering", icon: "trade_mining" },
    { slug: "skinning", name: "Skinning", kind: "gathering", icon: "inv_misc_pelt_wolf_01" }
  ];

  function getIconUrl(icon) {
    return "https://wow.zamimg.com/images/wow/icons/medium/" + (icon || "inv_misc_questionmark") + ".jpg";
  }

  function calculateScores() {
    const data = window.WOW_PROFESSIONS_QUIZ_DATA;
    if (!data) return [];

    const scores = {};
    PRIMARY_PROFESSIONS.forEach(p => scores[p.slug] = 0);

    // 1. Goal weights
    if (userAnswers.goal !== null) {
      const q = data.questions[0].options[userAnswers.goal];
      if (q && q.weights) {
        Object.entries(q.weights).forEach(([prof, w]) => { if (scores[prof] !== undefined) scores[prof] += w; });
      }
    }

    // 2. Playstyle
    if (userAnswers.playstyle !== null) {
      const q = data.questions[1].options[userAnswers.playstyle];
      if (q && q.weights) {
        Object.entries(q.weights).forEach(([prof, w]) => { if (scores[prof] !== undefined) scores[prof] += w; });
      }
    }

    // 3. Playtime
    if (userAnswers.hours !== null) {
      const q = data.questions[2].options[userAnswers.hours];
      if (q && q.weights) {
        Object.entries(q.weights).forEach(([prof, w]) => { if (scores[prof] !== undefined) scores[prof] += w; });
      }
    }

    // 4. Content
    if (userAnswers.content !== null) {
      const q = data.questions[3].options[userAnswers.content];
      if (q && q.weights) {
        Object.entries(q.weights).forEach(([prof, w]) => { if (scores[prof] !== undefined) scores[prof] += w; });
      }
    }

    // 5. Class favors
    if (userAnswers.characterClass !== null) {
      const q = data.questions[4].options[userAnswers.characterClass];
      if (q && q.favored) {
        Object.entries(q.favored).forEach(([prof, w]) => { if (scores[prof] !== undefined) scores[prof] += w; });
      }
    }

    // Evaluate all pairs
    const pairs = [];
    const synergies = data.pairSynergies || [];

    for (let i = 0; i < PRIMARY_PROFESSIONS.length; i++) {
      for (let j = i + 1; j < PRIMARY_PROFESSIONS.length; j++) {
        const p1 = PRIMARY_PROFESSIONS[i];
        const p2 = PRIMARY_PROFESSIONS[j];

        let pairScore = (scores[p1.slug] || 0) + (scores[p2.slug] || 0);

        // Check if a known synergy exists
        const matchedSyn = synergies.find(s =>
          (s.p1 === p1.slug && s.p2 === p2.slug) || (s.p1 === p2.slug && s.p2 === p1.slug)
        );

        if (matchedSyn) {
          pairScore += 3;
        }

        // Gatherer + Crafter synergy bonus when "A bit of both" chosen
        const isOneGatherOneCraft = (p1.kind === "gathering" && p2.kind === "crafting") || (p1.kind === "crafting" && p2.kind === "gathering");
        if (userAnswers.playstyle === 2 && isOneGatherOneCraft) {
          pairScore += 3;
        }

        // Dual crafter penalty if self-sufficiency chosen without supplier
        const isDualCraft = p1.kind === "crafting" && p2.kind === "crafting";
        if (userAnswers.economy === 0 && isDualCraft && !(p1.slug === "tailoring" && p2.slug === "enchanting")) {
          pairScore -= 4;
        }

        pairs.push({
          p1,
          p2,
          score: pairScore,
          synergy: matchedSyn || {
            label: `${p1.name} & ${p2.name}`,
            desc: `Combines ${p1.name} with ${p2.name} to suit your tailored playstyle.`,
            tags: [p1.kind, p2.kind]
          }
        });
      }
    }

    pairs.sort((a, b) => b.score - a.score);
    return pairs;
  }

  function renderQuiz(container) {
    const data = window.WOW_PROFESSIONS_QUIZ_DATA;
    if (!data || !container) return;

    const pairs = calculateScores();
    const topPair = pairs[0];
    const runnerUp = pairs[1];
    const answeredCount = Object.values(userAnswers).filter(v => v !== null).length;

    let html = `
      <div class="prof-quiz-container" style="max-width: 1040px; margin: 0 auto; padding: 1.5rem 1rem;">
        <div class="prof-quiz-header" style="text-align: center; margin-bottom: 2rem;">
          <a href="#professions" class="btn-subtle" style="display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; color: #a3b8cc; text-decoration: none; font-size: 0.9rem;">
            <span>‹ Back to Professions Hub</span>
          </a>
          <h1 style="font-family: 'Cinzel', serif; font-size: 2.1rem; color: #f0e6d2; margin-bottom: 0.5rem;">
            ${data.title}
          </h1>
          <p style="color: #9cb0c4; max-width: 680px; margin: 0 auto; font-size: 0.95rem; line-height: 1.5;">
            ${data.subtitle}
          </p>
          <div style="margin-top: 1rem; display: inline-flex; align-items: center; gap: 0.75rem; background: rgba(14,24,38,0.7); padding: 0.4rem 1rem; border-radius: 20px; border: 1px solid rgba(197,160,89,0.3);">
            <span style="font-size: 0.85rem; color: #c5a059; font-weight: 600;">Answered: ${answeredCount} / 6 questions</span>
            <button id="prof-quiz-reset-btn" style="background: none; border: none; color: #e57373; font-size: 0.8rem; cursor: pointer; text-decoration: underline;">Reset All</button>
          </div>
        </div>

        <div class="prof-quiz-layout" style="display: grid; grid-template-columns: 1fr 380px; gap: 2rem; align-items: start;">
          <!-- Questions List -->
          <div class="prof-quiz-questions" style="display: flex; flex-direction: column; gap: 1.5rem;">
    `;

    data.questions.forEach((q, qIndex) => {
      const isAnswered = userAnswers[q.id] !== null;
      html += `
        <div class="quiz-card" style="background: rgba(16,26,42,0.85); border: 1px solid ${isAnswered ? 'rgba(197,160,89,0.5)' : 'rgba(255,255,255,0.08)'}; border-radius: 8px; padding: 1.25rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.85rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: ${isAnswered ? '#c5a059' : 'rgba(255,255,255,0.1)'}; color: ${isAnswered ? '#0b1020' : '#fff'}; font-weight: bold; font-size: 0.85rem;">
              ${q.num}
            </span>
            <h3 style="font-size: 1.05rem; color: #f0e6d2; margin: 0; font-weight: 600;">
              ${q.question}
            </h3>
          </div>
          <div class="quiz-options-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.6rem;">
      `;

      q.options.forEach((opt, optIndex) => {
        const isSelected = userAnswers[q.id] === optIndex;
        html += `
          <button class="quiz-option-btn ${isSelected ? 'selected' : ''}" 
                  data-qid="${q.id}" data-optindex="${optIndex}"
                  style="text-align: left; background: ${isSelected ? 'rgba(197,160,89,0.2)' : 'rgba(255,255,255,0.03)'}; border: 1px solid ${isSelected ? '#c5a059' : 'rgba(255,255,255,0.1)'}; border-radius: 6px; padding: 0.7rem 0.85rem; cursor: pointer; transition: all 0.2s ease;">
            <div style="font-size: 0.9rem; font-weight: 600; color: ${isSelected ? '#f0e6d2' : '#cbd5e1'};">
              ${opt.label}
            </div>
            ${opt.desc ? `<div style="font-size: 0.75rem; color: #8899aa; margin-top: 0.2rem; line-height: 1.3;">${opt.desc}</div>` : ''}
          </button>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    html += `
          </div>

          <!-- Sticky Live Recommendation Card -->
          <div class="prof-quiz-result-sidebar" style="position: sticky; top: 90px;">
    `;

    if (topPair) {
      html += `
        <div style="background: linear-gradient(180deg, rgba(28,42,66,0.95) 0%, rgba(14,22,36,0.98) 100%); border: 1px solid rgba(197,160,89,0.4); border-radius: 10px; padding: 1.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <div style="text-align: center; margin-bottom: 1.25rem;">
            <span style="text-transform: uppercase; letter-spacing: 1px; font-size: 0.7rem; color: #c5a059; font-weight: bold; background: rgba(197,160,89,0.15); padding: 0.25rem 0.6rem; border-radius: 4px; border: 1px solid rgba(197,160,89,0.3);">
              Optimal Profession Duo
            </span>
            <h2 style="font-family: 'Cinzel', serif; font-size: 1.5rem; color: #f0e6d2; margin: 0.75rem 0 0.25rem 0;">
              ${topPair.synergy.label}
            </h2>
          </div>

          <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 1.25rem;">
            <div style="text-align: center;">
              <img src="${getIconUrl(topPair.p1.icon)}" alt="${topPair.p1.name}" style="width: 52px; height: 52px; border-radius: 6px; border: 2px solid #c5a059;" />
              <div style="font-size: 0.8rem; font-weight: bold; color: #f0e6d2; margin-top: 0.3rem;">${topPair.p1.name}</div>
              <a href="#professions/${topPair.p1.slug}/leveling" class="btn-subtle" style="font-size: 0.72rem; color: #64b5f6; text-decoration: none; display: inline-block; margin-top: 0.2rem;">Level 1–300 ›</a>
            </div>
            <div style="display: flex; align-items: center; font-size: 1.3rem; color: #c5a059;">+</div>
            <div style="text-align: center;">
              <img src="${getIconUrl(topPair.p2.icon)}" alt="${topPair.p2.name}" style="width: 52px; height: 52px; border-radius: 6px; border: 2px solid #c5a059;" />
              <div style="font-size: 0.8rem; font-weight: bold; color: #f0e6d2; margin-top: 0.3rem;">${topPair.p2.name}</div>
              <a href="#professions/${topPair.p2.slug}/leveling" class="btn-subtle" style="font-size: 0.72rem; color: #64b5f6; text-decoration: none; display: inline-block; margin-top: 0.2rem;">Level 1–300 ›</a>
            </div>
          </div>

          <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.45; margin-bottom: 1.25rem; background: rgba(0,0,0,0.25); padding: 0.75rem; border-radius: 6px; border-left: 3px solid #c5a059;">
            ${topPair.synergy.desc}
          </p>

          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem;">
            ${(topPair.synergy.tags || []).map(t => `<span style="font-size: 0.72rem; background: rgba(255,255,255,0.06); padding: 0.2rem 0.5rem; border-radius: 4px; color: #9cb0c4;">#${t}</span>`).join('')}
          </div>

          ${runnerUp ? `
            <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.85rem; margin-top: 0.5rem;">
              <div style="font-size: 0.75rem; text-transform: uppercase; color: #8899aa; margin-bottom: 0.3rem;">Runner-up Choice:</div>
              <div style="font-size: 0.9rem; font-weight: 600; color: #e2e8f0;">${runnerUp.synergy.label}</div>
              <div style="font-size: 0.75rem; color: #8899aa; margin-top: 0.15rem;">${runnerUp.p1.name} + ${runnerUp.p2.name}</div>
            </div>
          ` : ''}
        </div>
      `;
    }

    html += `
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Attach click handlers
    container.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        const optindex = parseInt(btn.getAttribute('data-optindex'), 10);
        userAnswers[qid] = optindex;
        renderQuiz(container);
      });
    });

    const resetBtn = container.querySelector('#prof-quiz-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        Object.keys(userAnswers).forEach(k => userAnswers[k] = null);
        renderQuiz(container);
      });
    }
  }

  window.WOW_PROFESSIONS_QUIZ = {
    renderQuiz,
    calculateScores
  };
})();
